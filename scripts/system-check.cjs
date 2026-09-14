const { chromium } = require(
  process.env.PLAYWRIGHT_PATH ||
    "/Users/risang/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright",
);
const assert = require("node:assert/strict");
(async () => {
  const browser = await chromium.launch({
    channel: "chrome",
    headless: true,
    args: [
      "--enable-webgl",
      "--use-gl=angle",
      "--use-angle=swiftshader",
      "--enable-unsafe-swiftshader",
    ],
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: "/tmp/meci-overview.png", fullPage: true });
  assert.equal(await page.locator(".node-label:visible").count(), 0);
  assert.equal(
    await page
      .getByRole("complementary", { name: "Technical inspector" })
      .count(),
    0,
  );
  await page
    .getByRole("link", { name: "Explore my work", exact: true })
    .click();
  await page
    .getByRole("region", { name: "Project MECI", exact: true })
    .waitFor();
  await page
    .getByRole("button", { name: /Try the order book/, exact: false })
    .click();
  await page.getByRole("heading", { name: "MECI / BBCA" }).waitFor();
  await page.waitForTimeout(1200);
  assert.ok(
    (await page.locator(".module-screen").count()) > 0,
    "3D remains mounted",
  );
  assert.equal(await page.locator(".module-screen:visible").count(), 0);
  assert.equal(
    await page
      .locator(".machine-viewport")
      .evaluate((el) => getComputedStyle(el).isolation),
    "isolate",
  );
  await page.screenshot({ path: "/tmp/meci-orderbook.png", fullPage: true });
  await page
    .getByRole("button", { name: /Buy BBCA at offer/ })
    .first()
    .click();
  await page.getByRole("spinbutton", { name: "Number of lots" }).fill("12");
  await page.getByRole("button", { name: "Buy · Simulate order" }).click();
  await page.getByRole("heading", { name: "Order accepted" }).waitFor();
  await page.getByRole("button", { name: "Close dialog" }).click();
  await page
    .getByRole("button", { name: "Back to project", exact: true })
    .click();
  await page.getByRole("button", { name: /How it works/ }).click();
  await page
    .getByRole("button", { name: "Follow a packet", exact: true })
    .click();
  await page.getByText("STEP 1 OF 7", { exact: true }).waitFor();
  await page.waitForTimeout(3000);
  await page.getByText("STEP 1 OF 7", { exact: true }).waitFor();
  for (let i = 0; i < 6; i++)
    await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByText("STEP 7 OF 7", { exact: true }).waitFor();
  await page
    .getByRole("button", { name: /Try the order book/, exact: false })
    .click();
  await page.getByRole("heading", { name: "MECI / BBCA" }).waitFor();
  for (const width of [768, 390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("http://localhost:3000");
    await page.waitForTimeout(500);
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      "overflow at " + width,
    );
    if (width === 390)
      await page.screenshot({ path: "/tmp/meci-mobile.png", fullPage: true });
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await page.getByRole("button", { name: /How it works/ }).click();
  await page
    .getByRole("group", { name: "System architecture without 3D" })
    .waitFor();
  await page
    .getByRole("button", { name: "Back to overview", exact: true })
    .click();
  await page.getByRole("button", { name: /About me/ }).click();
  await page.getByRole("region", { name: "About Risang" }).waitFor();
  await page.goto("http://localhost:3000/resume");
  await page.getByRole("heading", { name: "Education & training" }).waitFor();
  console.log(JSON.stringify({ passed: true, pageErrors: errors }));
  await browser.close();
  if (errors.length) process.exitCode = 1;
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
