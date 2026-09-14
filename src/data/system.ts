import type { ModuleId } from "@/stores/navigation-store";
export type SystemModule = {
  id: ModuleId;
  name: string;
  short: string;
  caption: string;
  position: [number, number, number];
  color: string;
  detail: string;
  implementation: string;
};
export const systemModules: SystemModule[] = [
  {
    id: "feed",
    name: "Market feed",
    short: "MARKET FEED",
    caption: "A message enters the system.",
    position: [-5.5, 0.3, 1.5],
    color: "#8ac5a4",
    detail:
      "Seeded market events carry a symbol, price, volume, timestamp, and sequence. The exact same records drive this scene and the trading interface.",
    implementation:
      "Local deterministic simulation · 20 ticks/s at 1× · bounded packet history.",
  },
  {
    id: "socket",
    name: "WebSocket engine",
    short: "WEBSOCKET",
    caption: "Receive. Sequence. Deliver.",
    position: [-3.7, 0.3, -2],
    color: "#82adc4",
    detail:
      "A production WebSocket manages continuous messages, reconnects, and sequence gaps. This node visualizes that boundary; this demo uses a local transport.",
    implementation:
      "No live exchange connection. Packet sequence and contents come from MarketEngine.",
  },
  {
    id: "data",
    name: "Data engine",
    short: "DATA ENGINE",
    caption: "Normalize and distribute.",
    position: [-0.8, 0.3, -3.4],
    color: "#b3a1e4",
    detail:
      "A single simulation snapshot owns book levels, trades, and packets. Data updates live outside the React component tree.",
    implementation:
      "Seven levels per side. Thirty trade rows. At most 160 retained packets.",
  },
  {
    id: "state",
    name: "State / normalization",
    short: "STATE LAYER",
    caption: "Keep one coherent snapshot.",
    position: [2.4, 0.3, -2.8],
    color: "#c9ae73",
    detail:
      "Consumers read consistent snapshots. UI publication is coalesced with requestAnimationFrame, rather than rerendering the page for every event.",
    implementation:
      "Market leaves subscribe at a deliberate cadence. Navigation state remains separate.",
  },
  {
    id: "order",
    name: "Order engine",
    short: "ORDER ENGINE",
    caption: "Market state becomes a decision.",
    position: [4.8, 0.3, 0.15],
    color: "#afa0e9",
    detail:
      "Depth, prices, and quantities become an interactive order book. A ticket captures the selected price and validates a whole number of lots.",
    implementation:
      "Total = price × lots × 100. Orders are local simulations, never real transactions.",
  },
  {
    id: "render",
    name: "Render engine",
    short: "RENDER ENGINE",
    caption: "Update only what changed.",
    position: [2.5, 0.3, 3.2],
    color: "#8faadb",
    detail:
      "The 3D scene reads simulation state in the frame loop. Instanced packet transforms bypass React; financial charts update an imperative Canvas series.",
    implementation:
      "Instanced meshes · bounded draw work · adaptive pixel ratio · no bloom or postprocessing.",
  },
  {
    id: "mobile",
    name: "Mobile client",
    short: "MOBILE CLIENT",
    caption: "The data reaches the screen.",
    position: [-1.4, 0.3, 3.8],
    color: "#a6baa8",
    detail:
      "React turns the same market state into accessible, touch-friendly controls. This portfolio demonstrates the frontend patterns behind mobile trading systems.",
    implementation:
      "Semantic order controls, focus-trapped dialogs, keyboard navigation, and a complete 2D path.",
  },
];
export const tracePath: ModuleId[] = [
  "feed",
  "socket",
  "data",
  "state",
  "order",
  "render",
  "mobile",
];
export const coreModule: SystemModule = {
  id: "core",
  name: "Risang market engine",
  short: "MARKET ENGINE",
  caption: "One simulation. Every surface.",
  position: [0, 0.3, 0],
  color: "#b2a0e7",
  detail:
    "An interactive map of a real-time application. Follow an actual simulated message from the feed to the interface.",
  implementation:
    "React Three Fiber + Three.js · external simulation · React + TypeScript · Zustand UI state.",
};
