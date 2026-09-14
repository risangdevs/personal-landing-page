import { absoluteUrl } from "@/lib/site";
import { SystemExperience } from "@/features/system/system-experience";
import { profile } from "@/data/profile";
export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: profile.name,
            jobTitle: profile.role,
            url: absoluteUrl("/"),
            sameAs: [profile.github, profile.linkedin],
            knowsAbout: [
              "React Native",
              "TypeScript",
              "Flutter",
              "Realtime financial systems",
              "HVAC research",
            ],
          }),
        }}
      />
      <SystemExperience />
    </>
  );
}
