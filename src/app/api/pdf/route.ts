import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { chromium, type Page } from "playwright";
import { ResumeDocument } from "@/types/resume";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface PDFRequestBody {
  resume?: ResumeDocument;
}

interface SerializableError {
  name?: string;
  message: string;
  stack?: string;
}

function sanitizeFileName(name: string): string {
  const normalized = name.trim().replace(/\s+/g, "_");
  const safe = normalized.replace(/[^\w.-]/g, "");
  return safe || "resume";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isResumeDocument(value: unknown): value is ResumeDocument {
  if (!isRecord(value)) return false;

  return (
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    typeof value.userId === "string" &&
    typeof value.templateId === "string" &&
    Array.isArray(value.sections) &&
    isRecord(value.sectionData) &&
    isRecord(value.theme) &&
    typeof value.createdAt === "string" &&
    typeof value.updatedAt === "string"
  );
}

function firstHeaderValue(value: string | null): string | null {
  if (!value) return null;
  const first = value.split(",")[0]?.trim();
  return first || null;
}

function summarizeHeaders(request: NextRequest) {
  return {
    host: request.headers.get("host"),
    xForwardedHost: request.headers.get("x-forwarded-host"),
    xForwardedProto: request.headers.get("x-forwarded-proto"),
    xForwardedPort: request.headers.get("x-forwarded-port"),
    userAgent: request.headers.get("user-agent"),
  };
}

function summarizeResume(resume: ResumeDocument) {
  const headerSection = isRecord(resume.sectionData.header) ? resume.sectionData.header : null;
  const photoUrl =
    headerSection && typeof headerSection.photoUrl === "string" ? headerSection.photoUrl : "";

  return {
    resumeId: resume.id,
    templateId: resume.templateId,
    sectionCount: resume.sections.length,
    visibleSectionCount: resume.sections.filter((section) => section.visible).length,
    hasPhoto: photoUrl.length > 0,
    photoUrlLength: photoUrl.length,
  };
}

function serializeError(error: unknown): SerializableError {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }

  return {
    message: String(error),
  };
}

function addLogLine(bucket: string[], line: string, maxEntries = 20) {
  if (bucket.length >= maxEntries) return;
  bucket.push(line);
}

function getBaseUrl(request: NextRequest): string {
  const explicitBase = process.env.PDF_RENDER_BASE_URL;

  if (explicitBase) {
    return explicitBase.replace(/\/$/, "");
  }

  const forwardedHost = firstHeaderValue(request.headers.get("x-forwarded-host"));
  const host = forwardedHost || firstHeaderValue(request.headers.get("host"));

  const forwardedProto = firstHeaderValue(request.headers.get("x-forwarded-proto"));

  if (host) {
    const isLocalHost = host.includes("localhost") || host.startsWith("127.");
    const protocol = (
      isLocalHost ? "http" : forwardedProto || "https"
    ).replace(/:$/, "");

    return `${protocol}://${host}`;
  }

  const requestOrigin = request.nextUrl.origin;
  if (requestOrigin && requestOrigin !== "null") {
    return requestOrigin.replace(/\/$/, "");
  }

  throw new Error("Missing request host header.");
}

export async function POST(request: NextRequest) {
  const requestId = randomUUID();
  const startedAt = Date.now();
  const headersSummary = summarizeHeaders(request);
  const diagnostics = {
    browserConsole: [] as string[],
    pageErrors: [] as string[],
    requestFailures: [] as string[],
  };

  let browser: Awaited<ReturnType<typeof chromium.launch>> | null = null;
  let page: Page | null = null;
  let step = "request:received";
  let baseUrl = "";
  let printUrl = "";
  let resumeSummary: ReturnType<typeof summarizeResume> | null = null;

  try {
    step = "request:parse-body";
    const body = (await request.json()) as PDFRequestBody;
    if (!body || !isResumeDocument(body.resume)) {
      console.warn("[pdf] invalid payload", {
        requestId,
        step,
        headers: headersSummary,
      });
      return NextResponse.json(
        { error: "Invalid resume payload.", requestId },
        { status: 400, headers: { "x-request-id": requestId, "Cache-Control": "no-store" } }
      );
    }

    const resume = body.resume;
    resumeSummary = summarizeResume(resume);
    step = "request:resolve-base-url";
    baseUrl = getBaseUrl(request);
    printUrl = `${baseUrl}/print`;

    console.info("[pdf] generation started", {
      requestId,
      step,
      baseUrl,
      printUrl,
      headers: headersSummary,
      resume: resumeSummary,
    });

    step = "browser:launch";
    browser = await chromium.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
    });

    step = "browser:new-context";
    const context = await browser.newContext({
      viewport: { width: 1280, height: 1660 },
      deviceScaleFactor: 1,
    });
    page = await context.newPage();

    page.on("console", (message) => {
      addLogLine(
        diagnostics.browserConsole,
        `${message.type()}: ${message.text().slice(0, 280)}`
      );
    });

    page.on("pageerror", (pageError) => {
      addLogLine(diagnostics.pageErrors, pageError.message.slice(0, 280));
    });

    page.on("requestfailed", (failedRequest) => {
      const failure = failedRequest.failure()?.errorText || "unknown";
      addLogLine(
        diagnostics.requestFailures,
        `${failedRequest.method()} ${failedRequest.url().slice(0, 180)} :: ${failure.slice(0, 80)}`
      );
    });

    step = "page:add-init-script";
    await page.addInitScript((payload) => {
      const printWindow = window as Window & {
        __RESUME_PRINT_PAYLOAD?: unknown;
        __RESUME_PRINT_READY?: boolean;
      };
      printWindow.__RESUME_PRINT_PAYLOAD = payload;
      printWindow.__RESUME_PRINT_READY = false;
    }, resume);

    step = "page:goto-print";
    await page.goto(printUrl, {
      waitUntil: "domcontentloaded",
      timeout: 45000,
    });

    step = "page:wait-ready";
    let isReady = false;
    for (let i = 0; i < 200; i++) {
      const ready = await page.evaluate(() => {
        const printWindow = window as Window & { __RESUME_PRINT_READY?: boolean };
        return printWindow.__RESUME_PRINT_READY === true;
      });

      if (ready) {
        isReady = true;
        break;
      }

      await page.waitForTimeout(100);
    }

    if (!isReady) {
      const debugState = await page.evaluate(() => {
        const printWindow = window as Window & {
          __RESUME_PRINT_READY?: boolean;
          __RESUME_PRINT_PAYLOAD?: unknown;
        };

        return {
          ready: printWindow.__RESUME_PRINT_READY === true,
          hasPayload: Boolean(printWindow.__RESUME_PRINT_PAYLOAD),
          pageCount: document.querySelectorAll(".pdf-page").length,
          bodyPreview: document.body.innerText.slice(0, 140),
        };
      });

      throw new Error(
        `Print page never became ready. hasPayload=${debugState.hasPayload} pageCount=${debugState.pageCount} body="${debugState.bodyPreview}"`
      );
    }

    step = "page:render-pdf";
    const pdf = await page.pdf({
      format: "Letter",
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: "0in",
        right: "0in",
        bottom: "0in",
        left: "0in",
      },
    });

    await context.close();

    const fileName = sanitizeFileName(resume.name);
    const pdfBytes = new Uint8Array(pdf);

    console.info("[pdf] generation succeeded", {
      requestId,
      step,
      durationMs: Date.now() - startedAt,
      pdfBytes: pdfBytes.byteLength,
      printUrl,
    });

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileName}.pdf"`,
        "Cache-Control": "no-store",
        "x-request-id": requestId,
      },
    });
  } catch (error) {
    let pageSnapshot: Record<string, unknown> | null = null;

    if (page) {
      try {
        pageSnapshot = await page.evaluate(() => {
          const printWindow = window as Window & {
            __RESUME_PRINT_READY?: boolean;
            __RESUME_PRINT_PAYLOAD?: unknown;
          };
          return {
            url: window.location.href,
            title: document.title,
            ready: printWindow.__RESUME_PRINT_READY === true,
            hasPayload: Boolean(printWindow.__RESUME_PRINT_PAYLOAD),
            pageCount: document.querySelectorAll(".pdf-page").length,
            bodyPreview: document.body?.innerText?.slice(0, 180) ?? "",
          };
        });
      } catch {
        pageSnapshot = null;
      }
    }

    console.error("[pdf] generation failed", {
      requestId,
      step,
      durationMs: Date.now() - startedAt,
      baseUrl,
      printUrl,
      headers: headersSummary,
      resume: resumeSummary,
      diagnostics,
      pageSnapshot,
      error: serializeError(error),
    });

    return NextResponse.json(
      { error: "Failed to generate PDF.", requestId },
      { status: 500, headers: { "x-request-id": requestId, "Cache-Control": "no-store" } }
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
