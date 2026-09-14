"use client";
import { useState } from "react";
import {
  Activity,
  Smartphone,
  ShieldCheck,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
const decisions = [
  {
    label: "Realtime",
    icon: Activity,
    title: "Fast data. Deliberate rendering.",
    stages: ["Market events", "Bounded state", "UI updates"],
    captions: ["Receive", "Normalize", "Batch"],
    text: "Keep incoming events separate from screen refreshes. Subscribe only where the data is used.",
    stack: "WebSockets · TypeScript · React Native",
  },
  {
    label: "Native",
    icon: Smartphone,
    title: "Use the right rendering surface.",
    stages: ["React Native", "Native bridge", "Android"],
    captions: ["Interface", "Integration", "Platform APIs"],
    text: "Extend the mobile app with Kotlin where platform APIs or rendering needs call for native code.",
    stack: "React Native · Kotlin · Android",
  },
  {
    label: "Order safety",
    icon: ShieldCheck,
    title: "Make every order state explicit.",
    stages: ["Choose price", "Validate lots", "Confirm order"],
    captions: ["Capture", "Check", "Acknowledge"],
    text: "Hold the selected price steady. Validate whole lots and show a clear result before the next action.",
    stack: "Explicit state · Input validation · Clear feedback",
  },
];
export function EngineeringView({
  onArchitecture,
}: {
  onArchitecture: () => void;
}) {
  const [selected, setSelected] = useState(0);
  const decision = decisions[selected];
  return (
    <section className="engineering-visual" aria-label="Engineering decisions">
      <div
        className="engineering-choices"
        aria-label="Choose an engineering decision"
      >
        {decisions.map((item, i) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              aria-pressed={selected === i}
              aria-controls="engineering-decision"
              onClick={() => setSelected(i)}
            >
              <Icon size={20} aria-hidden="true" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
      <div
        id="engineering-decision"
        className="engineering-decision"
        aria-live="polite"
      >
        <h2>{decision.title}</h2>
        <ol className="engineering-flow" aria-label={`${decision.label} flow`}>
          {decision.stages.map((stage, i) => (
            <li key={stage}>
              <span className="flow-caption">{decision.captions[i]}</span>
              <strong>{stage}</strong>
              <span className="flow-step">0{i + 1}</span>
              {i < 2 && (
                <ArrowRight
                  className="flow-arrow"
                  size={16}
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ol>
        <p>{decision.text}</p>
        <span className="engineering-stack">{decision.stack}</span>
      </div>
      <div className="engineering-explore">
        <span>Illustrative architecture</span>
        <button className="secondary" onClick={onArchitecture}>
          Explore the system <ArrowUpRight size={15} />
        </button>
      </div>
    </section>
  );
}
