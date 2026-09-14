"use client";
import { useRef, useEffect, useMemo } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { marketEngine, type MarketPacket } from "@/engine/market-engine";
import { systemModules, tracePath } from "@/data/system";
import { useNavigation } from "@/stores/navigation-store";
// Transient frame state deliberately bypasses React and Zustand notifications.
export const tracedPacketPosition = new THREE.Vector3(
  ...systemModules[0].position,
);
export function DataPackets() {
  const mesh = useRef<THREE.InstancedMesh>(null),
    labels = useRef<HTMLDivElement>(null);
  const active = useRef<MarketPacket[]>([]);
  const lastTime = useRef(0);
  const pauseAt = useRef(0);
  const frozenAges = useRef(new Map<number, number>());
  const quality = useNavigation((s) => s.effectiveQuality),
    reduced = useNavigation((s) => s.reducedMotion);
  const max = quality === "High" ? 128 : quality === "Medium" ? 64 : 24;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        systemModules.map(
          (m) => new THREE.Vector3(m.position[0], 0.8, m.position[2]),
        ),
        false,
        "catmullrom",
        0.2,
      ),
    [],
  );
  useEffect(() => {
    active.current = [];
    return marketEngine.subscribe(() => {
      const s = marketEngine.getSnapshot(),
        p = s.packets.at(-1);
      const decimation = quality === "High" ? 1 : quality === "Medium" ? 2 : 5;
      if (
        p &&
        p.sequence % (s.speed * decimation) === 0 &&
        active.current.at(-1)?.sequence !== p.sequence
      ) {
        active.current = [...active.current, p].slice(-max);
      }
    });
  }, [max, quality]);
  useFrame(() => {
    const snapshot = marketEngine.getSnapshot(),
      now = Date.now();
    if (snapshot.paused && !pauseAt.current) {
      pauseAt.current = now;
      active.current.forEach((p) =>
        frozenAges.current.set(p.sequence, Math.max(0, now - p.createdAt)),
      );
    } else if (!snapshot.paused && pauseAt.current) {
      pauseAt.current = 0;
      frozenAges.current.clear();
    }
    const packets = active.current;
    if (!mesh.current) return;
    mesh.current.count = packets.length;
    packets.forEach((p, i) => {
      const age = snapshot.paused
        ? frozenAges.current.get(p.sequence) || 0
        : Math.max(0, now - p.createdAt);
      const progress = reduced
        ? (p.sequence % 100) / 100
        : Math.min(0.999, age / 5500);
      dummy.position.copy(curve.getPointAt(progress));
      dummy.scale.set(0.07, 0.045, 0.14);
      const tangent = curve.getTangentAt(progress);
      dummy.rotation.y = Math.atan2(tangent.x, tangent.z);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    if (labels.current && now - lastTime.current > 350) {
      lastTime.current = now;
      const packet = packets.at(-1);
      labels.current.textContent = packet
        ? `${packet.symbol}  ${packet.price.toLocaleString()}  #${packet.sequence}`
        : "Awaiting market event";
    }
  });
  function inspect(event: ThreeEvent<MouseEvent>) {
    event.stopPropagation();
    if (
      useNavigation.getState().phase !== "system" ||
      useNavigation.getState().tracing
    )
      return;
    if (event.instanceId === undefined) return;
    const packet = active.current[event.instanceId];
    if (packet) {
      marketEngine.setPaused(true);
      useNavigation.getState().inspectPacket(packet);
    }
  }
  return (
    <>
      <instancedMesh
        ref={mesh}
        args={[undefined, undefined, 128]}
        onClick={inspect}
        frustumCulled={false}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#b3a0e3"
          emissive="#8771aa"
          emissiveIntensity={0.55}
          metalness={0.15}
          roughness={0.4}
        />
      </instancedMesh>
      <Html position={[-3.9, 1.7, 1.4]} center zIndexRange={[4, 0]}>
        <div className="packet-live-label" ref={labels}>
          Connecting simulation…
        </div>
      </Html>
      <TracedPacket />
    </>
  );
}
function TracedPacket() {
  const group = useRef<THREE.Group>(null);
  const tracing = useNavigation((s) => s.tracing),
    packet = useNavigation((s) => s.packet);
  useEffect(() => {
    if (tracing) tracedPacketPosition.set(...systemModules[0].position);
  }, [tracing]);
  useFrame((_, dt) => {
    const nav = useNavigation.getState();
    if (!nav.tracing || !group.current) return;
    const module = systemModules.find((m) => m.id === tracePath[nav.traceStep]);
    if (!module) return;
    const target = new THREE.Vector3(
      module.position[0],
      1.65,
      module.position[2],
    );
    if (nav.reducedMotion) tracedPacketPosition.copy(target);
    else tracedPacketPosition.lerp(target, 1 - Math.exp(-dt * 2.4));
    group.current.position.copy(tracedPacketPosition);
  });
  if (!tracing || !packet) return null;
  return (
    <group ref={group}>
      <mesh>
        <octahedronGeometry args={[0.13, 0]} />
        <meshStandardMaterial
          color="#e0c19a"
          emissive="#ac885d"
          emissiveIntensity={0.7}
        />
      </mesh>
      <Html position={[0, 0.35, 0]} center zIndexRange={[8, 0]}>
        <div className="packet-live-label traced-packet-label">
          {packet.symbol} · {packet.price.toLocaleString()}
          <strong>TRACING #{packet.sequence}</strong>
        </div>
      </Html>
    </group>
  );
}
