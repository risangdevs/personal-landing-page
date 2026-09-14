"use client";
import { useEffect, useRef } from "react";
import { X, Pause, Play } from "lucide-react";
import { useNavigation, type Quality } from "@/stores/navigation-store";
import { useUI } from "@/stores/ui-store";
import { marketEngine } from "@/engine/market-engine";
import { useMarket } from "@/features/market/use-market";
export function ExperienceSettings({
  onClose,
  onContact,
  onCommands,
}: {
  onClose: () => void;
  onContact: () => void;
  onCommands: () => void;
}) {
  const menu = useRef<HTMLDivElement>(null);
  const quality = useNavigation((s) => s.quality),
    mode = useNavigation((s) => s.mode),
    fps = useNavigation((s) => s.fps);
  const { snapshot } = useMarket(800);
  useEffect(() => {
    const listener = (e: PointerEvent) => {
      if (
        e.target instanceof Element &&
        !menu.current?.contains(e.target) &&
        !e.target.closest('[aria-controls="experience-settings"]')
      )
        onClose();
    };
    document.addEventListener("pointerdown", listener);
    return () => document.removeEventListener("pointerdown", listener);
  }, [onClose]);
  return (
    <div
      ref={menu}
      className="quiet-settings"
      id="experience-settings"
      role="region"
      aria-label="Settings and contact"
    >
      <button
        className="detail-close"
        onClick={onClose}
        aria-label="Close settings"
      >
        <X size={17} />
      </button>
      <button className="settings-link" onClick={onContact}>
        Contact Risang ↗
      </button>
      <button className="settings-link" onClick={onCommands}>
        Command navigation <kbd>⌘ K</kbd>
      </button>
      <label>
        Experience quality
        <select
          aria-label="Experience quality"
          value={quality}
          onChange={(e) => {
            const q = e.target.value as Quality;
            useNavigation.getState().setQuality(q);
            useUI.getState().setQuality(q === "Auto" ? "Medium" : q);
          }}
        >
          {["Auto", "High", "Medium", "Low"].map((q) => (
            <option key={q}>{q}</option>
          ))}
        </select>
      </label>
      <button
        className="settings-link"
        onClick={() =>
          useNavigation.getState().setMode(mode === "3d" ? "2d" : "3d")
        }
      >
        {mode === "3d" ? "Use 2D view" : "Use 3D view"}
      </button>
      <details>
        <summary>Technical readouts</summary>
        <p>
          Sequence #{snapshot.sequence}
          <br />
          {mode === "3d" ? `${fps || "—"} rAF/s` : "2D view"} · Simulated data
        </p>
        <button
          className="secondary"
          onClick={() => marketEngine.setPaused(!snapshot.paused)}
        >
          {snapshot.paused ? <Play size={13} /> : <Pause size={13} />}{" "}
          {snapshot.paused ? "Resume feed" : "Pause feed"}
        </button>
      </details>
    </div>
  );
}
