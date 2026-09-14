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
    <main id="main" className="case-study">
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
      <header>
        <span className="eyebrow">MOBILE ENGINEERING CASE STUDY</span>
        <h1>Project MECI</h1>
        <p className="case-subtitle">Market Engagement & Client Interface</p>
        <p>Building clear mobile interfaces for fast-moving markets.</p>
        <a className="primary" href={localUrl("/?view=order")}>
          Try the interactive order book →
        </a>
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
          <dt>Core technologies</dt>
          <dd>React Native · TypeScript · Kotlin</dd>
        </div>
      </dl>
      <section>
        <h2>The work</h2>
        <p>
          My securities application work spans order books, running trades,
          watchlists, portfolios, order entry, financial charts, KYC, and tax
          reporting. These interfaces bring changing market information and
          transaction workflows into a mobile experience.
        </p>
        <p>
          MECI is the public alias for this case study. The interactive
          portfolio uses fictional market data and local simulated orders; its
          architecture illustrates engineering concepts rather than reproducing
          an employer’s internal system.
        </p>
      </section>
      <section>
        <h2>Realtime data, deliberate rendering</h2>
        <ol className="case-flow">
          <li>Receive market events</li>
          <li>Normalize and retain bounded state</li>
          <li>Update the relevant interface</li>
        </ol>
        <p>
          Incoming data and screen refreshes have different responsibilities.
          Keeping them separate allows components to subscribe to the
          information they need without making every market event a full-screen
          update.
        </p>
        <p>
          In this browser demo, a seeded simulator supplies the order book,
          trade tape, and packet visualization. Histories are bounded, and
          interface updates are coalesced. There is no live exchange or
          WebSocket connection.
        </p>
      </section>
      <section>
        <h2>Native integration</h2>
        <p>
          React Native provides the mobile interface, while Kotlin integrations
          extend the app where Android APIs or rendering requirements warrant
          native code. The engineering decision includes the cost of crossing
          that boundary, not just drawing performance.
        </p>
        <p>
          The portfolio demo runs in the browser. It does not execute the
          production mobile application or its native modules.
        </p>
      </section>
      <section>
        <h2>Predictable order entry</h2>
        <ol className="case-flow">
          <li>Capture a selected price</li>
          <li>Validate whole lots</li>
          <li>Confirm the result</li>
        </ol>
        <p>
          The demo keeps the selected limit price stable while the market
          changes. Its ticket accepts 1–10,000 whole lots, shows a total based
          on 100 shares per lot, and clearly identifies the result as a
          simulation. No actual transaction occurs.
        </p>
      </section>
      <section>
        <h2>Explore the implementation</h2>
        <p>
          Use the interactive order book to select a price, inspect market
          depth, and submit a local simulated order. The Engineering tab
          provides visual explanations of realtime updates, native integration,
          and order states.
        </p>
        <div className="case-links">
          <a className="primary" href={localUrl("/?view=order")}>
            Open the demo →
          </a>
          <a href={localUrl("/resume")}>Read my experience and skills →</a>
        </div>
      </section>
      <footer>
        <a href={localUrl("/")}>← Back to portfolio</a>
        <a href={profile.github}>GitHub</a>
      </footer>
    </main>
  );
}
