"use client";

import { useEffect, useRef, useState } from "react";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Link2,
  List,
  Underline as UnderlineIcon,
} from "lucide-react";
import { BulletPoint } from "@/types/resume";
import { bulletsToEditorHtml, editorHtmlToBullets } from "@/lib/rich-text-bullets";
import { cn } from "@/lib/utils";

interface RichTextBulletEditorProps {
  bullets: BulletPoint[];
  idPrefix: string;
  placeholder?: string;
  onChange: (bullets: BulletPoint[]) => void;
}

interface ToolbarButtonProps {
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}

function ToolbarButton({ active, disabled, onClick, title, children }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-md border text-[#4f4f68] transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5d3ffd] focus-visible:ring-offset-1",
        active
          ? "border-[#5d3ffd] bg-[#5d3ffd] text-white shadow-sm"
          : "border-transparent hover:border-[#d8d9e4] hover:bg-[#f4f5fb]",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      )}
      aria-label={title}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}

function normalizeUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) {
    return "";
  }

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("mailto:")) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

function serializeBullets(bullets: BulletPoint[]): string {
  return JSON.stringify(bullets.map((bullet) => [bullet.id, bullet.content]));
}

function RichTextToolbar({ editor }: { editor: Editor | null }) {
  const toggleBullets = () => {
    editor?.chain().focus().toggleBulletList().run();
  };

  const addLink = () => {
    if (!editor) return;

    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const input = window.prompt("Enter link URL", previousUrl ?? "https://");

    if (input === null) {
      return;
    }

    const url = normalizeUrl(input);

    if (!url) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div
      className="flex flex-wrap items-center gap-1 border-b border-[#e3e4ee] px-3 py-2"
      role="toolbar"
      aria-label="Description formatting"
    >
      <ToolbarButton
        title="Bold (Cmd/Ctrl+B)"
        onClick={() => editor?.chain().focus().toggleBold().run()}
        active={Boolean(editor?.isActive("bold"))}
        disabled={!editor?.can().chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        title="Italic (Cmd/Ctrl+I)"
        onClick={() => editor?.chain().focus().toggleItalic().run()}
        active={Boolean(editor?.isActive("italic"))}
        disabled={!editor?.can().chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        title="Underline (Cmd/Ctrl+U)"
        onClick={() => editor?.chain().focus().toggleUnderline().run()}
        active={Boolean(editor?.isActive("underline"))}
      >
        <UnderlineIcon className="h-4 w-4" />
      </ToolbarButton>

      <div className="mx-1 h-5 w-px bg-[#d8d9e4]" />

      <ToolbarButton
        title="Bullet list"
        onClick={toggleBullets}
        active={Boolean(editor?.isActive("bulletList"))}
      >
        <List className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        title="Insert link"
        onClick={addLink}
        active={Boolean(editor?.isActive("link"))}
      >
        <Link2 className="h-4 w-4" />
      </ToolbarButton>

      <div className="mx-1 h-5 w-px bg-[#d8d9e4]" />

      <ToolbarButton
        title="Align left"
        onClick={() => editor?.chain().focus().setTextAlign("left").run()}
        active={Boolean(editor?.isActive({ textAlign: "left" }))}
      >
        <AlignLeft className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        title="Align center"
        onClick={() => editor?.chain().focus().setTextAlign("center").run()}
        active={Boolean(editor?.isActive({ textAlign: "center" }))}
      >
        <AlignCenter className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        title="Align right"
        onClick={() => editor?.chain().focus().setTextAlign("right").run()}
        active={Boolean(editor?.isActive({ textAlign: "right" }))}
      >
        <AlignRight className="h-4 w-4" />
      </ToolbarButton>
    </div>
  );
}

export function RichTextBulletEditor({
  bullets,
  idPrefix,
  placeholder = "Add a description...",
  onChange,
}: RichTextBulletEditorProps) {
  const latestBulletsRef = useRef(bullets);
  const isApplyingExternalContentRef = useRef(false);
  const lastKnownSerializedBulletsRef = useRef(serializeBullets(bullets));

  useEffect(() => {
    latestBulletsRef.current = bullets;
  }, [bullets]);

  const [initialContent] = useState(() => bulletsToEditorHtml(bullets));

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false,
        orderedList: false,
        blockquote: false,
        code: false,
        codeBlock: false,
        horizontalRule: false,
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
      TextAlign.configure({
        types: ["paragraph", "heading", "listItem"],
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class:
          "rte-editor min-h-[108px] rounded-b-xl px-4 py-3 text-[15px] leading-6 text-[#1f2233] focus:outline-none",
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      if (isApplyingExternalContentRef.current) {
        return;
      }

      const nextBullets = editorHtmlToBullets(
        currentEditor.getHTML(),
        idPrefix,
        latestBulletsRef.current
      );
      const serialized = serializeBullets(nextBullets);

      if (serialized === lastKnownSerializedBulletsRef.current) {
        return;
      }

      lastKnownSerializedBulletsRef.current = serialized;
      onChange(nextBullets);
    },
  });

  useEffect(() => {
    if (!editor) {
      return;
    }

    const serialized = serializeBullets(bullets);
    if (serialized === lastKnownSerializedBulletsRef.current) {
      return;
    }

    const nextContent = bulletsToEditorHtml(bullets);

    isApplyingExternalContentRef.current = true;
    editor.commands.setContent(nextContent, { emitUpdate: false });
    isApplyingExternalContentRef.current = false;

    lastKnownSerializedBulletsRef.current = serialized;
  }, [bullets, editor]);

  return (
    <div className="overflow-hidden rounded-xl border border-[#d8d9e4] bg-[#fbfbfe] transition-colors focus-within:border-[#5d3ffd]">
      <RichTextToolbar editor={editor} />
      <EditorContent editor={editor} />
      <div className="border-t border-[#ececf3] px-4 py-2 text-xs text-[#7a7d90]">
        Use Enter for a new bullet and Shift+Enter for a line break.
      </div>
    </div>
  );
}
