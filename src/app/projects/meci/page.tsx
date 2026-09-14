import "./meci.css";
import {
  Activity,
  ArrowUpRight,
  MousePointer2,
  ShieldCheck,
  Radio,
  Database,
  Layers3,
  Smartphone,
  Cable,
  Cpu,
  Check,
  Info,
} from "lucide-react";
import { localUrl } from "@/lib/paths";
import { profile } from "@/data/profile";
import { pageMetadata, absoluteUrl } from "@/lib/site";
export const metadata = pageMetadata(
  "Project MECI — React Native Trading Interfaces | Risang Ganie Salam",
  "Risang Ganie Salam’s mobile engineering case study: realtime market data, React Native interfaces, Kotlin integration, and explicit order-entry states.",
  "/projects/meci",
);
export default function MeciCaseStudy() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "Project MECI — Market Engagement & Client Interface",
    description:
      "A mobile securities engineering case study with an illustrative market simulator.",
    url: absoluteUrl("/projects/meci/"),
    author: {
      "@type": "Person",
      name: profile.name,
      url: absoluteUrl("/"),
      sameAs: [profile.github, profile.linkedin],
    },
    inLanguage: "en",
    about: [
      "React Native",
      "Realtime market interfaces",
      "Mobile application engineering",
    ],
  };
  return (
    <main id="main" className="case-study meci-visual">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <nav aria-label="Breadcrumb">
        <a href={localUrl("/")}>Portfolio</a>
        <span>/</span>
        <span>Project MECI</span>
      </nav>
      <header className="meci-hero">
        <div>
          <span className="eyebrow">MOBILE ENGINEERING / CASE STUDY</span>
          <h1>Project MECI</h1>
          <p className="case-subtitle">Market Engagement & Client Interface</p>
          <p>
            Fast markets.
            <br />
            Clear mobile decisions.
          </p>
          <a className="primary" href={localUrl("/?view=order")}>
            Try the interactive order book <ArrowUpRight size={17} />
          </a>
        </div>
        <figure
          className="meci-preview"
          aria-label="Illustrative BBCA market depth preview"
        >
          <div className="preview-top">
            <span>
              MECI <small>/ MARKET VIEW</small>
            </span>
            <span className="preview-dot">SIMULATED</span>
          </div>
          <div className="preview-quote">
            <div>
              <span>BBCA</span>
              <strong>7,125</strong>
            </div>
            <span className="negative">−75 (−1.04%)</span>
          </div>
          <svg
            className="preview-chart"
            viewBox="0 0 400 90"
            role="img"
            aria-label="Illustrative price sparkline"
          >
            <path
              d="M0 70H400M0 35H400"
              stroke="#302839"
              strokeDasharray="3 6"
            />
            <path
              d="M0 65 L22 58 L40 63 L62 38 L85 44 L110 30 L135 42 L160 20 L183 32 L205 26 L230 49 L252 40 L277 52 L305 39 L330 46 L355 30 L375 38 L400 32"
              fill="none"
              stroke="#b6a0d1"
              strokeWidth="2.5"
            />
          </svg>
          <div className="preview-book-head">
            <span>LOT</span>
            <span>BID</span>
            <span>ASK</span>
            <span>LOT</span>
          </div>
          {[0, 1, 2, 3, 4].map((i) => (
            <div className="preview-book-row" key={i}>
              <span
                className="preview-bid"
                style={{ backgroundSize: `${35 + i * 13}% 100%` }}
              >
                {(34200 + i * 12917).toLocaleString("en-US")}
              </span>
              <strong className="negative">
                {(7100 - i * 25).toLocaleString("en-US")}
              </strong>
              <strong
                className={
                  i < 3 ? "negative" : i === 3 ? "preview-neutral" : "positive"
                }
              >
                {(7125 + i * 25).toLocaleString("en-US")}
              </strong>
              <span
                className="preview-ask"
                style={{ backgroundSize: `${22 + i * 12}% 100%` }}
              >
                {(8763 + i * 7642).toLocaleString("en-US")}
              </span>
            </div>
          ))}
          <figcaption>
            Illustrative interface · Fictional market data
          </figcaption>
        </figure>
      </header>
      <dl className="case-facts">
        <div>
          <dt>Engineer</dt>
          <dd>{profile.name}</dd>
        </div>
        <div>
          <dt>Focus</dt>
          <dd>Mobile & frontend</dd>
        </div>
        <div>
          <dt>Built with</dt>
          <dd>React Native · TypeScript · Kotlin</dd>
        </div>
      </dl>
      <section className="meci-scope">
        <div className="meci-section-heading">
          <span className="eyebrow">01 / THE WORK</span>
          <h2>From market signal to user action.</h2>
        </div>
        <div className="meci-scope-grid">
          <article>
            <Activity size={24} />
            <h3>Observe</h3>
            <p>
              Order books · Running trades
              <br />
              Watchlists · Financial charts
            </p>
          </article>
          <article>
            <MousePointer2 size={24} />
            <h3>Act</h3>
            <p>
              Order entry
              <br />
              Portfolio views
            </p>
          </article>
          <article>
            <ShieldCheck size={24} />
            <h3>Manage</h3>
            <p>
              KYC
              <br />
              Tax reporting
            </p>
          </article>
        </div>
      </section>
      <section className="meci-engineering">
        <div className="meci-section-heading">
          <span className="eyebrow">02 / ENGINEERING DECISIONS</span>
          <h2>Three boundaries. One coherent experience.</h2>
        </div>
        <article className="meci-decision">
          <div>
            <span className="meci-decision-number">01</span>
            <h3>Realtime data, deliberate rendering</h3>
            <p>Receive continuously. Render deliberately.</p>
          </div>
          <div>
            <ol className="meci-diagram">
              <li>
                <Radio size={22} />
                <strong>Market events</strong>
                <small>Receive</small>
              </li>
              <li>
                <Database size={22} />
                <strong>Bounded state</strong>
                <small>Normalize</small>
              </li>
              <li>
                <Layers3 size={22} />
                <strong>UI updates</strong>
                <small>Batch</small>
              </li>
            </ol>
            <details>
              <summary>Why separate data from rendering?</summary>
              <p>
                Components subscribe to the data they need instead of refreshing
                the full screen on every event. In this browser demo, one seeded
                simulator drives the book, trade tape, and packet visualization,
                with bounded histories and coalesced updates.
              </p>
            </details>
          </div>
        </article>
        <article className="meci-decision">
          <div>
            <span className="meci-decision-number">02</span>
            <h3>Native where it matters</h3>
            <p>Choose the surface for the job.</p>
          </div>
          <div>
            <ol className="meci-diagram">
              <li>
                <Smartphone size={22} />
                <strong>React Native</strong>
                <small>Interface</small>
              </li>
              <li>
                <Cable size={22} />
                <strong>Bridge</strong>
                <small>Integration</small>
              </li>
              <li>
                <Cpu size={22} />
                <strong>Kotlin</strong>
                <small>Android APIs</small>
              </li>
            </ol>
            <details>
              <summary>When does native code help?</summary>
              <p>
                Kotlin integrations extend the mobile app where platform APIs or
                rendering requirements warrant native code. The cost of crossing
                the bridge matters too. This browser demo illustrates the
                boundary; it does not execute the production native modules.
              </p>
            </details>
          </div>
        </article>
        <article className="meci-decision">
          <div>
            <span className="meci-decision-number">03</span>
            <h3>Predictable order entry</h3>
            <p>A changing market. A stable decision.</p>
          </div>
          <div>
            <ol className="meci-diagram">
              <li>
                <MousePointer2 size={22} />
                <strong>Choose price</strong>
                <small>Capture</small>
              </li>
              <li>
                <ShieldCheck size={22} />
                <strong>Check lots</strong>
                <small>Validate</small>
              </li>
              <li>
                <Check size={22} />
                <strong>Confirm</strong>
                <small>Acknowledge</small>
              </li>
            </ol>
            <details>
              <summary>What keeps the ticket predictable?</summary>
              <p>
                The selected limit price stays fixed while market data changes.
                The demo accepts 1–10,000 whole lots, calculates 100 shares per
                lot, and explicitly confirms a local simulated order.
              </p>
            </details>
          </div>
        </article>
      </section>
      <aside className="meci-disclosure">
        <Info size={17} />
        <p>
          MECI is a public case-study alias. Prices and orders are simulated;
          the diagrams are illustrative. No live exchange connection or real
          transactions.
        </p>
      </aside>
      <section className="meci-next">
        <div>
          <span className="eyebrow">03 / TRY IT</span>
          <h2>Put the interface through its paces.</h2>
          <p>Pick a price. Set the lots. See the result.</p>
        </div>
        <div className="case-links">
          <a className="primary" href={localUrl("/?view=order")}>
            Open the demo <ArrowUpRight size={17} />
          </a>
          <a href={localUrl("/resume")}>Experience & skills →</a>
        </div>
      </section>
      <footer>
        <a href={localUrl("/")}>← Back to portfolio</a>
        <a href={profile.github}>GitHub</a>
      </footer>
    </main>
  );
}
