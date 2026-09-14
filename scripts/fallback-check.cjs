const { chromium } = require(
  process.env.PLAYWRIGHT_PATH ||
    "/Users/risang/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright",
);
const assert = require("node:assert/strict");
(async () => {
  const b = await chromium.launch({
    channel: "chrome",
    headless: true,
    args: ["--enable-unsafe-swiftshader"],
  });
  const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
  await p.goto("http://localhost:3000");
  await p.getByRole("button", { name: "System", exact: true }).click();
  await p.locator("canvas").waitFor();
  await p.waitForTimeout(1800);
  const lost = await p.locator("canvas").evaluate((c) => {
    const gl = c.getContext("webgl2");
    const ext = gl?.getExtension("WEBGL_lose_context");
    if (!ext) return false;
    ext.loseContext();
    return true;
  });
  assert.ok(lost);
  await p
    .getByRole("group", { name: "System architecture without 3D" })
    .waitFor();
  await p.getByRole("button", { name: "Open command navigation" }).click();
  await p.getByRole("textbox", { name: "Search commands" }).fill("contact");
  await p.keyboard.press("Enter");
  await p
    .getByRole("textbox", { name: "Name", exact: true })
    .fill("Test visitor");
  await p
    .getByRole("textbox", { name: "Email", exact: true })
    .fill("visitor@example.com");
  await p
    .getByRole("textbox", { name: "Message", exact: true })
    .fill("Local test only");
  await p.getByRole("button", { name: "Prepare message" }).click();
  assert.match(
    await p.getByRole("link", { name: "Open email app" }).getAttribute("href"),
    /^mailto:risanggani@gmail.com/,
  );
  await p.getByRole("button", { name: "Close dialog" }).click();
  for (const width of [320, 390, 768]) {
    await p.setViewportSize({ width, height: 900 });
    await p.goto("http://localhost:3000");
    await p.waitForTimeout(250);
    assert.ok(
      await p.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `overflow at ${width}`,
    );
    await p.screenshot({
      path: `/tmp/risang-final-${width}.png`,
      fullPage: true,
    });
  }
  console.log(
    "Context loss fallback, contact composition, 320/390/768px layouts passed",
  );
  await b.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
