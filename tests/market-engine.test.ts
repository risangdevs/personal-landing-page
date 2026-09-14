import test from "node:test";
import assert from "node:assert/strict";
import { MarketEngine, priceTone } from "../src/engine/market-engine";
test("seeded market data remains ordered, bounded and reproducible under sustained updates", () => {
  const a = new MarketEngine(42),
    b = new MarketEngine(42);
  for (let i = 0; i < 5000; i++) {
    a.generateTick();
    b.generateTick();
  }
  const s = a.getSnapshot();
  assert.equal(s.sequence, 5000);
  assert.equal(s.trades.length, 30);
  assert.equal(s.bids.length, 10);
  assert.equal(s.asks.length, 10);
  assert.deepEqual(s.bids, b.getSnapshot().bids);
  assert.equal(s.index, b.getSnapshot().index);
  assert.ok(
    s.bids.every(
      (l) =>
        Number.isInteger(l.lots) && l.lots >= l.frequency && l.frequency > 0,
    ),
  );
  assert.ok(
    s.asks.every((l) => Number.isInteger(l.lots) && l.lots >= l.frequency),
  );
  assert.ok(s.bids.every((l, i) => i === 0 || l.price < s.bids[i - 1].price));
  assert.ok(s.asks.every((l, i) => i === 0 || l.price > s.asks[i - 1].price));
  assert.ok(s.bids[0].price < s.asks[0].price);
  a.destroy();
  b.destroy();
});
test("pause freezes sequence and last unsubscribe stops the interval", async () => {
  const engine = new MarketEngine();
  let count = 0;
  const unsubscribe = engine.subscribe(() => count++);
  await new Promise((r) => setTimeout(r, 130));
  assert.ok(count > 0);
  engine.setPaused(true);
  const sequence = engine.getSnapshot().sequence;
  await new Promise((r) => setTimeout(r, 100));
  assert.equal(engine.getSnapshot().sequence, sequence);
  unsubscribe();
  const before = count;
  engine.setPaused(false);
  await new Promise((r) => setTimeout(r, 100));
  assert.equal(count, before);
  assert.equal(engine.getSnapshot().sequence, sequence);
  engine.destroy();
});
test("speed accepts only supported values and immutable snapshots preserve old data", () => {
  const engine = new MarketEngine();
  const old = engine.getSnapshot();
  engine.generateTick();
  assert.equal(old.sequence, 0);
  assert.notEqual(old, engine.getSnapshot());
  engine.setSpeed(5);
  assert.equal(engine.getSnapshot().speed, 5);
  engine.setSpeed(500);
  assert.equal(engine.getSnapshot().speed, 1);
  engine.destroy();
});

test("packets and trade tape share event identity and bounded volume", () => {
  const e = new MarketEngine();
  for (let i = 0; i < 500; i++) e.generateTick();
  const s = e.getSnapshot();
  assert.equal(s.packets.length, 160);
  for (const t of s.trades) {
    const p = s.packets.find((p) => p.sequence === t.id);
    assert.ok(p);
    assert.equal(p.symbol, t.code);
    assert.equal(p.price, t.price);
    assert.equal(p.volume, t.lots * 100);
  }
  for (const speed of [1, 5, 10, 25]) {
    e.setSpeed(speed);
    assert.equal(e.getSnapshot().speed, speed);
  }
  e.destroy();
});

test("price color compares either side with previous close", () => {
  assert.equal(priceTone(1070, 1100), "negative");
  assert.equal(priceTone(1100, 1100), "price-unchanged");
  assert.equal(priceTone(1105, 1100), "positive");
});
