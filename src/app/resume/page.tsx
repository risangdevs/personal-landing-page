import { localUrl } from "@/lib/paths";
import { pageMetadata } from "@/lib/site";
import { profile, skills } from "@/data/profile";
import { career } from "@/data/career";
import { projects } from "@/data/projects";
import { PrintButton } from "./print-button";
export const metadata = pageMetadata(
  "Résumé — Risang Ganie Salam",
  "Experience, education, projects, and skills of Risang Ganie Salam, Mobile & Frontend Engineer.",
  "/resume",
);
export default function Resume() {
  return (
    <main id="main" className="resume">
      <div className="resume-toolbar">
        <a href={localUrl("/")}>← Interactive portfolio</a>
        <PrintButton />
      </div>
      <header>
        <span className="eyebrow">RÉSUMÉ / ENGINEERING</span>
        <h1>{profile.name}</h1>
        <h2>{profile.role}</h2>
        <div className="resume-contact">
          <span>{profile.location}</span>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={profile.github}>github.com/risangdevs</a>
          <a href={profile.linkedin}>linkedin.com/in/risanggani</a>
        </div>
      </header>
      <section>
        <h2>Summary</h2>
        <p>
          Engineering graduate with experience developing and maintaining
          business-critical web and mobile applications. Specialized in
          real-time financial interfaces, API integration, transaction
          workflows, rendering optimization, and technical problem-solving.
          Background in frontend delivery, technical sales, and independent web
          development.
        </p>
      </section>
      <section>
        <h2>Experience</h2>
        {[...career].reverse().map((c) => (
          <article key={c.period}>
            <div className="resume-row">
              <h3>{c.title}</h3>
              <span>{c.period}</span>
            </div>
            <strong>{c.company}</strong>
            <p>{c.responsibility}</p>
            <p className="muted">{c.technology}</p>
          </article>
        ))}
      </section>
      <section>
        <h2>Selected projects</h2>
        {projects.slice(0, 4).map((p) => (
          <article key={p.id}>
            <div className="resume-row">
              <h3>
                {p.id === "meci" ? (
                  <a href={localUrl("/projects/meci")}>{p.title}</a>
                ) : (
                  p.title
                )}
              </h3>
              <span>{p.status}</span>
            </div>
            <p>{p.description}</p>
            <p className="muted">{p.stack.join(" · ")}</p>
          </article>
        ))}
      </section>
      <section>
        <h2>Skills</h2>
        <div className="resume-skills">
          {Object.entries(skills)
            .filter(([k]) => k !== "Research")
            .map(([group, items]) => (
              <p key={group}>
                <strong>{group}:</strong> {items.join(", ")}
              </p>
            ))}
        </div>
      </section>
      <section>
        <h2>Education & training</h2>
        <article>
          <h3>Institut Teknologi Bandung</h3>
          <p>
            Sarjana Teknik (S.T.) · Teknik Metalurgi / Metallurgical Engineering
          </p>
          <p>2009–2015 · Degree completed September 2015</p>
        </article>
        <article>
          <h3>Hacktiv8</h3>
          <p>Fullstack JavaScript Immersive Program · 2021–2022</p>
        </article>
      </section>
      <section>
        <h2>Teaching & applied research interests</h2>
        <p>
          HVAC systems, energy efficiency, ventilation, thermal comfort, air
          distribution, cleanrooms, and data center cooling. Research notes in
          the portfolio explain simplified methodologies; no publication record
          or institutional teaching appointment is claimed.
        </p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>
          <a href={`mailto:${profile.email}`}>{profile.email}</a> ·{" "}
          <a href={profile.github}>github.com/risangdevs</a>
        </p>
      </section>
    </main>
  );
}
