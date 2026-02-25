const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const ANTHROPIC_VERSION = "2023-06-01";
const DEFAULT_MODEL = "claude-3-5-sonnet-latest";

interface AnthropicContentBlock {
  type: string;
  text?: string;
}

interface AnthropicResponse {
  content?: AnthropicContentBlock[];
  error?: {
    type?: string;
    message?: string;
  };
}

export interface AnthropicJsonRequest {
  systemPrompt: string;
  userPrompt: string;
  maxTokens?: number;
  temperature?: number;
  model?: string;
}

function extractMessageText(response: AnthropicResponse): string {
  const blocks = response.content ?? [];
  const text = blocks
    .filter((block) => block.type === "text" && typeof block.text === "string")
    .map((block) => block.text ?? "")
    .join("\n")
    .trim();

  if (!text) {
    throw new Error("Anthropic response did not include text content.");
  }

  return text;
}

function extractJsonPayload(rawText: string): string {
  const fencedMatch = rawText.match(/```json\s*([\s\S]*?)```/i);
  if (fencedMatch?.[1]) {
    return fencedMatch[1].trim();
  }

  const firstObjectBrace = rawText.indexOf("{");
  const lastObjectBrace = rawText.lastIndexOf("}");
  if (firstObjectBrace !== -1 && lastObjectBrace > firstObjectBrace) {
    return rawText.slice(firstObjectBrace, lastObjectBrace + 1);
  }

  const firstArrayBracket = rawText.indexOf("[");
  const lastArrayBracket = rawText.lastIndexOf("]");
  if (firstArrayBracket !== -1 && lastArrayBracket > firstArrayBracket) {
    return rawText.slice(firstArrayBracket, lastArrayBracket + 1);
  }

  throw new Error("Anthropic response did not include a JSON payload.");
}

export async function generateAnthropicJson<T>({
  systemPrompt,
  userPrompt,
  maxTokens = 1400,
  temperature = 0.2,
  model,
}: AnthropicJsonRequest): Promise<T> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not configured.");
  }

  const selectedModel = process.env.ANTHROPIC_MODEL?.trim() || model || DEFAULT_MODEL;

  const response = await fetch(ANTHROPIC_API_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": ANTHROPIC_VERSION,
    },
    body: JSON.stringify({
      model: selectedModel,
      max_tokens: maxTokens,
      temperature,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: userPrompt,
        },
      ],
    }),
  });

  let payload: AnthropicResponse;
  try {
    payload = (await response.json()) as AnthropicResponse;
  } catch {
    throw new Error("Failed to parse Anthropic API response.");
  }

  if (!response.ok) {
    const message = payload.error?.message ?? "Anthropic request failed.";
    throw new Error(message);
  }

  const text = extractMessageText(payload);
  const jsonText = extractJsonPayload(text);

  try {
    return JSON.parse(jsonText) as T;
  } catch {
    throw new Error("Model returned invalid JSON.");
  }
}
