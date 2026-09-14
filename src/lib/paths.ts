export function localUrl(path: string) {
  const [pathname, query] = path.split("?");
  const normalized =
    pathname.includes(".") || pathname.endsWith("/")
      ? pathname
      : `${pathname}/`;
  return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${normalized}${query ? `?${query}` : ""}`;
}
