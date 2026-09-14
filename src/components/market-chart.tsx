"use client";
import { useEffect, useRef } from "react";
import {
  AreaSeries,
  ColorType,
  createChart,
  type Time,
} from "lightweight-charts";
import { marketEngine } from "@/engine/market-engine";
import { useUI } from "@/stores/ui-store";
export function MarketChart({
  range = "1D",
  large = false,
  instrument = "IDX",
}: {
  range?: string;
  large?: boolean;
  instrument?: "IDX" | "BBCA";
}) {
  const host = useRef<HTMLDivElement>(null);
  const quality = useUI((s) => s.quality);
  useEffect(() => {
    if (!host.current) return;
    const chart = createChart(host.current, {
      autoSize: true,
      height: large ? 270 : 205,
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#858b99",
        fontFamily: "monospace",
        fontSize: 11,
        attributionLogo: true,
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { color: "#20232c", style: 2 },
      },
      rightPriceScale: { borderVisible: false },
      timeScale: {
        borderVisible: false,
        timeVisible: range === "1D",
        secondsVisible: false,
      },
      crosshair: {
        vertLine: { color: "#8275ce", labelBackgroundColor: "#6253b3" },
        horzLine: { color: "#8275ce", labelBackgroundColor: "#6253b3" },
      },
      handleScroll: true,
      handleScale: true,
    });
    const series = chart.addSeries(AreaSeries, {
      lineColor: "#9987ff",
      topColor: "rgba(139,117,255,.18)",
      bottomColor: "rgba(139,117,255,0)",
      lineWidth: 2,
      priceLineColor: "#9987ff",
      lastValueVisible: true,
    });
    const now = 1726142400;
    let value = 7650;
    let seed = range.split("").reduce((a, c) => a + c.charCodeAt(0), 42);
    const data = Array.from({ length: 100 }, (_, i) => {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      value += (seed / 4294967296 - 0.4) * 20;
      return { time: (now + i * (range === "1D" ? 60 : 86400)) as Time, value };
    });
    const shift = (instrument === "BBCA" ? 7125 : 7846.21) - data[99].value;
    data.forEach((d) => (d.value += shift));
    series.setData(data);
    chart.timeScale().fitContent();
    let last = 0;
    const unsub = marketEngine.subscribe(() => {
      const s = marketEngine.getSnapshot();
      if (
        document.hidden ||
        performance.now() - last < (quality === "Low" ? 1000 : 250)
      )
        return;
      last = performance.now();
      series.update({
        time: data[99].time,
        value: instrument === "BBCA" ? s.asks[0].price : s.index,
      });
    });
    return () => {
      unsub();
      chart.remove();
    };
  }, [range, large, instrument, quality]);
  return (
    <div
      className="chart"
      role="img"
      aria-label={`Simulated ${instrument === "BBCA" ? "BBCA" : "IDX Composite"} area chart, ${range} view. Initial value ${instrument === "BBCA" ? "7,125" : "7,846.21"}. Fictional market data.`}
      ref={host}
    />
  );
}
