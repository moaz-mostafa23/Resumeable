import { create } from "zustand";

interface EditorState {
  activeSection: string | null;
  previewZoom: number;
  sidebarOpen: boolean;

  setActiveSection: (sectionId: string | null) => void;
  setPreviewZoom: (zoom: number) => void;
  toggleSidebar: () => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  activeSection: "header",
  previewZoom: 100,
  sidebarOpen: true,

  setActiveSection: (sectionId) => set({ activeSection: sectionId }),
  setPreviewZoom: (zoom) => set({ previewZoom: zoom }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));
