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
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";

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

const TEXT_COLOR_PRESETS = [
  "#000000", // Black
  "#111827", // Gray-900
  "#1f2937", // Gray-800
  "#374151", // Gray-700
  "#4b5563", // Gray-600
  "#6b7280", // Gray-500
];

export function ThemeEditor() {
  const { resume, updateTheme } = useResumeStore();

  if (!resume) return null;

  const { theme } = resume;

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-xl font-semibold">Customize & tinker</h2>

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

      {/* Text Color */}
      <div className="space-y-3">
        <Label>Text Color</Label>
        <div className="flex gap-2 flex-wrap">
          {TEXT_COLOR_PRESETS.map((color) => (
            <button
              key={color}
              className={`w-8 h-8 rounded-full border-2 ${
                theme.textColor === color
                  ? "border-gray-900 ring-2 ring-offset-2 ring-gray-400"
                  : "border-transparent"
              }`}
              style={{ backgroundColor: color }}
              onClick={() => updateTheme({ textColor: color })}
            />
          ))}
          <div className="relative">
            <input
              type="color"
              value={theme.textColor}
              onChange={(e) => updateTheme({ textColor: e.target.value })}
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
          value={theme.textColor}
          onChange={(e) => updateTheme({ textColor: e.target.value })}
          placeholder="#000000"
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

      {/* Text Alignment */}
      <div className="space-y-3">
        <Label>Name & Title Text Alignment</Label>
        <div className="flex gap-1">
          {([
            { value: 'left' as const, icon: AlignLeft, label: 'Left' },
            { value: 'center' as const, icon: AlignCenter, label: 'Center' },
            { value: 'right' as const, icon: AlignRight, label: 'Right' },
          ]).map(({ value, icon: Icon, label }) => (
            <button
              key={value}
              className={`flex items-center gap-2 px-4 py-2 rounded-md border text-sm transition-colors ${
                theme.textAlign === value
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => updateTheme({ textAlign: value })}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
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
      <div className="space-y-4">
        <Label className="text-base font-medium">Page Margins</Label>
        
        <div className="space-y-3 pl-2">
          <div className="space-y-2">
            <Label className="text-sm text-gray-600">Top & Bottom: {theme.marginVertical}px</Label>
            <Slider
              value={[theme.marginVertical]}
              onValueChange={([value]) => updateTheme({ marginVertical: value })}
              min={10}
              max={80}
              step={5}
              className="w-64"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm text-gray-600">Left & Right: {theme.marginHorizontal}px</Label>
            <Slider
              value={[theme.marginHorizontal]}
              onValueChange={([value]) => updateTheme({ marginHorizontal: value })}
              min={10}
              max={80}
              step={5}
              className="w-64"
            />
          </div>
        </div>
      </div>

      {/* Name Font Size */}
      <div className="space-y-3">
        <Label>Name Font Size: {theme.nameFontSize}pt</Label>
        <Slider
          value={[theme.nameFontSize]}
          onValueChange={([value]) => updateTheme({ nameFontSize: value })}
          min={18}
          max={40}
          step={1}
          className="w-64"
        />
      </div>

      {/* Title Font Size */}
      <div className="space-y-3">
        <Label>Professional Title Font Size: {theme.titleFontSize}pt</Label>
        <Slider
          value={[theme.titleFontSize]}
          onValueChange={([value]) => updateTheme({ titleFontSize: value })}
          min={10}
          max={24}
          step={1}
          className="w-64"
        />
      </div>
    </div>
  );
}
