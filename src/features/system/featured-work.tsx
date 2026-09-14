import { ArrowUpRight } from "lucide-react";
import { localUrl } from "@/lib/paths";
export function FeaturedWork({ onOrder }: { onOrder: () => void }) {
  return (
    <section
      id="work"
      className="featured-work"
      aria-labelledby="featured-work-title"
    >
      <span className="eyebrow">SELECTED WORK</span>
      <article className="featured-meci">
        <div className="featured-market" aria-hidden="true">
          <span>MECI / MARKET DEPTH</span>
          <div className="featured-prices">
            <strong>7,100</strong>
            <strong>7,125</strong>
          </div>
          {[36, 57, 48, 78, 93].map((width, i) => (
            <div className="featured-depth" key={i}>
              <i style={{ width: `${width}%` }} />
              <i style={{ width: `${100 - width / 2}%` }} />
            </div>
          ))}
          <small>ILLUSTRATIVE PREVIEW</small>
        </div>
        <div className="featured-description">
          <span className="eyebrow">MOBILE / FRONTEND ENGINEERING</span>
          <h2 id="featured-work-title">Project MECI</h2>
          <p>
            Realtime market interfaces, native integration, and predictable
            order entry.
          </p>
          <span className="featured-stack">
            React Native · TypeScript · Kotlin
          </span>
          <div className="featured-actions">
            <a className="primary" href={localUrl("/projects/meci")}>
              Read the case study <ArrowUpRight size={16} />
            </a>
            <button onClick={onOrder}>Try the order book →</button>
          </div>
        </div>
      </article>
    </section>
  );
}
