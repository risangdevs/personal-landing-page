import { create } from "zustand";
// Form / market presentation state is separate from camera navigation and live data.
export const useUI = create<{
  inspector: string;
  quality: "Low" | "Medium" | "High";
  setInspector: (value: string) => void;
  setQuality: (value: "Low" | "Medium" | "High") => void;
}>((set) => ({
  inspector: "Order book",
  quality: "High",
  setInspector: (inspector) => set({ inspector }),
  setQuality: (quality) => set({ quality }),
}));
