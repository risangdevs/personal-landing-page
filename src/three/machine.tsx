"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Line, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { systemModules, type SystemModule } from "@/data/system";
import { useNavigation } from "@/stores/navigation-store";
import { marketEngine } from "@/engine/market-engine";
function MetalBox({
  position = [0, 0, 0],
  size = [1, 1, 1],
  color = "#222733",
}: {
  position?: [number, number, number];
  size?: [number, number, number];
  color?: string;
}) {
  return (
    <RoundedBox position={position} args={size} radius={0.035} smoothness={2}>
      <meshStandardMaterial color={color} metalness={0.65} roughness={0.32} />
    </RoundedBox>
  );
}
export function CoreMachine() {
  const turbine = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (turbine.current && !useNavigation.getState().reducedMotion)
      turbine.current.rotation.y += dt * 0.08;
  });
  return (
    <group position={[0, 0.45, 0]}>
      <MetalBox
        position={[0, -0.2, 0]}
        size={[2.35, 0.24, 2.05]}
        color="#383c49"
      />
      <MetalBox position={[0, 0.04, 0]} size={[2.12, 0.15, 1.82]} />
      {[-0.82, 0.82].map((x) => (
        <group key={x} position={[x, 0.65, 0]}>
          {Array.from({ length: 11 }, (_, i) => (
            <MetalBox
              key={i}
              position={[0, 0, -0.75 + i * 0.15]}
              size={[0.38, 1.18, 0.05]}
              color="#3a3d4b"
            />
          ))}
        </group>
      ))}
      <MetalBox
        position={[0, 1.29, 0]}
        size={[2.12, 0.17, 1.82]}
        color="#38394a"
      />
      <group ref={turbine} position={[0, 0.7, 0]}>
        {[0, 1, 2].map((i) => (
          <mesh
            key={i}
            rotation={[Math.PI / 2, 0, 0]}
            position={[0, i * 0.22 - 0.2, 0]}
          >
            <torusGeometry args={[0.48, 0.035, 6, 40]} />
            <meshStandardMaterial
              color="#9081bf"
              metalness={0.75}
              roughness={0.35}
            />
          </mesh>
        ))}
        <mesh>
          <cylinderGeometry args={[0.26, 0.26, 0.83, 12]} />
          <meshStandardMaterial
            color="#3c354c"
            emissive="#7e5fa9"
            emissiveIntensity={0.28}
            metalness={0.75}
            roughness={0.24}
          />
        </mesh>
      </group>
      {[-0.9, 0.9].map((x) =>
        [-0.72, 0.72].map((z) => (
          <MetalBox
            key={`${x}${z}`}
            position={[x, 0.66, z]}
            size={[0.09, 1.45, 0.09]}
            color="#92909d"
          />
        )),
      )}
      <mesh position={[0, 0.67, 0.92]}>
        <planeGeometry args={[1.14, 0.74]} />
        <meshStandardMaterial color="#0b1019" metalness={0.1} roughness={0.5} />
      </mesh>
      <Html
        zIndexRange={[5, 0]}
        position={[0, 0.74, 0.96]}
        transform
        distanceFactor={3.7}
        style={{ pointerEvents: "none" }}
      >
        <div className="machine-display">
          <span className="screen-dot" /> RISANG
          <strong>
            MARKET
            <br />
            ENGINE
          </strong>
          <small>SIMULATION / ONLINE</small>
        </div>
      </Html>
      <mesh position={[0, 1.395, 0.25]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.75, 0.65]} />
        <meshStandardMaterial
          color="#111624"
          emissive="#766490"
          emissiveIntensity={0.18}
        />
      </mesh>
    </group>
  );
}
export function ModuleNode({ module }: { module: SystemModule }) {
  const bidLabel = useRef<HTMLSpanElement>(null),
    offerLabel = useRef<HTMLElement>(null);
  const lastUpdate = useRef(0);
  useFrame(({ clock }) => {
    if (module.id !== "order" || clock.elapsedTime - lastUpdate.current < 0.25)
      return;
    lastUpdate.current = clock.elapsedTime;
    const snapshot = marketEngine.getSnapshot();
    if (bidLabel.current)
      bidLabel.current.textContent = snapshot.bids[0].price.toLocaleString();
    if (offerLabel.current)
      offerLabel.current.textContent = snapshot.asks[0].price.toLocaleString();
  });
  const phase = useNavigation((s) => s.phase);
  const tracing = useNavigation((s) => s.tracing);
  const selected = useNavigation((s) => s.selected === module.id);
  const select = useNavigation((s) => s.select);
  const group = useRef<THREE.Group>(null);
  const [x, y, z] = module.position;
  return (
    <group
      ref={group}
      position={[x, y, z]}
      onClick={(e) => {
        e.stopPropagation();
        if (phase === "system" && !useNavigation.getState().tracing)
          select(module.id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = phase === "system" ? "pointer" : "auto";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
      }}
    >
      <MetalBox
        size={[1.55, 0.15, 1.22]}
        position={[0, 0, 0]}
        color={selected ? "#554866" : "#282d39"}
      />
      {module.id === "feed" ? (
        <group>
          {[0, 1, 2].map((i) => (
            <group key={i} position={[-0.45 + i * 0.45, 0.43, 0]}>
              <mesh>
                <cylinderGeometry args={[0.13, 0.17, 0.7, 12]} />
                <meshStandardMaterial
                  color="#586a65"
                  metalness={0.75}
                  roughness={0.35}
                />
              </mesh>
              <mesh position={[0, 0.38, 0]}>
                <sphereGeometry args={[0.055, 8, 8]} />
                <meshStandardMaterial
                  color="#96c7ac"
                  emissive="#639e78"
                  emissiveIntensity={0.5}
                />
              </mesh>
            </group>
          ))}
        </group>
      ) : module.id === "socket" ? (
        <group>
          {[-0.34, 0, 0.34].map((v, i) => (
            <mesh
              key={i}
              position={[v, 0.55, 0]}
              rotation={[0, Math.PI / 2, 0]}
            >
              <torusGeometry args={[0.4, 0.07, 8, 24]} />
              <meshStandardMaterial
                color="#6a8495"
                metalness={0.8}
                roughness={0.25}
              />
            </mesh>
          ))}
          <MetalBox size={[1.05, 0.18, 0.25]} position={[0, 0.22, 0]} />
        </group>
      ) : module.id === "data" || module.id === "state" ? (
        <group>
          {[0, 1, 2, 3].map((i) => (
            <group key={i}>
              <MetalBox
                position={[0, 0.2 + i * 0.19, 0]}
                size={[module.id === "data" ? 1.13 : 0.85, 0.1, 0.8]}
                color={i % 2 ? "#3e394e" : "#333644"}
              />
              <mesh position={[0.48, 0.2 + i * 0.19, 0.41]}>
                <boxGeometry args={[0.12, 0.024, 0.015]} />
                <meshBasicMaterial color={module.color} />
              </mesh>
            </group>
          ))}
        </group>
      ) : module.id === "order" ? (
        <group>
          <MetalBox
            size={[1.24, 0.84, 0.6]}
            position={[0, 0.49, -0.15]}
            color="#363345"
          />
          <mesh position={[0, 0.54, 0.163]}>
            <planeGeometry args={[1.08, 0.56]} />
            <meshStandardMaterial color="#0b1119" />
          </mesh>
          <Html
            zIndexRange={[5, 0]}
            position={[0, 0.56, 0.18]}
            transform
            distanceFactor={3.3}
            style={{ pointerEvents: "none" }}
          >
            <div className="module-screen">
              <span>BBCA / ORDER BOOK</span>
              <b>
                <span ref={bidLabel}>7,100</span>{" "}
                <em ref={offerLabel}>7,125</em>
              </b>
              <i>•••••••••••••</i>
              <small>INSPECT → INTERACT</small>
            </div>
          </Html>
        </group>
      ) : module.id === "render" ? (
        <group>
          <MetalBox position={[0, 0.25, 0]} size={[1.25, 0.3, 0.75]} />
          {Array.from({ length: 9 }, (_, i) => (
            <MetalBox
              key={i}
              position={[-0.52 + i * 0.13, 0.56, 0]}
              size={[0.05, 0.36, 0.8]}
              color="#596177"
            />
          ))}
        </group>
      ) : (
        <group rotation={[-0.2, 0, 0]}>
          <MetalBox
            position={[0, 0.67, 0]}
            size={[0.66, 1.18, 0.12]}
            color="#515764"
          />
          <mesh position={[0, 0.69, 0.067]}>
            <planeGeometry args={[0.54, 0.97]} />
            <meshStandardMaterial
              color="#171b2c"
              emissive="#35314d"
              emissiveIntensity={0.5}
            />
          </mesh>
          <Line
            points={[
              [-0.2, 0.5, 0.08],
              [-0.12, 0.61, 0.08],
              [-0.04, 0.57, 0.08],
              [0.06, 0.74, 0.08],
              [0.2, 0.85, 0.08],
            ]}
            color="#a494ca"
            lineWidth={1.5}
          />
        </group>
      )}
      <Html
        position={[0, -0.22, 0.63]}
        center
        distanceFactor={13}
        zIndexRange={[5, 0]}
      >
        <button
          className={`node-label ${selected ? "selected" : ""}`}
          hidden={phase !== "system" || tracing}
          onClick={() => select(module.id)}
        >
          <span style={{ background: module.color }} />
          {module.short}
        </button>
      </Html>
      {selected && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.025, 0]}>
          <ringGeometry args={[0.92, 0.935, 48]} />
          <meshBasicMaterial
            color={module.color}
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
}
export function Conduits() {
  return (
    <group>
      {systemModules.map((m, i) => {
        const next = systemModules[(i + 1) % systemModules.length];
        const a = new THREE.Vector3(...m.position),
          b = new THREE.Vector3(...next.position);
        a.y = 0.16;
        b.y = 0.16;
        const mid = a.clone().lerp(b, 0.5);
        return (
          <group key={m.id}>
            <Line points={[a, mid, b]} color="#3b4051" lineWidth={2} />
            <Line
              points={[
                [0, 0.18, 0],
                [m.position[0] * 0.55, 0.18, m.position[2] * 0.55],
                [m.position[0], 0.18, m.position[2]],
              ]}
              color="#262c38"
              lineWidth={1}
            />
          </group>
        );
      })}
    </group>
  );
}
