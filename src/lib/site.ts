import type { Metadata } from "next";
export const siteUrl = (
  process.env.SITE_URL || "https://risangdevs.github.io/personal-landing-page/"
).replace(/\/?$/, "/");
export const absoluteUrl = (path: string) =>
  new URL(path.replace(/^\//, ""), siteUrl).toString();
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: siteUrl
      ? {
          canonical: absoluteUrl(
            path === "/" ? "/" : `${path.replace(/\/$/, "")}/`,
          ),
        }
      : undefined,
    openGraph: {
      title,
      description,
      type: "website",
      url: absoluteUrl(path === "/" ? "/" : `${path.replace(/\/$/, "")}/`),
      siteName: "Risang / Market Systems",
      ...(siteUrl
        ? {
            images: [
              {
                url: absoluteUrl("/social-preview.png")!,
                width: 1200,
                height: 630,
                alt: "Risang Ganie Salam — Mobile & Frontend Engineer",
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(siteUrl ? { images: [absoluteUrl("/social-preview.png")!] } : {}),
    },
  };
}
