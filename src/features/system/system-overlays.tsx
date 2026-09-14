"use client";
import { localUrl } from "@/lib/paths";
import { useState } from "react";
import { ArrowRight, Command } from "lucide-react";
import { Modal } from "@/components/ui";
import { profile, skills } from "@/data/profile";
import { career } from "@/data/career";
import { systemModules } from "@/data/system";
type Props = {
  palette: boolean;
  setPalette: (v: boolean) => void;
  terminal: boolean;
  setTerminal: (v: boolean) => void;
  onContact: () => void;
  onSystem: () => void;
  onOrder: () => void;
  onProfile: () => void;
  onTrace: () => void;
};
export function SystemOverlays({
  palette,
  setPalette,
  terminal,
  setTerminal,
  onContact,
  onSystem,
  onOrder,
  onProfile,
  onTrace,
}: Props) {
  const [query, setQuery] = useState(""),
    [line, setLine] = useState("");
  const [history, setHistory] = useState([
    "RISANG / MARKET SYSTEMS",
    "Type help to inspect available commands.",
  ]);
  const commands = [
    { name: "System overview", action: onSystem },
    { name: "MECI / Order engine", action: onOrder },
    { name: "Follow the data", action: onTrace },
    { name: "Profile", action: onProfile },
    {
      name: "Résumé",
      action: () => {
        window.location.href = localUrl("/resume");
      },
    },
    { name: "Contact", action: onContact },
    { name: "Developer terminal", action: () => setTerminal(true) },
  ];
  const results = commands.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()),
  );
  function run(input: string) {
    const command = input.trim().toLowerCase();
    let response = "";
    switch (command) {
      case "help":
        response =
          "about · projects · experience · skills · architecture · research · github · resume · contact · system · clear";
        break;
      case "about":
        response = `${profile.name}\n${profile.role}\n${profile.summary}`;
        break;
      case "projects":
        response =
          "MECI — Securities trading platform\nThe initial release focuses on the market → order journey. Additional project content is available in /resume.";
        break;
      case "experience":
        response = career
          .map((c) => `${c.period} · ${c.company} · ${c.title}`)
          .join("\n");
        break;
      case "skills":
        response = Object.entries(skills)
          .map(([k, v]) => `${k}: ${v.join(", ")}`)
          .join("\n");
        break;
      case "architecture":
        response = systemModules
          .map((m) => `${m.short}: ${m.caption}`)
          .join("\n");
        break;
      case "research":
        response =
          "Applied engineering interests: HVAC, energy efficiency, ventilation, thermal comfort, air distribution, cleanroom, and data center cooling. The Research System is outside this first vertical slice.";
        break;
      case "github":
        response = profile.github;
        break;
      case "resume":
        window.location.href = localUrl("/resume");
        return;
      case "system":
        setTerminal(false);
        onSystem();
        response = "System overview opened.";
        break;
      case "contact":
      case "sudo hire risang":
        setTerminal(false);
        onContact();
        response = "Contact details opened.";
        break;
      case "clear":
        setHistory([]);
        setLine("");
        return;
      default:
        response = `Unknown command: ${input}. Type help.`;
    }
    setHistory((h) => [
      ...h.slice(-50),
      `risang@market-system:~$ ${input}`,
      response,
    ]);
    setLine("");
  }
  return (
    <>
      <Modal
        open={palette}
        onClose={() => setPalette(false)}
        title="Command navigation"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (results[0]) {
              setPalette(false);
              results[0].action();
              setQuery("");
            }
          }}
        >
          <label className="command-search">
            <Command size={17} />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Navigate the system…"
              aria-label="Search commands"
            />
          </label>
        </form>
        <div className="command-list">
          {results.map((r) => (
            <button
              key={r.name}
              onClick={() => {
                setPalette(false);
                r.action();
                setQuery("");
              }}
            >
              {r.name}
              <ArrowRight size={15} />
            </button>
          ))}
          {!results.length && <p className="notice">No matching commands.</p>}
        </div>
        <p className="form-note">
          Enter: first result · Tab: choose · Escape: close
        </p>
      </Modal>
      <Modal
        open={terminal}
        onClose={() => setTerminal(false)}
        title="Developer terminal"
        wide
      >
        <div className="terminal-output" role="log" aria-live="polite">
          {history.map((h, i) => (
            <pre key={i}>{h}</pre>
          ))}
        </div>
        <form
          className="terminal-prompt"
          onSubmit={(e) => {
            e.preventDefault();
            if (line.trim()) run(line);
          }}
        >
          <span>risang@market-system:~$</span>
          <input
            autoFocus
            aria-label="Terminal command"
            value={line}
            onChange={(e) => setLine(e.target.value)}
            autoComplete="off"
            spellCheck={false}
          />
          <button aria-label="Run command">
            <ArrowRight size={16} />
          </button>
        </form>
      </Modal>
    </>
  );
}
