"use client";
import { useState } from "react";
import { Minus, Plus, Check, ArrowUpRight, Pause, Play } from "lucide-react";
import { useMarket } from "./use-market";
import { marketEngine, priceTone } from "@/engine/market-engine";
import { Modal, Tag } from "@/components/ui";
import { useUI } from "@/stores/ui-store";
const number = (n: number) => n.toLocaleString("en-US");
export function OrderBook({
  onArchitecture,
}: { onArchitecture?: () => void } = {}) {
  const { snapshot } = useMarket();
  const [price, setPrice] = useState<number | null>(null);
  const [lots, setLots] = useState(10);
  const [done, setDone] = useState(false);
  const setInspector = useUI((s) => s.setInspector);
  function choose(value: number) {
    setPrice(value);
    setLots(10);
    setDone(false);
    setInspector("Order entry");
  }
  return (
    <>
      <div className="book-heading">
        <div>
          <h3>
            Order book <Tag>BBCA</Tag>
          </h3>
          <p>Tap a price to place a simulated order.</p>
        </div>
        <span className="positive small-text">
          Spread {snapshot.asks[0].price - snapshot.bids[0].price}
        </span>
      </div>
      <div className="reference-book">
        <table aria-label="BBCA order book">
          <thead>
            <tr>
              {["Freq", "Lot", "Bid", "Ask", "Lot", "Freq"].map((label, i) => (
                <th scope="col" key={i}>
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {snapshot.bids.map((bid, i) => {
              const ask = snapshot.asks[i];
              const maxLots = Math.max(
                ...snapshot.bids.map((l) => l.lots),
                ...snapshot.asks.map((l) => l.lots),
              );
              return (
                <tr key={i}>
                  <td className="book-frequency">{number(bid.frequency)}</td>
                  <td className="depth-lot bid-depth">
                    <i
                      aria-hidden="true"
                      style={{ width: `${(bid.lots / maxLots) * 100}%` }}
                    />
                    <span>{number(bid.lots)}</span>
                  </td>
                  <td>
                    <button
                      className={priceTone(bid.price, snapshot.previousClose)}
                      onClick={() => choose(bid.price)}
                      aria-label={`Buy BBCA at bid ${bid.price}`}
                    >
                      {number(bid.price)}
                    </button>
                  </td>
                  <td>
                    <button
                      className={priceTone(ask.price, snapshot.previousClose)}
                      onClick={() => choose(ask.price)}
                      aria-label={`Buy BBCA at offer ${ask.price}`}
                    >
                      {number(ask.price)}
                    </button>
                  </td>
                  <td className="depth-lot ask-depth">
                    <i
                      aria-hidden="true"
                      style={{ width: `${(ask.lots / maxLots) * 100}%` }}
                    />
                    <span>{number(ask.lots)}</span>
                  </td>
                  <td className="book-frequency">{number(ask.frequency)}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr aria-label="Displayed depth totals">
              <td className="book-frequency">
                {number(snapshot.bids.reduce((n, l) => n + l.frequency, 0))}
              </td>
              <td>{number(snapshot.bids.reduce((n, l) => n + l.lots, 0))}</td>
              <td colSpan={2}>
                <span className="sr-only">Displayed depth totals</span>
              </td>
              <td>{number(snapshot.asks.reduce((n, l) => n + l.lots, 0))}</td>
              <td className="book-frequency">
                {number(snapshot.asks.reduce((n, l) => n + l.frequency, 0))}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <p className="book-reference-note">
        Price colors compare with previous close{" "}
        {number(snapshot.previousClose)}. Freq = resting orders. Totals cover
        the 10 displayed levels.
      </p>
      <Modal
        open={price !== null}
        onClose={() => setPrice(null)}
        title={done ? "Order accepted" : "Buy BBCA"}
      >
        {done ? (
          <div className="success-state">
            <span className="success-icon">
              <Check size={28} />
            </span>
            <h3>You are using the kind of system I build.</h3>
            <p>
              You just interacted with a simulation of one of the systems I work
              on.
            </p>
            <div className="notice">
              No actual transaction occurred. Your order was simulated locally.
            </div>
            <button
              className="primary"
              onClick={() => {
                setPrice(null);
                setInspector("Architecture");
                onArchitecture?.();
              }}
            >
              View system architecture <ArrowUpRight size={16} />
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (lots >= 1 && lots <= 10000 && Number.isInteger(lots))
                setDone(true);
            }}
          >
            <div className="ticket-symbol">
              <strong>Bank Central Asia</strong>
              <Tag>SIMULATION</Tag>
            </div>
            <label className="field">
              Limit price
              <input
                readOnly
                value={number(price || 0)}
                aria-label="Order limit price"
              />
            </label>
            <label className="field">
              Lots <span className="muted">1 lot = 100 shares</span>
              <div className="stepper">
                <button
                  type="button"
                  aria-label="Decrease lots"
                  disabled={lots <= 1}
                  onClick={() => setLots((n) => Math.max(1, n - 1))}
                >
                  <Minus size={17} />
                </button>
                <input
                  type="number"
                  min={1}
                  max={10000}
                  step={1}
                  required
                  value={Number.isNaN(lots) ? "" : lots}
                  onChange={(e) => setLots(e.target.valueAsNumber)}
                  aria-label="Number of lots"
                />
                <button
                  type="button"
                  aria-label="Increase lots"
                  disabled={lots >= 10000}
                  onClick={() => setLots((n) => Math.min(10000, n + 1))}
                >
                  <Plus size={17} />
                </button>
              </div>
            </label>
            <div className="ticket-total">
              <span>Order total</span>
              <strong>Rp {number((price || 0) * (lots || 0) * 100)}</strong>
            </div>
            <p className="form-note">
              Illustrative total, excluding fees. All prices are fictional.
            </p>
            <button className="primary full" type="submit">
              Buy · Simulate order
            </button>
          </form>
        )}
      </Modal>
    </>
  );
}
export function RunningTrade() {
  const { snapshot, commits } = useMarket(250);
  const [paused, setPaused] = useState(false);
  const [frozen, setFrozen] = useState(snapshot.trades);
  const rows = paused ? frozen : snapshot.trades;
  return (
    <div className="trade-panel">
      <div className="book-heading">
        <h3>Running trade</h3>
        <button
          className="secondary compact"
          onClick={() => {
            setFrozen(snapshot.trades);
            setPaused(!paused);
          }}
        >
          {paused ? <Play size={13} /> : <Pause size={13} />}{" "}
          {paused ? "Resume" : "Pause"}
        </button>
      </div>
      <div className="trade-scroll">
        <table>
          <thead>
            <tr>
              {[
                "Time",
                "Code",
                "Price",
                "Change",
                "Lots",
                "Buyer",
                "Seller",
              ].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, 7).map((t) => (
              <tr key={t.id}>
                <td>{t.time}</td>
                <td>{t.code}</td>
                <td>{number(t.price)}</td>
                <td className={t.change > 0 ? "positive" : "negative"}>
                  {t.change > 0 ? "+" : ""}
                  {t.change}%
                </td>
                <td>{number(t.lots)}</td>
                <td>{t.buyer}</td>
                <td>{t.seller}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="feed-metrics">
        <span>Target {20 * snapshot.speed} updates/s</span>
        <span>UI commits {commits}</span>
        <span>{paused ? "Tape paused" : "Streaming simulation"}</span>
      </div>
    </div>
  );
}
export function EngineControls() {
  const { snapshot } = useMarket(250);
  return (
    <div className="engine-controls">
      <span>
        <span className="live-dot" />{" "}
        {snapshot.paused ? "FEED PAUSED" : "SIMULATED FEED"}
      </span>
      <div>
        {[1, 5, 10, 25].map((speed) => (
          <button
            key={speed}
            className={snapshot.speed === speed ? "selected" : ""}
            aria-pressed={snapshot.speed === speed}
            onClick={() => marketEngine.setSpeed(speed)}
          >
            {speed}×
          </button>
        ))}
        <button
          aria-label={
            snapshot.paused ? "Resume market feed" : "Pause market feed"
          }
          onClick={() => marketEngine.setPaused(!snapshot.paused)}
        >
          {snapshot.paused ? <Play size={13} /> : <Pause size={13} />}
        </button>
      </div>
    </div>
  );
}
