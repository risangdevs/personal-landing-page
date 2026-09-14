"use client";
import { useEffect, useState, useRef } from "react";
import { marketEngine } from "@/engine/market-engine";
import { useUI } from "@/stores/ui-store";
// Coalesce raw feed events before React sees them. Only subscribing market leaves render.
export function useMarket(interval = 150) {
  const quality = useUI((s) => s.quality);
  const [snapshot, setSnapshot] = useState(marketEngine.getSnapshot);
  const commits = useRef(0);
  useEffect(() => {
    let frame = 0,
      last = 0;
    const cadence =
      quality === "Low" ? 500 : quality === "Medium" ? 250 : interval;
    const unsubscribe = marketEngine.subscribe(() => {
      if (frame || document.hidden) return;
      frame = requestAnimationFrame((t) => {
        frame = 0;
        if (t - last >= cadence) {
          last = t;
          setSnapshot(marketEngine.getSnapshot());
        }
      });
    });
    return () => {
      unsubscribe();
      cancelAnimationFrame(frame);
    };
  }, [interval, quality]);
  useEffect(() => {
    commits.current++;
  }, [snapshot]);
  return { snapshot, commits: commits.current };
}
