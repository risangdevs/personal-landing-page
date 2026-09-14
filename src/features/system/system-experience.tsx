"use client";
import { localUrl } from "@/lib/paths";
import { useEffect, useState, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  MoreHorizontal,
  X,
} from "lucide-react";
import { useNavigation } from "@/stores/navigation-store";
import { marketEngine } from "@/engine/market-engine";
import { systemModules, coreModule, tracePath } from "@/data/system";
import { profile } from "@/data/profile";
import { PacketInspector } from "./packet-inspector";
import { SystemFallback } from "./fallback";
import { OrderSurface } from "./trading-surface";
import { SystemOverlays } from "./system-overlays";
import { ExperienceSettings } from "./experience-settings";
import { ContactSection } from "./contact-section";
import { FeaturedWork } from "./featured-work";
import { OverviewDetail } from "./overview-detail";
const SystemScene = dynamic(() => import("@/three/scene"), {
  ssr: false,
  loading: () => (
    <div
      className="quiet-scene-loading"
      aria-label="Loading optional 3D illustration"
    >
      MARKET SYSTEMS
    </div>
  ),
});
export function SystemExperience() {
  const phase = useNavigation((s) => s.phase),
    mode = useNavigation((s) => s.mode),
    selected = useNavigation((s) => s.selected),
    tracing = useNavigation((s) => s.tracing),
    traceStep = useNavigation((s) => s.traceStep),
    packet = useNavigation((s) => s.packet);
  const reduced = useReducedMotion();
  const [detail, setDetail] = useState<"work" | "about" | null>(null);
  const [settings, setSettings] = useState(false);
  const [palette, setPalette] = useState(false),
    [terminal, setTerminal] = useState(false);
  const detailRef = useRef<HTMLDivElement>(null);
  const setPhase = useNavigation((s) => s.setPhase),
    setMode = useNavigation((s) => s.setMode),
    select = useNavigation((s) => s.select);
  useEffect(() => marketEngine.subscribe(() => {}), []);
  useEffect(() => {
    useNavigation.getState().setReducedMotion(Boolean(reduced));
    if (reduced) {
      setMode("2d");
      useNavigation.getState().setEffectiveQuality("Low");
    }
  }, [reduced, setMode]);
  useEffect(() => {
    if (detail) {
      detailRef.current?.scrollIntoView({
        behavior: reduced ? "instant" : "smooth",
        block: "nearest",
      });
      detailRef.current?.focus({ preventScroll: true });
    }
  }, [detail, reduced]);
  const stopTrace = useCallback(() => {
    const nav = useNavigation.getState();
    nav.setTrace(-1, false);
    nav.inspectPacket(null);
    marketEngine.setPaused(false);
  }, []);
  const home = useCallback(() => {
    stopTrace();
    setPhase("opening");
    select("core");
    setDetail(null);
  }, [stopTrace, setPhase, select]);
  const how = useCallback(() => {
    stopTrace();
    setPhase("system");
    select("core");
    setDetail(null);
  }, [stopTrace, setPhase, select]);
  const openOrder = useCallback(() => {
    stopTrace();
    select("order");
    setPhase("order");
  }, [stopTrace, select, setPhase]);
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("view") === "order")
      openOrder();
  }, [openOrder]);
  const about = useCallback(() => {
    home();
    setDetail("about");
  }, [home]);
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("view") === "about")
      about();
  }, [about]);
  const tracePacket = useCallback(() => {
    const nav = useNavigation.getState();
    const p = nav.packet || marketEngine.getSnapshot().packets.at(-1);
    if (!p) return;
    nav.inspectPacket(p);
    marketEngine.setPaused(false);
    nav.setTrace(0, true);
    select("feed");
    setPhase("system");
  }, [select, setPhase]);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setPalette((v) => !v);
        return;
      }
      if (
        e.target instanceof HTMLElement &&
        (/INPUT|TEXTAREA|SELECT/.test(e.target.tagName) ||
          e.target.isContentEditable)
      )
        return;
      if (e.key === "`") setTerminal(true);
      if (e.key === "Escape") {
        if (useNavigation.getState().tracing) stopTrace();
        setSettings(false);
      }
      if (e.key === "1") home();
      if (e.key === "2") openOrder();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [home, openOrder, stopTrace]);
  const active = systemModules.find((m) => m.id === selected) || coreModule;
  const overview = phase === "opening";
  return (
    <div
      className={`experience simplified phase-${phase} ${mode === "2d" ? "is-2d" : ""}`}
    >
      <header className="experience-header">
        <button className="experience-brand" onClick={home}>
          <span className="system-logo">R /</span>
          <span>
            RISANG <i>/</i> <b>MARKET SYSTEMS</b>
          </span>
        </button>
        <div className="quiet-header-actions">
          <nav className="portfolio-navigation" aria-label="Main navigation">
            <a href={overview ? "#work" : `${localUrl("/")}#work`}>Work</a>
            <button onClick={about}>About</button>
            <a href={localUrl("/resume")}>
              Résumé <ArrowUpRight size={13} />
            </a>
            <a href="#contact">Contact</a>
          </nav>
          <button
            aria-label="Settings"
            aria-expanded={settings}
            aria-controls="experience-settings"
            onClick={() => setSettings((v) => !v)}
          >
            <MoreHorizontal size={23} />
          </button>
        </div>
        {settings && (
          <ExperienceSettings
            onClose={() => setSettings(false)}
            onContact={() => {
              setSettings(false);
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: reduced ? "instant" : "smooth" });
            }}
            onCommands={() => {
              setSettings(false);
              setPalette(true);
            }}
          />
        )}
      </header>
      <main id="main" className="experience-main" tabIndex={-1}>
        {overview ? (
          <>
            <section className="quiet-overview">
              <div className="quiet-intro">
                <span className="eyebrow">{profile.name.toUpperCase()}</span>
                <h1>
                  I build realtime
                  <br />
                  mobile experiences.
                </h1>
                <p>
                  Mobile & Frontend Engineer.
                  <br />
                  React Native, fintech, and the systems behind the screen.
                </p>
                <a className="primary" href="#work">
                  Explore my work <ArrowRight size={18} />
                </a>
                <span className="quiet-intro-note">
                  Start with MECI, a securities trading project.
                </span>
              </div>
              <div
                className="overview-scene"
                aria-label="Choose a part of the portfolio"
              >
                <div className="scene-preview" aria-hidden="true" inert>
                  {mode === "3d" ? (
                    <SystemScene />
                  ) : (
                    <div className="quiet-2d-machine">
                      <span>RISANG</span>
                      <strong>MARKET ENGINE</strong>
                      <span>REALTIME SYSTEMS</span>
                    </div>
                  )}
                </div>
                <button
                  className={`overview-node node-work ${detail === "work" ? "selected" : ""}`}
                  onClick={() =>
                    document.getElementById("work")?.scrollIntoView({
                      behavior: reduced ? "instant" : "smooth",
                    })
                  }
                >
                  <strong>
                    MECI <ArrowUpRight size={14} />
                  </strong>
                  <span>Explore the work</span>
                </button>
                <button className="overview-node node-how" onClick={how}>
                  <strong>
                    How it works <ArrowUpRight size={14} />
                  </strong>
                  <span>Explore the engineering</span>
                </button>
                <button
                  className={`overview-node node-about ${detail === "about" ? "selected" : ""}`}
                  onClick={() => setDetail("about")}
                >
                  <strong>
                    About me <ArrowUpRight size={14} />
                  </strong>
                  <span>Meet the engineer</span>
                </button>
              </div>
            </section>
            <FeaturedWork onOrder={openOrder} />
            {detail && (
              <div
                ref={detailRef}
                tabIndex={-1}
                className="overview-detail"
                role="region"
                aria-label={detail === "work" ? "Project MECI" : "About Risang"}
              >
                <button
                  className="detail-close"
                  aria-label="Close detail"
                  onClick={() => setDetail(null)}
                >
                  <X size={19} />
                </button>
                <OverviewDetail view={detail} onOrder={openOrder} />
              </div>
            )}
          </>
        ) : (
          <section
            className="system-stage quiet-system"
            aria-label="Interactive market system"
          >
            <div className="quiet-system-heading">
              <button className="back-link" onClick={home}>
                <ArrowLeft size={15} /> Back to overview
              </button>
              <h1>Behind the screen.</h1>
              <p>Choose a module to inspect its role.</p>
            </div>
            <div className="machine-viewport" inert={phase === "order"}>
              {mode === "3d" ? <SystemScene /> : <SystemFallback />}
            </div>
            {phase === "system" && (
              <>
                {tracing ? (
                  <section
                    className="trace-caption"
                    aria-label="Packet trace"
                    aria-live="polite"
                  >
                    <div>
                      <span className="eyebrow">
                        STEP {traceStep + 1} OF {tracePath.length}
                      </span>
                      <button onClick={stopTrace} aria-label="Exit trace">
                        <X size={17} />
                      </button>
                    </div>
                    <h3>{active.name}</h3>
                    <p>{active.caption}</p>
                    <small className="trace-record">
                      {packet?.symbol} · {packet?.price.toLocaleString()} · #
                      {packet?.sequence}
                    </small>
                    <button
                      className="primary"
                      onClick={() => {
                        if (traceStep === tracePath.length - 1) {
                          openOrder();
                        } else {
                          const next = traceStep + 1;
                          useNavigation.getState().setTrace(next, true);
                          select(tracePath[next]);
                        }
                      }}
                    >
                      {traceStep === tracePath.length - 1
                        ? "Try the order book"
                        : "Continue"}
                      <ArrowRight size={15} />
                    </button>
                    <span className="trace-manual">
                      Moves only when you continue.
                    </span>
                  </section>
                ) : packet ? (
                  <PacketInspector onTrace={tracePacket} />
                ) : selected !== "core" ? (
                  <aside
                    className="system-inspector quiet-inspector"
                    aria-label="Technical inspector"
                  >
                    <button
                      className="detail-close"
                      onClick={() => select("core")}
                      aria-label="Close technical inspector"
                    >
                      <X size={18} />
                    </button>
                    <span className="eyebrow">HOW IT WORKS</span>
                    <h2>{active.name}</h2>
                    <p>{active.caption}</p>
                    <div className="inspector-boundary">
                      <p>{active.detail}</p>
                      <p>{active.implementation}</p>
                    </div>
                    {selected === "order" && (
                      <button className="primary" onClick={openOrder}>
                        Try the order book <ArrowRight size={15} />
                      </button>
                    )}
                  </aside>
                ) : null}
                {!tracing && !packet && (
                  <div className="quiet-trace-invite">
                    <button className="secondary" onClick={tracePacket}>
                      Follow a packet <ArrowRight size={15} />
                    </button>
                    <span>Optional. Explore at your pace.</span>
                  </div>
                )}
              </>
            )}
            <AnimatePresence>
              {phase === "order" && (
                <motion.div
                  key="order"
                  className="order-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduced ? 0 : 0.3 }}
                >
                  <OrderSurface
                    onReturn={() => {
                      setPhase("opening");
                      select("core");
                      setDetail(null);
                      requestAnimationFrame(() =>
                        document.getElementById("work")?.scrollIntoView(),
                      );
                    }}
                    onArchitecture={() => {
                      how();
                      select("order");
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        )}
      </main>
      <ContactSection />
      <footer className="quiet-footer">
        <span>Risang Ganie Salam · Engineering portfolio</span>
        {mode === "3d" && (
          <button onClick={() => setMode("2d")}>Exit 3D mode</button>
        )}
      </footer>
      <SystemOverlays
        palette={palette}
        setPalette={setPalette}
        terminal={terminal}
        setTerminal={setTerminal}
        onContact={() =>
          requestAnimationFrame(() =>
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: reduced ? "instant" : "smooth" }),
          )
        }
        onSystem={how}
        onOrder={openOrder}
        onProfile={about}
        onTrace={tracePacket}
      />
    </div>
  );
}
