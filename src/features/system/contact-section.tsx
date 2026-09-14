"use client";
import { useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { profile } from "@/data/profile";
export function ContactSection() {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">(
    "idle",
  );
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  }
  return (
    <section
      id="contact"
      className="contact-section"
      aria-labelledby="contact-title"
    >
      <div>
        <span className="eyebrow">GET IN TOUCH</span>
        <h2 id="contact-title">Let’s talk.</h2>
        <p>Have a role, project, or engineering problem in mind?</p>
      </div>
      <div className="contact-options">
        <a className="contact-address" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <div className="contact-actions">
          <a className="primary" href={`mailto:${profile.email}`}>
            Email me <ArrowUpRight size={16} />
          </a>
          <button className="secondary" onClick={copyEmail}>
            {copyState === "copied" ? <Check size={15} /> : <Copy size={15} />}{" "}
            {copyState === "copied" ? "Email copied" : "Copy email"}
          </button>
        </div>
        <p className="contact-feedback" role="status">
          {copyState === "failed"
            ? "Couldn’t copy automatically. Select and copy the email address above."
            : copyState === "copied"
              ? "Email address copied to clipboard."
              : "Email me opens your email app."}
        </p>
        <div className="contact-socials">
          <a href={profile.linkedin}>
            LinkedIn <ArrowUpRight size={13} />
          </a>
          <a href={profile.github}>
            GitHub <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </section>
  );
}
