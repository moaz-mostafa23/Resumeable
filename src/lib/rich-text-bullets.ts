import sanitizeHtml from "sanitize-html";
import { BulletPoint } from "@/types/resume";
import { generateId } from "@/lib/utils";

const LIST_MODE_PREFIX = "__rte_list__::";
const BLOCK_MODE_PREFIX = "__rte_block__::";

type StoredMode = "list" | "block";

const STORAGE_ALLOWED_TAGS = [
  "p",
  "div",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "a",
  "br",
  "span",
];

const INLINE_ALLOWED_TAGS = [
  "strong",
  "b",
  "em",
  "i",
  "u",
  "a",
  "br",
  "span",
];

const STORAGE_ALLOWED_ATTRIBUTES: sanitizeHtml.IOptions["allowedAttributes"] = {
  a: ["href", "target", "rel"],
  p: ["style"],
  div: ["style"],
  span: ["style"],
};

const INLINE_ALLOWED_ATTRIBUTES: sanitizeHtml.IOptions["allowedAttributes"] = {
  a: ["href", "target", "rel"],
  span: ["style"],
};

const ALLOWED_STYLES: sanitizeHtml.IOptions["allowedStyles"] = {
  p: {
    "text-align": [/^left$/, /^center$/, /^right$/],
  },
  div: {
    "text-align": [/^left$/, /^center$/, /^right$/],
  },
  span: {
    "text-align": [/^left$/, /^center$/, /^right$/],
  },
};

function cleanStorageHtml(value: string): string {
  const prepared = value
    .replace(/<\s*h[1-6][^>]*>/gi, "<p>")
    .replace(/<\s*\/\s*h[1-6]\s*>/gi, "</p>");

  return sanitizeHtml(prepared, {
    allowedTags: STORAGE_ALLOWED_TAGS,
    allowedAttributes: STORAGE_ALLOWED_ATTRIBUTES,
    allowedStyles: ALLOWED_STYLES,
    allowedSchemes: ["http", "https", "mailto"],
  }).trim();
}

function cleanInlineHtml(value: string): string {
  return sanitizeHtml(value, {
    allowedTags: INLINE_ALLOWED_TAGS,
    allowedAttributes: INLINE_ALLOWED_ATTRIBUTES,
    allowedStyles: ALLOWED_STYLES,
    allowedSchemes: ["http", "https", "mailto"],
  }).trim();
}

function normalizeBlocksToInlineHtml(value: string): string {
  const withLineBreaks = value
    .replace(/<\s*\/\s*p\s*>\s*<\s*p[^>]*>/gi, "<br>")
    .replace(/<\s*\/\s*div\s*>\s*<\s*div[^>]*>/gi, "<br>")
    .replace(/<\s*\/\s*h[1-6]\s*>\s*<\s*h[1-6][^>]*>/gi, "<br>");

  return cleanInlineHtml(withLineBreaks)
    .replace(/(<br\s*\/?>(\s|&nbsp;)*){3,}/gi, "<br><br>")
    .trim();
}

function ensureBlockWrapper(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) {
    return "<p></p>";
  }

  if (/^<(p|div)\b/i.test(trimmed)) {
    return trimmed;
  }

  return `<p>${normalizeBlocksToInlineHtml(trimmed)}</p>`;
}

function decodeStoredContent(raw: string): { mode: StoredMode; content: string } {
  if (raw.startsWith(LIST_MODE_PREFIX)) {
    return { mode: "list", content: cleanStorageHtml(raw.slice(LIST_MODE_PREFIX.length)) };
  }

  if (raw.startsWith(BLOCK_MODE_PREFIX)) {
    return { mode: "block", content: ensureBlockWrapper(cleanStorageHtml(raw.slice(BLOCK_MODE_PREFIX.length))) };
  }

  const trimmed = raw.trim();

  if (trimmed.startsWith("<")) {
    return { mode: "list", content: cleanStorageHtml(trimmed) };
  }

  const safeText = sanitizeHtml(trimmed, { allowedTags: [], allowedAttributes: {} });
  return { mode: "list", content: safeText };
}

export function getStoredBulletMode(content: string): "list" | "block" {
  return decodeStoredContent(content).mode;
}

function parseEditorHtmlToContentParts(html: string): Array<{ mode: StoredMode; content: string }> {
  if (typeof window === "undefined") {
    return [];
  }

  const doc = new DOMParser().parseFromString(html, "text/html");
  const listItems = Array.from(doc.body.querySelectorAll("li"));

  if (listItems.length > 0) {
    return listItems
      .map((item) => ({ mode: "list" as const, content: cleanStorageHtml(item.innerHTML) }))
      .filter((entry) => entry.content);
  }

  const blockElements = Array.from(doc.body.children);

  if (blockElements.length > 0) {
    return blockElements
      .map((element) => {
        const cleaned = ensureBlockWrapper(cleanStorageHtml(element.outerHTML));
        return {
          mode: "block" as const,
          content: cleaned,
        };
      })
      .filter((entry) => entry.content && entry.content !== "<p></p>");
  }

  const fallbackText = doc.body.textContent?.trim() ?? "";
  if (!fallbackText) {
    return [];
  }

  const safeText = sanitizeHtml(fallbackText, { allowedTags: [], allowedAttributes: {} });
  return [{ mode: "block", content: `<p>${safeText}</p>` }];
}

export function editorHtmlToBullets(
  html: string,
  idPrefix: string,
  existingBullets: BulletPoint[] = []
): BulletPoint[] {
  const contentParts = parseEditorHtmlToContentParts(html);

  return contentParts.map((entry, index) => ({
    id: existingBullets[index]?.id ?? `${idPrefix}-${generateId()}`,
    content:
      entry.mode === "list"
        ? `${LIST_MODE_PREFIX}${entry.content}`
        : `${BLOCK_MODE_PREFIX}${entry.content}`,
  }));
}

export function bulletsToEditorHtml(bullets: BulletPoint[]): string {
  if (bullets.length === 0) {
    return "<p></p>";
  }

  const decoded = bullets.map((bullet) => decodeStoredContent(bullet.content));
  const allList = decoded.every((entry) => entry.mode === "list");

  if (allList) {
    return `<ul>${decoded
      .map((entry) => `<li>${entry.content || ""}</li>`)
      .join("")}</ul>`;
  }

  return decoded
    .map((entry) => {
      if (entry.mode === "block") {
        return ensureBlockWrapper(entry.content);
      }

      return `<p>${normalizeBlocksToInlineHtml(entry.content)}</p>`;
    })
    .join("");
}

export function sanitizeBulletHtmlForRender(content: string): string {
  const decoded = decodeStoredContent(content);
  if (decoded.mode === "block") {
    return ensureBlockWrapper(cleanStorageHtml(decoded.content));
  }

  return normalizeBlocksToInlineHtml(decoded.content);
}
