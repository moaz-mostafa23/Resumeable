import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { chromium as playwrightChromium, type Browser, type Page } from "playwright";
import { ResumeDocument } from "@/types/resume";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface PDFRequestBody {
  resume?: ResumeDocument;
}

interface BrowserLaunchResult {
  browser: Browser;
  mode: "serverless-chromium" | "playwright-default";
  executablePath?: string;
}

interface SerializableError {
  name?: string;
  message: string;
  stack?: string;
}

type PdfReasonCode =
  | "BROWSER_LAUNCH_FAILED"
  | "PRINT_PAGE_NAVIGATION_FAILED"
  | "PRINT_PAGE_TIMEOUT"
  | "PRINT_READY_TIMEOUT"
  | "PDF_RENDER_FAILED"
  | "INTERNAL_ERROR";

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

function classifyPdfError(error: unknown): PdfReasonCode {
  const message = error instanceof Error ? error.message : String(error);
  const lowerMessage = message.toLowerCase();

  if (
    lowerMessage.includes("executable doesn't exist") ||
    lowerMessage.includes("please run the following command to download new browsers") ||
    lowerMessage.includes("failed to launch browser process") ||
    lowerMessage.includes("browser was not found") ||
    lowerMessage.includes("input directory") ||
    lowerMessage.includes("brotli files")
  ) {
    return "BROWSER_LAUNCH_FAILED";
  }

  if (message.includes("net::ERR_")) {
    return "PRINT_PAGE_NAVIGATION_FAILED";
  }

  if (lowerMessage.includes("timeout") && lowerMessage.includes("page.goto")) {
    return "PRINT_PAGE_TIMEOUT";
  }

  if (message.includes("Print page never became ready")) {
    return "PRINT_READY_TIMEOUT";
  }

  if (lowerMessage.includes("page.pdf")) {
    return "PDF_RENDER_FAILED";
  }

  return "INTERNAL_ERROR";
}

function addLogLine(bucket: string[], line: string, maxEntries = 20) {
  if (bucket.length >= maxEntries) return;
  bucket.push(line);
}

const PDF_BROWSER_ARGS = [
  "--no-sandbox",
  "--disable-setuid-sandbox",
  "--disable-dev-shm-usage",
];

function isServerlessRuntime(): boolean {
  return Boolean(
    process.env.VERCEL ||
      process.env.AWS_REGION ||
      process.env.AWS_EXECUTION_ENV ||
      process.env.LAMBDA_TASK_ROOT
  );
}

async function launchPdfBrowser(): Promise<BrowserLaunchResult> {
  if (isServerlessRuntime()) {
    const chromium = (await import("@sparticuz/chromium")).default;
    const executablePath = await chromium.executablePath();

    const browser = await playwrightChromium.launch({
      headless: true,
      executablePath,
      args: Array.from(new Set([...chromium.args, ...PDF_BROWSER_ARGS])),
    });

    return { browser, mode: "serverless-chromium", executablePath };
  }

  const browser = await playwrightChromium.launch({
    headless: true,
    args: PDF_BROWSER_ARGS,
  });

  return { browser, mode: "playwright-default" };
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

  let browser: Browser | null = null;
  let page: Page | null = null;
  let step = "request:received";
  let baseUrl = "";
  let printUrl = "";
  let resumeSummary: ReturnType<typeof summarizeResume> | null = null;
  let browserMode: BrowserLaunchResult["mode"] | null = null;
  let browserExecutablePath: string | null = null;

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
    const launchResult = await launchPdfBrowser();
    browser = launchResult.browser;
    browserMode = launchResult.mode;
    browserExecutablePath = launchResult.executablePath ?? null;

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
      browserMode,
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
    const reasonCode = classifyPdfError(error);

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
      reasonCode,
      step,
      durationMs: Date.now() - startedAt,
      baseUrl,
      printUrl,
      browserMode,
      browserExecutablePath,
      headers: headersSummary,
      resume: resumeSummary,
      diagnostics,
      pageSnapshot,
      error: serializeError(error),
    });

    return NextResponse.json(
      { error: "Failed to generate PDF.", requestId, reasonCode, step },
      {
        status: 500,
        headers: {
          "x-request-id": requestId,
          "x-error-code": reasonCode,
          "Cache-Control": "no-store",
        },
      }
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
