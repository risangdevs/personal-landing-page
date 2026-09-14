export type ProjectId = "meci" | "bangjeff" | "odoo" | "native" | "research";
export type Project = {
  id: ProjectId;
  symbol: string;
  title: string;
  category: string;
  status: string;
  color: string;
  initials: string;
  stack: string[];
  description: string;
  areas: string[];
  notes: { title: string; body: string }[];
};
export const projects: Project[] = [
  {
    id: "meci",
    symbol: "MECI",
    title: "Project MECI",
    category: "Securities trading platform",
    status: "Production",
    color: "#8c7aff",
    initials: "si",
    stack: [
      "React Native",
      "TypeScript",
      "WebSockets",
      "Kotlin",
      "TradingView",
      "Lightweight Charts",
      "REST API",
      "Hermes",
    ],
    description:
      "Engineering the interface between people and fast-moving markets. A mobile securities experience built around timely data, clear decisions, and dependable interactions.",
    areas: [
      "Order book",
      "Running trade",
      "Watchlist",
      "Portfolio",
      "Order entry",
      "Financial charts",
      "KYC",
      "Tax reporting",
      "Native Android modules",
      "Performance optimization",
      "Application architecture",
    ],
    notes: [
      {
        title: "Realtime data, deliberate rendering",
        body: "Separate incoming market events from the UI refresh cadence. Normalize updates, retain bounded history, and subscribe at the smallest useful component boundary.",
      },
      {
        title: "A bridge to native",
        body: "Kotlin integrations extend the mobile application where platform APIs or rendering needs warrant native code. The browser demo here is illustrative, not the production implementation.",
      },
      {
        title: "Financial flows need clarity",
        body: "KYC, order entry, portfolio views, and tax reporting require explicit state, predictable validation, and careful failure handling.",
      },
    ],
  },
  {
    id: "bangjeff",
    symbol: "BANGJEFF",
    title: "Bangjeff",
    category: "Flutter mobile application",
    status: "Production",
    color: "#f6ab67",
    initials: "bj",
    stack: ["Flutter", "GetX", "WebSocket", "MMKV", "Charts"],
    description:
      "A responsive Flutter experience with live crypto prices, useful caching, and careful attention to the moments between loaded states.",
    areas: [
      "Live crypto prices",
      "MMKV caching",
      "Animated search",
      "Shimmer loading",
      "Theme handling",
      "Charts",
    ],
    notes: [
      {
        title: "Live state with GetX",
        body: "Keep connection lifecycle separate from presentation controllers. Subscribe only to the instruments currently needed and tear down listeners when the screen closes.",
      },
      {
        title: "Cache with an expiry policy",
        body: "MMKV caching can make repeated reads fast. Cached prices need a timestamp and stale indicator; they should never silently impersonate live quotes.",
      },
      {
        title: "Loading that preserves context",
        body: "Stable shimmer dimensions, cancellable search, and coherent light/dark tokens reduce visual interruption.",
      },
    ],
  },
  {
    id: "odoo",
    symbol: "ODOO ERP",
    title: "Odoo ERP",
    category: "Enterprise business systems",
    status: "Enterprise",
    color: "#d694cf",
    initials: "od",
    stack: ["Python", "Odoo 9", "Business workflows"],
    description:
      "Connecting operational workflows across purchasing, inventory, sales, and finance with enterprise modules that reflect how a business works.",
    areas: [
      "Sales",
      "Purchase",
      "Inventory",
      "Warehouse",
      "Invoicing",
      "Reporting",
      "Forms and views",
      "Module customization",
    ],
    notes: [
      {
        title: "Model the business before the screen",
        body: "Document state transitions and ownership between departments. Validate quantities, access rights, and accounting implications at each transition.",
      },
      {
        title: "Module customization",
        body: "Extend forms, views, and Python models while preserving the underlying workflow contracts and upgrade boundaries.",
      },
    ],
  },
  {
    id: "native",
    symbol: "NATIVE ORDERBOOK",
    title: "Native order book",
    category: "Rendering experiment",
    status: "Experiment",
    color: "#68b7dc",
    initials: "kt",
    stack: ["Kotlin", "Android", "Canvas"],
    description:
      "Exploring where a native rendering surface can help a rapidly changing market-depth interface.",
    areas: [
      "Frame budgets",
      "JS/native boundaries",
      "Market-depth visualization",
    ],
    notes: [
      {
        title: "Know the boundary cost",
        body: "Moving drawing to native does not remove work. Batching data across the bridge, keeping memory bounded, and measuring end-to-end latency still matter.",
      },
    ],
  },
  {
    id: "research",
    symbol: "RESEARCH SYSTEMS",
    title: "Applied engineering",
    category: "Research & teaching",
    status: "Academic",
    color: "#78bea0",
    initials: "re",
    stack: ["HVAC", "Energy efficiency", "CFD"],
    description:
      "Applying engineering methods to airflow, thermal comfort, and the performance of building systems.",
    areas: [
      "Ventilation",
      "Air distribution",
      "Cleanroom",
      "Data center cooling",
      "Thermal comfort",
    ],
    notes: [
      {
        title: "From variables to evidence",
        body: "Define boundary conditions, select measurable outputs, and distinguish model predictions from validated measurements.",
      },
    ],
  },
];
