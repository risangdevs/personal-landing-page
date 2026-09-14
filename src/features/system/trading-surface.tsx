"use client";
import { priceTone } from "@/engine/market-engine";
import { useState } from "react";
import { ArrowRight, ArrowLeft, Layers3, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { MarketChart } from "@/components/market-chart";
import {
  OrderBook,
  RunningTrade,
  EngineControls,
} from "@/features/market/orderbook";
import { useMarket } from "@/features/market/use-market";
import { useNavigation } from "@/stores/navigation-store";
import { EngineeringView } from "./engineering-view";
export function InitialTerminal({ onInspect }: { onInspect: () => void }) {
  const { snapshot } = useMarket(350);
  const [range, setRange] = useState("1D");
  return (
    <motion.div
      className="initial-terminal"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="terminal-topline">
        <span>
          <span className="live-dot" /> MARKET CONNECTED
        </span>
        <span>SIMULATED / IDX</span>
      </div>
      <div className="initial-terminal-heading">
        <div>
          <span className="eyebrow">IDX COMPOSITE</span>
          <h2>
            {snapshot.index.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h2>
          <span className="positive">
            ▲ +1.24% <span className="muted">fictional change</span>
          </span>
        </div>
        <span className="market-session">
          SESSION 001
          <br />
          REALTIME SYSTEMS
        </span>
      </div>
      <MarketChart range={range} large />
      <div className="terminal-range">
        {["1D", "1W", "1M", "1Y", "ALL"].map((r) => (
          <button
            key={r}
            className={range === r ? "selected" : ""}
            onClick={() => setRange(r)}
          >
            {r}
          </button>
        ))}
      </div>
      <div className="terminal-signature">
        <div>
          <span className="eyebrow">RISANG / MARKET SYSTEMS</span>
          <p>Engineering realtime experiences.</p>
        </div>
        <button className="primary" onClick={onInspect}>
          Inspect system <Layers3 size={16} />
        </button>
      </div>
      <p className="terminal-hint">
        There’s an entire system behind this screen.
      </p>
    </motion.div>
  );
}
export function OrderSurface({
  onReturn,
  onArchitecture,
}: {
  onReturn: () => void;
  onArchitecture: () => void;
}) {
  const [tab, setTab] = useState("Order book");
  const reduced = useReducedMotion();
  const { snapshot } = useMarket(400);
  return (
    <motion.section
      className="order-surface"
      initial={{
        opacity: 0,
        scale: reduced ? 1 : 0.78,
        rotateX: reduced ? 0 : 9,
        y: reduced ? 0 : 60,
      }}
      animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: 50 }}
      transition={{ duration: reduced ? 0 : 0.65, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <header>
        <button className="back-link" onClick={onReturn}>
          <ArrowLeft size={15} /> Back to project
        </button>
        <span className="eyebrow">ORDER ENGINE / MECI</span>
      </header>
      <div className="order-project-heading">
        <div>
          <span className="eyebrow">SECURITIES TRADING PLATFORM</span>
          <h1>
            MECI<span> / BBCA</span>
          </h1>
          <p>Mobile / Frontend Engineer · React Native · TypeScript</p>
        </div>
        <span className="project-tag">PRODUCTION EXPERIENCE</span>
      </div>
      <div className="order-surface-tabs">
        {["Order book", "Running trade", "Engineering"].map((t) => (
          <button
            key={t}
            className={tab === t ? "active" : ""}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>
      {tab === "Engineering" ? (
        <EngineeringView onArchitecture={onArchitecture} />
      ) : (
        <>
          <div className="order-price">
            <span>
              BBCA <small>LAST / SIMULATED</small>
            </span>
            <strong>
              {snapshot.lastPrice.toLocaleString()}
              <small
                className={priceTone(
                  snapshot.lastPrice,
                  snapshot.previousClose,
                )}
              >
                {snapshot.lastPrice - snapshot.previousClose > 0 ? "+" : ""}
                {snapshot.lastPrice - snapshot.previousClose} (
                {(
                  (snapshot.lastPrice / snapshot.previousClose - 1) *
                  100
                ).toFixed(2)}
                %)
              </small>
            </strong>
          </div>
          <EngineControls />
          {tab === "Order book" ? (
            <OrderBook onArchitecture={onArchitecture} />
          ) : (
            <RunningTrade />
          )}
        </>
      )}
      <footer>
        FICTIONAL MARKET DATA <span>NO REAL TRANSACTIONS</span>
      </footer>
    </motion.section>
  );
}
