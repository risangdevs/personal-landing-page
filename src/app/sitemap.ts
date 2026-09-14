export const dynamic = "force-static";
import type { MetadataRoute } from "next";
import { siteUrl, absoluteUrl } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];
  return ["/", "/projects/meci/", "/resume/"].map((path) => ({
    url: absoluteUrl(path)!,
  }));
}
