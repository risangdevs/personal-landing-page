import { localUrl } from "@/lib/paths";
import { pageMetadata, siteUrl } from "@/lib/site";
import type { Metadata } from "next";
import "./globals.css";
import "./journey.css";
import "./simplified.css";
export const metadata: Metadata = {
  ...pageMetadata(
    "Risang Ganie Salam — Mobile & Frontend Engineer",
    "Risang Ganie Salam, Mobile & Frontend Engineer in Jakarta. React Native, TypeScript, and realtime financial interfaces. Explore Project MECI and professional experience.",
    "/",
  ),
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  icons: { icon: localUrl("/favicon.svg") },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
