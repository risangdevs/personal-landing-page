"use client";
import {
  ArrowDown,
  Radio,
  Network,
  Database,
  Layers3,
  ChartNoAxesCombined,
  Smartphone,
  SlidersHorizontal,
} from "lucide-react";
import { systemModules } from "@/data/system";
import { useNavigation } from "@/stores/navigation-store";
const icons = [
  Radio,
  Network,
  Database,
  Layers3,
  SlidersHorizontal,
  ChartNoAxesCombined,
  Smartphone,
];
export function SystemFallback() {
  const selected = useNavigation((s) => s.selected);
  const select = useNavigation((s) => s.select);
  const tracing = useNavigation((s) => s.tracing);
  return (
    <div className="system-fallback">
      <div className="fallback-core">
        <span className="system-logo">R /</span>
        <span>
          RISANG<strong>MARKET ENGINE</strong>
        </span>
        <span className="live-dot" />
      </div>
      <div
        className="fallback-path"
        role="group"
        aria-label="System architecture without 3D"
      >
        {systemModules.map((m, i) => {
          const Icon = icons[i];
          return (
            <div key={m.id}>
              <button
                className={selected === m.id ? "selected" : ""}
                disabled={tracing}
                onClick={() => select(m.id)}
              >
                <Icon size={22} />
                <span>
                  <small>0{i + 1}</small>
                  {m.name}
                </span>
                <span className="fallback-status">CONNECTED</span>
              </button>
              {i < systemModules.length - 1 && <ArrowDown size={17} />}
            </div>
          );
        })}
      </div>
      <p>
        Complete 2D system view. Every module and interaction remains available.
      </p>
    </div>
  );
}
