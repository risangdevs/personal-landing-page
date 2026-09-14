"use client";
import { localUrl } from "@/lib/paths";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
export function OverviewDetail({
  view,
  onOrder,
}: {
  view: "work" | "about";
  onOrder: () => void;
}) {
  return view === "work" ? (
    <>
      <span className="eyebrow">SECURITIES TRADING / PROJECT ALIAS</span>
      <h2>Project MECI</h2>
      <h3>Market Engagement & Client Interface</h3>
      <p>
        Mobile engineering for a securities trading platform. Explore an
        interactive order book to see the work in action.
      </p>
      <div className="about-links">
        <button className="primary" onClick={onOrder}>
          Try the order book <ArrowRight size={16} />
        </button>
        <a href={localUrl("/projects/meci")}>Read the case study ↗</a>
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
