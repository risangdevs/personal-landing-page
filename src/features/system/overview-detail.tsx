"use client";
import { localUrl } from "@/lib/paths";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
export function OverviewDetail({ view }: { view: "work" | "about" }) {
  return view === "work" ? (
    <>
      <span className="eyebrow">FRONTEND ENGINEERING / DATA VISUALIZATION</span>
      <h2>Meridian</h2>
      <h3>Urban Mobility Flow Explorer</h3>
      <p>
        A coordinated React and D3 application for exploring time, direction,
        mode, and congestion across a simulated 20-district city.
      </p>
      <div className="about-links">
        <a className="primary" href={localUrl("/projects/meridian")}>
          Read the case study <ArrowRight size={16} />
        </a>
        <a
          href="https://risangdevs.github.io/meridian/"
          target="_blank"
          rel="noreferrer"
        >
          Open the live explorer ↗
        </a>
      </div>
    </>
  ) : (
    <>
      <span className="eyebrow">THE ENGINEER BEHIND THE SCREEN</span>
      <h2>{profile.name}</h2>
      <h3>{profile.role}</h3>
      <p>{profile.summary}</p>
      <p>
        Experience across securities trading, frontend development, technical
        sales, and freelance web development. Metallurgical Engineering
        graduate, Institut Teknologi Bandung.
      </p>
      <div className="about-links">
        <a className="primary" href={localUrl("/resume")}>
          View résumé <ArrowUpRight size={15} />
        </a>
        <a
          className="text-link"
          href={profile.github}
          target="_blank"
          rel="noreferrer"
        >
          GitHub <ArrowUpRight size={15} />
        </a>
      </div>
    </>
  );
}
