import { NextRequest, NextResponse } from "next/server";
import { chromium } from "playwright";
import { ResumeDocument } from "@/types/resume";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface PDFRequestBody {
  resume?: ResumeDocument;
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

function getBaseUrl(request: NextRequest): string {
  const explicitBase = process.env.PDF_RENDER_BASE_URL;

  if (explicitBase) {
    return explicitBase.replace(/\/$/, "");
  }

  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost || request.headers.get("host");

  if (!host) {
    throw new Error("Missing request host header.");
  }

  const forwardedProto = request.headers.get("x-forwarded-proto");
  const protocol =
    forwardedProto ||
    (host.includes("localhost") || host.startsWith("127.") ? "http" : "https");

  return `${protocol}://${host}`;
}

export async function POST(request: NextRequest) {
  let browser: Awaited<ReturnType<typeof chromium.launch>> | null = null;

  try {
    const body = (await request.json()) as PDFRequestBody;
    if (!body || !isResumeDocument(body.resume)) {
      return NextResponse.json({ error: "Invalid resume payload." }, { status: 400 });
    }

    const resume = body.resume;
    const baseUrl = getBaseUrl(request);
    const printUrl = `${baseUrl}/print`;

    browser = await chromium.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
    });

    const context = await browser.newContext({
      viewport: { width: 1280, height: 1660 },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    await page.addInitScript((payload) => {
      const printWindow = window as Window & {
        __RESUME_PRINT_PAYLOAD?: unknown;
        __RESUME_PRINT_READY?: boolean;
      };
      printWindow.__RESUME_PRINT_PAYLOAD = payload;
      printWindow.__RESUME_PRINT_READY = false;
    }, resume);

    await page.goto(printUrl, {
      waitUntil: "domcontentloaded",
      timeout: 45000,
    });

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

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileName}.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF." },
      { status: 500 }
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
