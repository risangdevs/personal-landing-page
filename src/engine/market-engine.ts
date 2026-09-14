export type MarketPacket = {
  sequence: number;
  symbol: string;
  price: number;
  volume: number;
  timestamp: string;
  createdAt: number;
  type: "MARKET_TICK";
};
export type Level = { price: number; lots: number; frequency: number };
export type Trade = {
  id: number;
  time: string;
  code: string;
  price: number;
  change: number;
  lots: number;
  buyer: string;
  seller: string;
};
export type MarketSnapshot = {
  sequence: number;
  packets: MarketPacket[];
  index: number;
  previousClose: number;
  lastPrice: number;
  bids: Level[];
  asks: Level[];
  trades: Trade[];
  speed: number;
  paused: boolean;
};
export class MarketEngine {
  private seed: number;
  private listeners = new Set<() => void>();
  private timer: ReturnType<typeof setInterval> | null = null;
  private sequence = 0;
  private snapshot: MarketSnapshot;
  constructor(seed = 42) {
    this.seed = seed;
    this.snapshot = {
      sequence: 0,
      packets: [],
      index: 7846.21,
      previousClose: 7200,
      lastPrice: 7125,
      bids: Array.from({ length: 10 }, (_, i) => ({
        price: 7100 - i * 25,
        lots: 34200 + i * 12917,
        frequency: 186 + i * 73,
      })),
      asks: Array.from({ length: 10 }, (_, i) => ({
        price: 7125 + i * 25,
        lots: 8763 + i * 7642,
        frequency: 38 + i * 29,
      })),
      trades: [],
      speed: 1,
      paused: false,
    };
  }
  private random() {
    this.seed = (Math.imul(1664525, this.seed) + 1013904223) >>> 0;
    return this.seed / 4294967296;
  }
  getSnapshot = () => this.snapshot;
  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    if (this.listeners.size === 1) this.start();
    return () => {
      this.listeners.delete(listener);
      if (!this.listeners.size) this.stop();
    };
  };
  private emit() {
    this.listeners.forEach((fn) => fn());
  }
  generateTick = () => {
    if (this.snapshot.paused) return;
    this.sequence++;
    const update = (levels: Level[]) =>
      levels.map((l) => {
        const frequency = Math.max(
          1,
          Math.min(l.lots, l.frequency + Math.round((this.random() - 0.5) * 8)),
        );
        return {
          ...l,
          frequency,
          lots: Math.max(
            frequency,
            Math.round(l.lots + (this.random() - 0.5) * 1400),
          ),
        };
      });
    const base =
      this.sequence % 80 === 0 ? (this.random() > 0.5 ? 25 : -25) : 0;
    const bids = update(this.snapshot.bids).map((l) => ({
      ...l,
      price: l.price + base,
    }));
    const asks = update(this.snapshot.asks).map((l) => ({
      ...l,
      price: l.price + base,
    }));
    const code = ["BBCA", "BBRI", "TLKM", "BMRI"][
      Math.floor(this.random() * 4)
    ];
    const price =
      code === "BBCA"
        ? asks[0].price
        : code === "BBRI"
          ? 4970
          : code === "TLKM"
            ? 2980
            : 6150;
    const trade: Trade = {
      id: this.sequence,
      time: new Date().toLocaleTimeString("en-GB"),
      code,
      price,
      change: this.random() > 0.25 ? 1.42 : -0.38,
      lots: Math.ceil(this.random() * 1200),
      buyer: ["YP", "CC", "AK"][Math.floor(this.random() * 3)],
      seller: ["PD", "NI", "XL"][Math.floor(this.random() * 3)],
    };
    const packet: MarketPacket = {
      sequence: this.sequence,
      symbol: trade.code,
      price: trade.price,
      volume: trade.lots * 100,
      timestamp: new Date().toISOString(),
      createdAt: Date.now(),
      type: "MARKET_TICK",
    };
    this.snapshot = {
      ...this.snapshot,
      sequence: this.sequence,
      packets: [...this.snapshot.packets, packet].slice(-160),
      index: Math.max(
        7300,
        this.snapshot.index + (this.random() - 0.48) * 0.45,
      ),
      bids,
      asks,
      lastPrice: code === "BBCA" ? price : this.snapshot.lastPrice,
      trades: [trade, ...this.snapshot.trades].slice(0, 30),
    };
    this.emit();
  };
  setSpeed = (speed: number) => {
    this.snapshot = {
      ...this.snapshot,
      speed: [1, 2, 5, 10, 25].includes(speed) ? speed : 1,
    };
    if (this.timer) {
      this.stop();
      this.start();
    }
    this.emit();
  };
  setPaused = (paused: boolean) => {
    this.snapshot = { ...this.snapshot, paused };
    this.emit();
  };
  start() {
    if (!this.timer)
      this.timer = setInterval(() => {
        if (typeof document !== "undefined" && document.hidden) return;
        for (let i = 0; i < this.snapshot.speed; i++) this.generateTick();
      }, 50);
  }
  stop() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }
  destroy() {
    this.stop();
    this.listeners.clear();
  }
}
export const marketEngine = new MarketEngine();

export const priceTone = (price: number, previousClose: number) =>
  price < previousClose
    ? "negative"
    : price > previousClose
      ? "positive"
      : "price-unchanged";
