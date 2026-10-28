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
      <article className="featured-project featured-meridian">
        <a
          className="featured-visual featured-meridian-visual"
          href={localUrl("/projects/meridian")}
          aria-label="Read the Meridian case study"
        >
          <picture>
            <source
              type="image/webp"
              srcSet={`${localUrl(
                "/projects/meridian/meridian-dashboard-640.webp",
              )} 640w, ${localUrl(
                "/projects/meridian/meridian-dashboard-960.webp",
              )} 960w, ${localUrl(
                "/projects/meridian/meridian-dashboard-1600.webp",
              )} 1600w`}
              sizes="(max-width: 660px) calc(100vw - 88px), (max-width: 1250px) 45vw, 520px"
            />
            <img
              src={localUrl("/projects/meridian/meridian-dashboard.png")}
              alt="Meridian dashboard showing mobility filters, five KPIs, a district flow map, and an origin-to-mode-to-destination Sankey diagram"
              width="1600"
              height="1000"
              loading="lazy"
              decoding="async"
            />
          </picture>
          <span>LIVE APPLICATION · SIMULATED DATA</span>
        </a>
        <div className="featured-description">
          <span className="eyebrow">
            FRONTEND ENGINEERING / DATA VISUALIZATION
          </span>
          <h2 id="featured-work-title">Meridian</h2>
          <p>
            Five coordinated views reveal how movement changes across a
            fictional city—and where transportation pressure concentrates.
          </p>
          <span className="featured-stack">
            React · TypeScript · D3.js · d3-sankey · Vite
          </span>
          <div className="featured-actions">
            <a className="primary" href={localUrl("/projects/meridian")}>
              Read the case study <ArrowUpRight size={16} />
            </a>
            <a
              href="https://risangdevs.github.io/meridian/"
              target="_blank"
              rel="noreferrer"
            >
              Open live demo <ArrowUpRight size={15} />
            </a>
            <a
              href="https://github.com/risangdevs/meridian"
              target="_blank"
              rel="noreferrer"
            >
              Source code <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </article>
      <article className="featured-project featured-meci">
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
          <h2>Project MECI</h2>
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
