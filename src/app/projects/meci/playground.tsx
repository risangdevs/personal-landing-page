"use client";
import { useState } from "react";
import { ArrowRight, Check, RotateCcw } from "lucide-react";
const number = (n: number) => n.toLocaleString("en-US");
export function MeciPlayground() {
  const [topic, setTopic] = useState(0);
  const [queued, setQueued] = useState(0),
    [received, setReceived] = useState(0),
    [renders, setRenders] = useState(0);
  const [market, setMarket] = useState(7125),
    [captured, setCaptured] = useState<number | null>(null);
  const [lots, setLots] = useState("0"),
    [accepted, setAccepted] = useState(false);
  const valid =
    lots.trim() !== "" &&
    Number.isInteger(Number(lots)) &&
    Number(lots) >= 1 &&
    Number(lots) <= 10000;
  const reset = () => {
    setQueued(0);
    setReceived(0);
    setRenders(0);
    setMarket(7125);
    setCaptured(null);
    setLots("0");
    setAccepted(false);
  };
  return (
    <section
      className="meci-playground"
      aria-label="Interactive engineering examples"
    >
      <div className="playground-heading">
        <span>TRY THE ENGINEERING</span>
        <button onClick={reset} aria-label="Reset demonstrations">
          <RotateCcw size={15} />
        </button>
      </div>
      <div
        className="playground-choices"
        role="group"
        aria-label="Choose a demonstration"
      >
        {["Batch updates", "Capture price", "Validate lots"].map((label, i) => (
          <button
            key={label}
            aria-pressed={topic === i}
            aria-controls="playground-panel"
            onClick={() => setTopic(i)}
          >
            {label}
          </button>
        ))}
      </div>
      <div id="playground-panel" className="playground-panel">
        {topic === 0 ? (
          <>
            <h2>Many events. One screen update.</h2>
            <p>Queue a few market events, then publish them together.</p>
            <div className="batch-visual" aria-hidden="true">
              <div>
                {Array.from({ length: 5 }, (_, i) => (
                  <i className={queued > i ? "filled" : ""} key={i} />
                ))}
              </div>
              <ArrowRight size={20} />
              <div
                className={renders ? "batch-screen updated" : "batch-screen"}
              >
                <span />
                <span />
                <span />
              </div>
            </div>
            <dl className="demo-values" aria-live="polite">
              <div>
                <dt>Events received</dt>
                <dd>{received}</dd>
              </div>
              <div>
                <dt>Queued</dt>
                <dd>{queued}</dd>
              </div>
              <div>
                <dt>UI updates</dt>
                <dd>{renders}</dd>
              </div>
            </dl>
            <div className="demo-actions">
              <button
                className="secondary"
                onClick={() => {
                  setQueued((n) => n + 5);
                  setReceived((n) => n + 5);
                }}
              >
                Queue 5 events
              </button>
              <button
                className="primary"
                disabled={!queued}
                onClick={() => {
                  setQueued(0);
                  setRenders((n) => n + 1);
                }}
              >
                Publish batch
              </button>
            </div>
          </>
        ) : topic === 1 ? (
          <>
            <h2>The market moves. Your limit stays.</h2>
            <p>Capture a price, then move the market to compare.</p>
            <div className="price-comparison" aria-live="polite">
              <div>
                <span>MARKET PRICE</span>
                <strong>{number(market)}</strong>
                <small>Changes on demand</small>
              </div>
              <div className={captured !== null ? "price-locked" : ""}>
                <span>YOUR LIMIT</span>
                <strong>{captured === null ? "—" : number(captured)}</strong>
                <small>
                  {captured === null
                    ? "No price selected"
                    : "Captured and held"}
                </small>
              </div>
            </div>
            <div className="demo-actions">
              <button className="primary" onClick={() => setCaptured(market)}>
                Capture price
              </button>
              <button
                className="secondary"
                onClick={() => setMarket((n) => n + 25)}
              >
                Move market +25
              </button>
            </div>
            <div className="demo-message" role="status">
              {captured === null
                ? "Choose a limit to start."
                : market !== captured
                  ? `Market moved to ${number(market)}. Your limit remains ${number(captured)}.`
                  : `Limit captured at ${number(captured)}.`}
            </div>
          </>
        ) : (
          <>
            <h2>A clear check before confirmation.</h2>
            <p>Try zero, a fraction, or a whole number of lots.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (valid) setAccepted(true);
              }}
              noValidate
            >
              <label className="demo-lots-label" htmlFor="demo-lots">
                Quantity in lots <span>1 lot = 100 shares</span>
              </label>
              <input
                id="demo-lots"
                type="number"
                min="1"
                max="10000"
                step="1"
                value={lots}
                onChange={(e) => {
                  setLots(e.target.value);
                  setAccepted(false);
                }}
                aria-invalid={!valid}
                aria-describedby="demo-validation"
              />
              <div
                id="demo-validation"
                className={`demo-message ${valid ? "positive" : "negative"}`}
                role="status"
              >
                {accepted
                  ? "Quantity validated and confirmed."
                  : valid
                    ? "Valid quantity. Ready to simulate."
                    : "Enter a whole number from 1 to 10,000."}
              </div>
              <div className="demo-total">
                <span>Total at 7,125 / share</span>
                <strong>
                  {valid ? `Rp ${number(Number(lots) * 100 * 7125)}` : "—"}
                </strong>
              </div>
              <button
                type="submit"
                className="primary"
                disabled={!valid || accepted}
              >
                {accepted ? (
                  <>
                    <Check size={16} /> Confirmed locally
                  </>
                ) : (
                  "Confirm simulated order"
                )}
              </button>
              {accepted && (
                <p className="demo-message positive" role="status">
                  {number(Number(lots))} lots accepted. No real order was sent.
                </p>
              )}
            </form>
          </>
        )}
      </div>
      <div className="playground-footnote">
        Manual demonstration · Fictional data · No performance benchmark
      </div>
      <noscript>
        These demonstrations need JavaScript. The diagrams and explanations
        below describe each behavior.
      </noscript>
    </section>
  );
}
