import { create } from "zustand";
import type { MarketPacket } from "@/engine/market-engine";
export type ModuleId =
  "feed" | "socket" | "data" | "state" | "order" | "render" | "mobile" | "core";
export type ExperiencePhase =
  "opening" | "terminal" | "entering" | "system" | "order";
export type Quality = "Auto" | "High" | "Medium" | "Low";
type NavigationState = {
  phase: ExperiencePhase;
  mode: "3d" | "2d";
  selected: ModuleId;
  quality: Quality;
  effectiveQuality: Exclude<Quality, "Auto">;
  reducedMotion: boolean;
  ready: boolean;
  fps: number;
  packet: MarketPacket | null;
  traceStep: number;
  tracing: boolean;
  palette: boolean;
  contact: boolean;
  setPhase: (p: ExperiencePhase) => void;
  setMode: (mode: "3d" | "2d") => void;
  select: (id: ModuleId) => void;
  setQuality: (q: Quality) => void;
  setEffectiveQuality: (q: Exclude<Quality, "Auto">) => void;
  setReducedMotion: (v: boolean) => void;
  setReady: (v: boolean) => void;
  setFps: (v: number) => void;
  inspectPacket: (p: MarketPacket | null) => void;
  setTrace: (step: number, tracing: boolean) => void;
};
export const useNavigation = create<NavigationState>((set) => ({
  phase: "opening",
  mode: "3d",
  selected: "core",
  quality: "Auto",
  effectiveQuality: "Medium",
  reducedMotion: false,
  ready: false,
  fps: 0,
  packet: null,
  traceStep: -1,
  tracing: false,
  palette: false,
  contact: false,
  setPhase: (phase) => set({ phase }),
  setMode: (mode) => set({ mode, ready: mode === "2d" }),
  select: (selected) => set({ selected }),
  setQuality: (quality) =>
    set({
      quality,
      ...(quality === "Auto" ? {} : { effectiveQuality: quality }),
    }),
  setEffectiveQuality: (effectiveQuality) => set({ effectiveQuality }),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
  setReady: (ready) => set({ ready }),
  setFps: (fps) => set({ fps }),
  inspectPacket: (packet) => set({ packet }),
  setTrace: (traceStep, tracing) => set({ traceStep, tracing }),
}));
