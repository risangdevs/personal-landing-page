import {
  Accessibility,
  Activity,
  ArrowUpRight,
  Braces,
  Check,
  Download,
  Gauge,
  Grid3X3,
  Info,
  Layers3,
  ListOrdered,
  Map,
  MousePointer2,
  Network,
  SlidersHorizontal,
  Timer,
  ZoomIn,
} from "lucide-react";
import { localUrl } from "@/lib/paths";
import { absoluteUrl, pageMetadata } from "@/lib/site";
import { profile } from "@/data/profile";
import "./meridian.css";

const title =
  "Meridian — Urban Mobility Data Visualization Case Study | Risang Ganie Salam";
const description =
  "A React, TypeScript, and D3 engineering case study: five coordinated views for exploring simulated urban mobility flows, time patterns, and bottlenecks.";
const baseMetadata = pageMetadata(title, description, "/projects/meridian");
const screenshot = absoluteUrl("/projects/meridian/meridian-dashboard.png");

export const metadata = {
  ...baseMetadata,
  openGraph: {
    ...baseMetadata.openGraph,
    images: [
      {
        url: screenshot,
        width: 1600,
        height: 1000,
        alt: "Meridian urban mobility dashboard with filters, KPIs, flow map, and Sankey diagram",
      },
    ],
  },
  twitter: {
    ...baseMetadata.twitter,
    images: [screenshot],
  },
};

const liveUrl = "https://risangdevs.github.io/meridian/";
const sourceUrl = "https://github.com/risangdevs/meridian";
const reportUrl =
  "https://github.com/risangdevs/meridian/blob/main/docs/CASE_STUDY.md";

const views = [
  {
    icon: Map,
    title: "Geographic flow map",
    body: "Voronoi districts and directed Bézier routes locate major corridors. Stroke width encodes trip volume; color can show leading mode or weighted congestion.",
  },
  {
    icon: Network,
    title: "Sankey diagram",
    body: "Origin → mode → destination bands expose composition and district roles, with connected-flow emphasis and node-based filtering.",
  },
  {
    icon: Activity,
    title: "Brushable timeline",
    body: "A full-day area curve preserves context while a snapping brush—and equivalent selects—sets the active hourly interval.",
  },
  {
    icon: Grid3X3,
    title: "Congestion heatmap",
    body: "A district-by-hour grid reveals rush-hour bands and persistent pressure on a fixed 0–1 synthetic congestion scale.",
  },
  {
    icon: ListOrdered,
    title: "Animated district ranking",
    body: "Keyed rows reorder by departures, arrivals, congestion, or travel time without losing each district’s visual identity.",
  },
];

const engineering = [
  {
    icon: Braces,
    title: "Keyed joins",
    body: "Stable route, node, cell, and district keys keep transitions attached to the underlying data instead of array positions.",
  },
  {
    icon: Layers3,
    title: "Responsive SVG",
    body: "The schematic map retains a fixed viewBox; label-heavy plots measure their containers and recompute scales with ResizeObserver.",
  },
  {
    icon: ZoomIn,
    title: "Zoom and tooltips",
    body: "A bounded camera transform stays separate from data layers. Viewport-clamped tooltips use client coordinates, so zoom and scroll do not displace them.",
  },
  {
    icon: MousePointer2,
    title: "Brushing without churn",
    body: "The timeline commits a snapped range when the gesture ends, avoiding a full dashboard recomputation for every pointer movement.",
  },
  {
    icon: Accessibility,
    title: "Motion and input",
    body: "Keyboard-operable filters, districts, Sankey nodes, and ranking rows complement visible focus states. Reduced motion removes transition durations and route motion.",
  },
  {
    icon: Timer,
    title: "Bounded rendering",
    body: "The map limits visible routes while disclosing coverage; Sankey nodes, heatmap cells, and other SVG marks remain predictably bounded.",
  },
];

export default function MeridianCaseStudy() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Meridian — Urban Mobility Flow Explorer",
    description,
    url: liveUrl,
    codeRepository: sourceUrl,
    applicationCategory: "Data visualization",
    operatingSystem: "Web",
    author: {
      "@type": "Person",
      name: profile.name,
      url: absoluteUrl("/"),
      sameAs: [profile.github, profile.linkedin],
    },
    isBasedOn: "Simulated urban mobility data",
    programmingLanguage: ["TypeScript", "JavaScript"],
  };

  return (
    <main id="main" className="case-study meridian-case">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <nav aria-label="Breadcrumb">
        <a href={localUrl("/")}>Portfolio</a>
        <span>/</span>
        <span>Meridian</span>
      </nav>
      <nav className="case-navigation" aria-label="Main navigation">
        <a href={`${localUrl("/")}#work`}>Work</a>
        <a href={localUrl("/?view=about")}>About</a>
        <a href={localUrl("/resume")}>Résumé</a>
        <a href={`${localUrl("/")}#contact`}>Contact</a>
      </nav>

      <header className="meridian-hero">
        <span className="eyebrow">DATA VISUALIZATION / CASE STUDY</span>
        <h1>Meridian</h1>
        <p className="case-subtitle">Urban Mobility Flow Explorer</p>
        <p className="meridian-lede">
          A coordinated analytical application for understanding how movement
          changes across a city—and where transportation pressure concentrates.
        </p>
        <div className="case-links">
          <a
            className="primary"
            href={liveUrl}
            target="_blank"
            rel="noreferrer"
          >
            Open live application <ArrowUpRight size={17} />
          </a>
          <a href={sourceUrl} target="_blank" rel="noreferrer">
            Source code <ArrowUpRight size={15} />
          </a>
        </div>
      </header>

      <figure className="meridian-screenshot">
        <img
          src={localUrl("/projects/meridian/meridian-dashboard.png")}
          alt="Meridian dashboard showing weekday and time filters, transport modes, five mobility KPIs, a directed district flow map, and an origin-to-mode-to-destination Sankey diagram"
          width="1600"
          height="1000"
        />
        <figcaption>
          The live Meridian explorer at its default weekday 07:00–10:00 view.
          All districts, routes, and mobility records are simulated.
        </figcaption>
      </figure>

      <dl className="case-facts meridian-facts">
        <div>
          <dt>Focus</dt>
          <dd>Frontend engineering · Data visualization</dd>
        </div>
        <div>
          <dt>Built with</dt>
          <dd>React · TypeScript · D3.js · d3-sankey · Vite</dd>
        </div>
        <div>
          <dt>Data</dt>
          <dd>20 fictional districts · 60,725 simulated aggregate records</dd>
        </div>
        <div>
          <dt>Deployment</dt>
          <dd>GitHub Pages · GitHub Actions</dd>
        </div>
      </dl>

      <section className="meridian-problem">
        <div className="meridian-section-heading">
          <span className="eyebrow">01 / THE ANALYTICAL PROBLEM</span>
          <h2>Movement needs more than one chart.</h2>
        </div>
        <div className="meridian-two-column">
          <div>
            <p className="meridian-question">
              “How does movement across a city change throughout the day, and
              where are the major transportation bottlenecks?”
            </p>
          </div>
          <div>
            <p>
              A transport analyst needs to connect geography, direction, mode,
              time, and travel conditions. A district can send commuters in the
              morning, receive them at night, and carry high volume without
              having the worst congestion.
            </p>
            <p>
              Meridian supports that exploratory workflow: find a district,
              inspect its connections, isolate incoming or outgoing travel,
              compare time windows, and retain a clear record of the active
              filters.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="meridian-section-heading">
          <span className="eyebrow">02 / COORDINATED VIEWS</span>
          <h2>Five perspectives. One analytical state.</h2>
          <p>
            Each view answers a different question while responding to the same
            selection model.
          </p>
        </div>
        <div className="meridian-view-grid">
          {views.map(({ icon: Icon, title: viewTitle, body }) => (
            <article key={viewTitle}>
              <Icon size={22} aria-hidden="true" />
              <h3>{viewTitle}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="meridian-controls">
        <div className="meridian-section-heading">
          <span className="eyebrow">03 / THE FINISHED PRODUCT</span>
          <h2>Filter once. Read the result everywhere.</h2>
        </div>
        <div className="meridian-capability-grid">
          <article>
            <SlidersHorizontal size={23} aria-hidden="true" />
            <h3>Shared filters</h3>
            <p>
              Time, mode, day type, origin, destination, selected district, and
              incoming/outgoing direction intersect through one documented
              predicate.
            </p>
          </article>
          <article>
            <Gauge size={23} aria-hidden="true" />
            <h3>Dynamic KPIs</h3>
            <p>
              Total trips, mean travel time, congestion, busiest route, and
              leading mode update from the current selection. Travel time and
              congestion use trip-weighted averages.
            </p>
          </article>
          <article>
            <Download size={23} aria-hidden="true" />
            <h3>Inspectable output</h3>
            <p>
              CSV export downloads the matching aggregate records—including
              distance and source fields—so the visible result can be checked
              outside the interface.
            </p>
          </article>
        </div>
      </section>

      <section>
        <div className="meridian-section-heading">
          <span className="eyebrow">04 / ARCHITECTURE</span>
          <h2>Separate application state from visualization mechanics.</h2>
        </div>
        <div className="meridian-ownership">
          <article>
            <span>REACT</span>
            <h3>State and interface</h3>
            <p>
              React owns global filters, controls, layout, the data-generation
              lifecycle, memoized selectors, and the SVG container elements.
            </p>
          </article>
          <div aria-hidden="true">→</div>
          <article>
            <span>D3</span>
            <h3>Geometry and behavior</h3>
            <p>
              D3 owns chart descendants: scales, aggregation, layouts, keyed
              joins, transitions, zoom, brushing, and pointer interactions.
            </p>
          </article>
        </div>
        <div className="meridian-engineering-grid">
          {engineering.map(({ icon: Icon, title: itemTitle, body }) => (
            <article key={itemTitle}>
              <Icon size={20} aria-hidden="true" />
              <div>
                <h3>{itemTitle}</h3>
                <p>{body}</p>
              </div>
            </article>
          ))}
        </div>
        <aside className="meridian-benchmark">
          <Info size={17} aria-hidden="true" />
          <p>
            A documented local Node 22.22.3 benchmark measured full-data
            filtering plus route, district, hourly, and heatmap aggregation at
            2.88 ms median and 5.57 ms p95 across 30 runs. It measures
            computation on one development machine—not browser layout, paint, D3
            transitions, or a universal performance guarantee.
          </p>
        </aside>
      </section>

      <section>
        <div className="meridian-section-heading">
          <span className="eyebrow">05 / SELECTED FINDINGS</span>
          <h2>The data demonstrates the questions the product can answer.</h2>
          <p>
            These results come from the deterministic simulation. They are not
            observations, forecasts, or evidence about a real city.
          </p>
        </div>
        <ol className="meridian-findings">
          <li>
            <span>01</span>
            <div>
              <h3>Two weekday peaks, with different totals</h3>
              <p>
                08:00–09:00 is the busiest hour at 43,029 trips. The full
                16:00–19:00 window is larger than 07:00–10:00: 119,693 versus
                114,984 trips.
              </p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <h3>Central reverses direction</h3>
              <p>
                Central shows a net morning inflow of 10,717 trips and a net
                evening outflow of 9,268—behavior that a full-day total would
                conceal.
              </p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <h3>Weekend movement shifts later</h3>
              <p>
                The representative weekend day has 51.4% fewer trips than the
                weekday, peaks at 15:00–16:00, and sends more arrivals toward
                leisure-oriented districts.
              </p>
            </div>
          </li>
          <li>
            <span>04</span>
            <div>
              <h3>The bottleneck mechanism is visible</h3>
              <p>
                Morning cross-river car journeys have a 0.780 weighted
                congestion index versus 0.665 for same-side journeys. The
                generator explicitly includes a crossing penalty, so this
                verifies the intended mechanism rather than discovering a causal
                effect.
              </p>
            </div>
          </li>
        </ol>
      </section>

      <section className="meridian-lessons">
        <div className="meridian-section-heading">
          <span className="eyebrow">06 / LESSONS & NEXT STEPS</span>
          <h2>Semantic consistency matters more than visual polish.</h2>
        </div>
        <div className="meridian-two-column">
          <div>
            <p>
              The difficult work was defining what a trip means, how filters
              intersect, when averages must be weighted, and which views retain
              full-day context. Shared selectors and conservation tests keep
              plausible-looking charts from silently disagreeing.
            </p>
            <p>
              D3 provided the necessary control over geometry and interaction;
              React provided a maintainable boundary for the surrounding
              application.
            </p>
          </div>
          <ul>
            {[
              "Side-by-side day and time comparisons",
              "Accessible table alternatives and a fuller assistive-technology audit",
              "Shareable URL filter state and saved views",
              "Worker-based aggregation for substantially larger datasets",
              "Real boundaries, transit networks, and calibrated mobility data",
            ].map((item) => (
              <li key={item}>
                <Check size={15} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <aside className="meridian-disclosure">
        <Info size={18} aria-hidden="true" />
        <p>
          Meridian is an analytical workflow demonstration built on simulated
          aggregate records for a fictional city. It has no real map tiles, live
          feed, person-level journeys, observed road capacity, transit
          timetable, or validated congestion model.
        </p>
      </aside>

      <section className="meridian-next">
        <div>
          <span className="eyebrow">EXPLORE THE PROJECT</span>
          <h2>Follow the movement from question to evidence.</h2>
        </div>
        <div className="case-links">
          <a
            className="primary"
            href={liveUrl}
            target="_blank"
            rel="noreferrer"
          >
            Launch Meridian <ArrowUpRight size={17} />
          </a>
          <a href={sourceUrl} target="_blank" rel="noreferrer">
            View source <ArrowUpRight size={15} />
          </a>
          <a href={reportUrl} target="_blank" rel="noreferrer">
            Full engineering report <ArrowUpRight size={15} />
          </a>
        </div>
      </section>

      <footer>
        <a href={localUrl("/")}>← Back to portfolio</a>
        <a href={localUrl("/projects/meci")}>Next case study: MECI →</a>
      </footer>
    </main>
  );
}
