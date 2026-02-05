"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FONT_OPTIONS = [
  { value: "Inter", label: "Inter" },
  { value: "Arial", label: "Arial" },
  { value: "Helvetica", label: "Helvetica" },
  { value: "Georgia", label: "Georgia" },
  { value: "Times New Roman", label: "Times New Roman" },
  { value: "Roboto", label: "Roboto" },
];

const COLOR_PRESETS = [
  "#2563eb", // Blue
  "#0891b2", // Cyan
  "#059669", // Emerald
  "#7c3aed", // Violet
  "#dc2626", // Red
  "#ea580c", // Orange
  "#000000", // Black
  "#475569", // Slate
];

export function ThemeEditor() {
  const { resume, updateTheme } = useResumeStore();

  if (!resume) return null;

  const { theme } = resume;

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-xl font-semibold">Theme Settings</h2>

      {/* Primary Color */}
      <div className="space-y-3">
        <Label>Primary Color</Label>
        <div className="flex gap-2 flex-wrap">
          {COLOR_PRESETS.map((color) => (
            <button
              key={color}
              className={`w-8 h-8 rounded-full border-2 ${
                theme.primaryColor === color
                  ? "border-gray-900 ring-2 ring-offset-2 ring-gray-400"
                  : "border-transparent"
              }`}
              style={{ backgroundColor: color }}
              onClick={() => updateTheme({ primaryColor: color })}
            />
          ))}
          <div className="relative">
            <input
              type="color"
              value={theme.primaryColor}
              onChange={(e) => updateTheme({ primaryColor: e.target.value })}
              className="w-8 h-8 rounded-full cursor-pointer opacity-0 absolute inset-0"
            />
            <div
              className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs"
              style={{
                background: `conic-gradient(red, yellow, lime, aqua, blue, magenta, red)`,
              }}
            />
          </div>
        </div>
        <Input
          type="text"
          value={theme.primaryColor}
          onChange={(e) => updateTheme({ primaryColor: e.target.value })}
          placeholder="#2563eb"
          className="w-32"
        />
      </div>

      {/* Font Family */}
      <div className="space-y-3">
        <Label>Font Family</Label>
        <Select
          value={theme.fontFamily}
          onValueChange={(value) => updateTheme({ fontFamily: value })}
        >
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {FONT_OPTIONS.map((font) => (
              <SelectItem key={font.value} value={font.value}>
                <span style={{ fontFamily: font.value }}>{font.label}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Font Size */}
      <div className="space-y-3">
        <Label>Base Font Size: {theme.fontSize}pt</Label>
        <Slider
          value={[theme.fontSize]}
          onValueChange={([value]) => updateTheme({ fontSize: value })}
          min={8}
          max={14}
          step={0.5}
          className="w-64"
        />
      </div>

      {/* Line Height */}
      <div className="space-y-3">
        <Label>Line Height: {theme.lineHeight}</Label>
        <Slider
          value={[theme.lineHeight]}
          onValueChange={([value]) => updateTheme({ lineHeight: value })}
          min={1}
          max={2}
          step={0.1}
          className="w-64"
        />
      </div>

      {/* Section Spacing */}
      <div className="space-y-3">
        <Label>Section Spacing: {theme.sectionSpacing}px</Label>
        <Slider
          value={[theme.sectionSpacing]}
          onValueChange={([value]) => updateTheme({ sectionSpacing: value })}
          min={8}
          max={32}
          step={2}
          className="w-64"
        />
      </div>

      {/* Page Margins */}
      <div className="space-y-3">
        <Label>Page Margins: {theme.pageMargins}px</Label>
        <Slider
          value={[theme.pageMargins]}
          onValueChange={([value]) => updateTheme({ pageMargins: value })}
          min={20}
          max={60}
          step={5}
          className="w-64"
        />
      </div>
    </div>
  );
}
