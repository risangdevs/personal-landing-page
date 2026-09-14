import type { NextConfig } from "next";
const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath:
    process.env.NODE_ENV === "development" ? "" : "/personal-landing-page",
  env: {
    NEXT_PUBLIC_BASE_PATH:
      process.env.NODE_ENV === "development" ? "" : "/personal-landing-page",
  },
  images: { unoptimized: true },
  reactStrictMode: true,
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  poweredByHeader: false,
  devIndicators: false,
};
export default config;
