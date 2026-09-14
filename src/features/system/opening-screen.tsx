"use client";
import { localUrl } from "@/lib/paths";
import { ArrowRight } from "lucide-react";
import { profile } from "@/data/profile";
import { useNavigation } from "@/stores/navigation-store";
export function OpeningScreen() {
  const setPhase = useNavigation((s) => s.setPhase);
  return (
    <section className="opening-screen">
      <div className="opening-coordinate">
        RGS—001 <span>INTERACTIVE ENGINEERING PORTFOLIO</span>
      </div>
      <div className="opening-status">
        <span>
          <i className="live-dot" /> MARKET CONNECTION <b>ESTABLISHED</b>
        </span>
        <span>
          <i className="live-dot" /> DATA STREAM <b>ACTIVE</b>
        </span>
        <span>
          <i className="status-square" /> INTERFACE <b>READY</b>
        </span>
      </div>
      <div className="opening-title">
        <span className="eyebrow">EXPLORE THE SYSTEMS BEHIND THE SCREEN</span>
        <h1>
          FOLLOW
          <br />
          THE <span>DATA.</span>
          <i>↗</i>
        </h1>
        <div className="opening-baseline">
          <div>
            <h2>{profile.name}</h2>
            <p>Mobile & Frontend Engineer</p>
          </div>
          <span>
            React Native
            <br />
            Realtime Systems
            <br />
            Financial Technology
          </span>
        </div>
        <div className="opening-actions">
          <button className="primary" onClick={() => setPhase("terminal")}>
            Enter system <ArrowRight size={18} />
          </button>
          <a href={localUrl("/resume")}>Skip experience → Résumé</a>
        </div>
      </div>
      <div className="opening-rail">
        <div>
          <span>01</span> RECEIVE
        </div>
        <div>
          <span>02</span> PROCESS
        </div>
        <div>
          <span>03</span> RENDER
        </div>
        <div>
          <span>04</span> INTERACT
        </div>
      </div>
      <div className="opening-footnote">
        <span>ONE SIMULATION. EVERY SURFACE.</span>
        <span>Built to be explored. Engineered to respond.</span>
      </div>
    </section>
  );
}
