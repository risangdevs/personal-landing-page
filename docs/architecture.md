# One simulation, multiple views

```text
MarketEngine (seeded local generator, 50 ms batch timer)
 ├─ immutable MarketSnapshot
 │   ├─ 10 bid levels + 10 ask levels
 │   ├─ 30 recent trades
 │   ├─ 160 recent typed packet records
 │   └─ IDX simulation value
 ├─ useMarket (rAF coalescing + bounded publication cadence)
 │   ├─ order book / ticket / running tape
 │   ├─ terminal price / footer / packet inspection button
 │   └─ Lightweight Charts (direct series updates)
 └─ React Three Fiber frame loop
     ├─ sampled records → InstancedMesh matrices
     ├─ captured packet → guided trace marker
     └─ predefined camera target + small pointer parallax
```

## State boundaries

- `src/engine/market-engine.ts`: simulation lifetime, immutable snapshots, typed packets, PRNG, speed and pause.
- `src/stores/navigation-store.ts`: experience phase, selected module, trace step, inspected packet, 3D/2D mode, quality, renderer readiness, and infrequent frame-rate samples.
- `src/stores/ui-store.ts`: market presentation quality and order inspector state.
- Component-local React state: form values, dialogs, project tabs, and command history.
- Transient Three.js vectors and object refs: per-frame positions and matrices. They are not reactive application state.

## Scene

The central heat-sink machine and satellite geometries represent software boundaries. There are no random decorative particles. Every packet instance references an actual `MarketPacket` generated with the same symbol, price, and shares volume as a trade record. Packets are sampled according to quality and load to bound rendering cost; the scene is a sampled visualization, not a promise to display every event.

`DataPackets` uses one InstancedMesh, a reusable Object3D matrix helper, and a bounded history of actual packet references. Clicks resolve instanceId to the rendered message. Inspection freezes the simulator. Trace preserves one captured record, resumes the live feed, and carries the record through the guided path with a separate visible marker. Trace position is transient frame state; the camera reads it directly.

The overview provides three ordinary HTML entry points over a noninteractive scene illustration. Project and About details render on demand. The architecture view enables module selection and an optional packet trace. Trace steps advance only on Continue; no timer controls the visitor’s route. The order book opens directly from the project detail.

The scene viewport creates an isolated stacking context. Drei HTML panels use an explicit bounded z-index range and become hidden during the order-book phase. This keeps transformed BBCA scene labels underneath the real HTML trading surface.

## Consistency and validation

Order prices are captured when selected and do not drift while the ticket is open. Quantity is a required whole number between 1 and 10,000 lots. Total = selected price × lots × 100 shares. An accepted order has no external effect.

A packet's shares volume equals its originating trade's lots × 100. Sequence links the packet to its trade. Timestamps are real generation times; seeded financial fields are deterministic, timestamps are intentionally not. The system diagram is conceptual; no production data or proprietary architecture is exposed.

## Lifecycle and quality

First subscriber starts the generator; last cleanup stops it. Timers, subscriptions, camera-transition timeouts, charts, and animation callbacks clean up on unmount. The market skips generation while the document is hidden, and Canvas uses a stopped frameloop while hidden.

Auto quality starts from viewport width, DPR, and a GPU capability proxy (maxTextureSize), then reduces quality after sustained slow rAF windows. This is conservative adaptation, not GPU benchmarking. WebGL context loss and renderer exceptions switch to semantic 2D; reduced-motion users begin there. Every 3D action has a corresponding HTML control.

## Module layout

```text
src/app/                         Server routes, metadata, styles, printable résumé
src/features/system/             First-milestone experience, inspector, fallback, trading surface
src/features/market/             Coalesced market hook, order book, tape
src/three/                       Machine, modules, conduits, packets, camera, quality monitor
src/engine/                      Shared seeded simulator
src/stores/                      Separate navigation and UI state
src/data/                        Verified profile/career, project content, system descriptions
src/components/                  Chart and accessible dialog primitives
```

Three.js and React Three Fiber are dynamically loaded for the optional overview illustration and architecture view. The opening and résumé do not require WebGL. OpenGraph and Twitter metadata, Person JSON-LD, and server-rendered professional content remain available to crawlers.

## Deliberate first-milestone limits

No Migration Chamber, Incident Room, Career Mode, Research System, secondary project machinery, achievements, or sound is shipped in the interactive experience. There is no exchange connection, real order submission, production benchmark claim, or automatic mail delivery. `/resume` preserves conventional professional content and project references.
