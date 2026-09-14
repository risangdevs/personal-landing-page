# Risang / Market Systems — Follow the Data

An overview-first engineering portfolio with Project MECI, an optional interactive market architecture, and a simulated order book. Visitors choose their own route.

## Run

Node.js 20.9+ and npm are required. Node 22 LTS is recommended.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. `/resume` is a conventional server-rendered, printable résumé and requires no 3D.

```sh
npm run typecheck
npm test
npm run build
```

Production is a static GitHub Pages export for `https://risangdevs.github.io/personal-landing-page/`. `npm run build` writes the deployable site to `out/`, including the `/personal-landing-page` asset/link prefix and `.nojekyll`. Upload the contents of `out/` to the Pages deployment; no Node server is needed in production. Local `npm run dev` keeps the root URL at port 3000. `npm start` is not used with static export.

The production URL defaults to the supplied GitHub Pages address. `SITE_URL` can override canonical and sitemap URLs at build time; if the hosting path changes, update `basePath` and `NEXT_PUBLIC_BASE_PATH` in `next.config.ts` as well.

## Search visibility

- `/projects/meci/` contains a complete pre-rendered case study, with normal links from the homepage and résumé.
- Each page has its own title, description, canonical URL, and social metadata.
- Person and CreativeWork JSON-LD describe the engineer and case study without invented metrics or endorsements.
- `/sitemap.xml` lists the three canonical pages. Submit its full deployed URL in Google Search Console after publication.
- GitHub project Pages serves `robots.txt` beneath the project path. Only the host-root robots file controls crawling; this project cannot override `https://risangdevs.github.io/robots.txt`.
- Query-string demo entry links canonicalize to the homepage. No interactive state creates duplicate indexable pages.

The checkout is not published by these changes. Indexing and field performance need verification on the public deployment.

## This milestone

- A clear introduction and one primary “Explore my work” invitation.
- Three entry points: MECI, How it works, and About me.
- Project and biography details appear on selection.
- Optional 3D architecture with contextual module inspection.
- Manual packet tracing through seven modules, using one captured market record.
- Direct access to the simulated order book and validated buy ticket.
- Settings menu for contact, commands, quality, 2D mode, and technical readouts.
- Reduced-motion 2D default, WebGL failure fallback, and printable résumé.

Per the updated brief, Migration Chamber, Incident Room, Career Mode, Research System, Bangjeff and Odoo interactive modules, and achievements are intentionally deferred. Their earlier experimental screens have been removed. Professional project references may still appear in the résumé.

## Controls

- **Explore my work** or **MECI** opens the case study; **Try the order book** opens trading immediately.
- **How it works** opens the architecture. Select a module to reveal its inspector.
- **Follow a packet** is optional. **Continue** advances one step; Escape exits. There is no automatic progression.
- Click an instanced packet to inspect its captured record.
- **Exit 3D mode** switches to semantic architecture controls. Re-enable 3D in the settings menu.
- **Cmd/Ctrl+K** opens command navigation. **Backtick** opens the terminal. **1** opens the overview; **2** opens MECI. Shortcuts ignore editable fields.

## Architecture

See [docs/architecture.md](docs/architecture.md). React Three Fiber, Three.js, and Drei implement the 3D view. Framer Motion handles the 2D interface transition. Zustand separates navigation and presentation state from the simulation. Lightweight Charts draws the financial series.

The market engine is a single external service. It produces a seeded order book, trade tape, IDX value, and typed market packets. It starts with the first subscriber, stops with the last, and skips work when the document is hidden. Speed controls target 20, 100, 200, or 500 events/s at 1×, 5×, 10×, or 25× by batching into a 50ms timer. Browser timing is best effort.

React market leaves receive coalesced snapshots through requestAnimationFrame at a controlled cadence. The parent experience never subscribes to market ticks. The scene reads data in `useFrame`, updates instanced matrices, and retains at most 128/64/24 sampled message references. It does not dispatch React state each frame. The tracing marker carries a single frozen message record while the live market continues.

## Quality and accessibility

Auto quality considers viewport width, device pixel ratio, GPU maximum texture size, and sampled rAF frequency. It reduces resolution after sustained slow frame windows. Packet limits are 128, 64, or 24. Pixel ratio is capped at 1.75/1/0.7. There are no shadows, bloom, texture downloads, or postprocessing. Frame-loop execution pauses in hidden tabs. The settings menu's measured rAF/s is callback frequency, not a production FPS benchmark.

Every module has an HTML control and text description. Forms, dialogs, and navigation work without WebGL. Radix dialogs trap focus and support Escape; controls have visible focus. Signed values and labels complement color. Reduced motion disables interface transitions and selects a 2D default. Charts have textual descriptions; the résumé provides complete normal HTML.

## Content and privacy

`src/data/profile.ts`, `career.ts`, `projects.ts`, and `system.ts` separate content from visuals. Career dates and education use the supplied CV and diploma. Contact uses risanggani@gmail.com and github.com/risangdevs. The diploma, CV source files, personal identifiers, phone number, confidential source code, company metrics, and target-employer wording are not copied to public assets. No teaching appointment or publication is invented.

Project MECI (Market Engagement & Client Interface) is a public-facing case-study alias. Employment history retains the real employer name.

The WebSocket module represents a conceptual production boundary. This demo opens no WebSocket or exchange connection. Market prices, volume, and orders are simulated. The architecture is illustrative, not a disclosure of an employer’s internal implementation. No fake financial career returns are used.

Contact prepares a `mailto:` draft and supports copying it. The visitor sends it in their own email app. No form data is sent or stored automatically.

## Validation

After `npm run build`, run `python3 scripts/seo-check.py` to validate exported canonical URLs, social metadata, links, structured content, sitemap, and GitHub Pages assets.

`npm test` checks sustained deterministic simulation, order-book invariants, bounded histories, shared packet/trade identity, pause, supported speeds, and cleanup. `scripts/system-check.cjs` is the optional Playwright browser acceptance test. Set `PLAYWRIGHT_PATH` to your Playwright package path. It uses installed Chrome and checks overview navigation, manual packet tracing, the BBCA overlay regression, simulated buy, reduced-motion fallback, mobile overflow, and résumé. No messages are sent.

Native GPU performance depends on hardware. Software-rendered browser testing is useful for correctness, but is not evidence of a 60 FPS hardware benchmark.
