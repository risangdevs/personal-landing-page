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
  color = "#181c19",
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

function MarketFeedReceiverArray({ active }: { active: boolean }) {
  const signalRings = useRef<Array<THREE.Mesh | null>>([]);

  useFrame(({ clock }) => {
    const reducedMotion = useNavigation.getState().reducedMotion;
    signalRings.current.forEach((ring, index) => {
      if (!ring) return;
      const material = ring.material as THREE.MeshBasicMaterial;
      if (reducedMotion) {
        ring.scale.setScalar(1);
        material.opacity = active ? 0.5 : 0.28;
        return;
      }
      const progress = (clock.elapsedTime * 0.55 + index * 0.28) % 1;
      ring.scale.setScalar(0.7 + progress * 0.85);
      material.opacity = (active ? 0.62 : 0.32) * (1 - progress);
    });
  });

  return (
    <group>
      <MetalBox
        position={[0, 0.13, 0]}
        size={[1.22, 0.12, 0.88]}
        color="#202620"
      />
      {[-0.42, 0, 0.42].map((x, index) => (
        <group key={x} position={[x, 0, 0.02]}>
          {[0, 1, 2, 3].map((dot) => (
            <mesh
              key={dot}
              position={[x * 0.15 * (1 - dot / 3), 0.23, -0.52 + dot * 0.13]}
            >
              <boxGeometry args={[0.035, 0.025, 0.06]} />
              <meshBasicMaterial
                color="#8eddb5"
                transparent
                opacity={0.32 + dot * 0.12}
              />
            </mesh>
          ))}
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.065, 0.095, 0.62, 12]} />
            <meshStandardMaterial
              color="#586a65"
              metalness={0.8}
              roughness={0.28}
            />
          </mesh>
          <mesh position={[0, 0.22, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.11, 0.025, 8, 24]} />
            <meshStandardMaterial
              color="#2c5441"
              emissive="#8eddb5"
              emissiveIntensity={active ? 0.65 : 0.28}
              metalness={0.55}
              roughness={0.3}
            />
          </mesh>
          <mesh position={[0, 0.83, 0]}>
            <sphereGeometry args={[0.075, 10, 10]} />
            <meshStandardMaterial
              color="#a1d3b8"
              emissive="#8eddb5"
              emissiveIntensity={active ? 1.1 : 0.55}
            />
          </mesh>
          <mesh
            ref={(node) => {
              signalRings.current[index] = node;
            }}
            position={[0, 0.83, 0]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <torusGeometry args={[0.13, 0.014, 6, 28]} />
            <meshBasicMaterial
              color="#8eddb5"
              transparent
              opacity={0.35}
              depthWrite={false}
            />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 0.24, 0.08]}>
        <cylinderGeometry args={[0.13, 0.13, 0.1, 6]} />
        <meshStandardMaterial
          color="#2c5441"
          emissive="#8eddb5"
          emissiveIntensity={active ? 0.55 : 0.22}
          metalness={0.55}
          roughness={0.35}
        />
      </mesh>
      <Line
        points={[
          [0, 0.22, 0.08],
          [0.38, 0.22, -0.34],
          [0.72, 0.22, -0.64],
        ]}
        color="#8eddb5"
        transparent
        opacity={active ? 0.72 : 0.42}
        lineWidth={1.4}
      />
      {[
        [0.42, 0.24, -0.38],
        [0.66, 0.24, -0.59],
      ].map((position, index) => (
        <mesh
          key={index}
          position={position as [number, number, number]}
          rotation={[0, -0.72, 0]}
        >
          <boxGeometry args={[0.1, 0.04, 0.06]} />
          <meshBasicMaterial color="#a1d3b8" />
        </mesh>
      ))}
      <Html
        position={[0, 0.205, 0.39]}
        rotation={[-Math.PI / 2, 0, 0]}
        center
        transform
        distanceFactor={5.2}
        style={{ pointerEvents: "none" }}
      >
        <span className="receiver-array-label">FEED / 03 CHANNELS</span>
      </Html>
    </group>
  );
}

function WebSocketGateway({ active }: { active: boolean }) {
  const packets = useRef<Array<THREE.Mesh | null>>([]);
  const gates = useRef<Array<THREE.Mesh | null>>([]);

  useFrame(({ clock }) => {
    const reducedMotion = useNavigation.getState().reducedMotion;
    const elapsed = clock.elapsedTime;

    packets.current.forEach((packet, index) => {
      if (!packet) return;
      if (reducedMotion) {
        packet.position.x = index === 0 ? -0.22 : 0.22;
        return;
      }
      const progress = (elapsed * (active ? 0.72 : 0.42) + index * 0.48) % 1;
      packet.position.x =
        index === 0 ? -0.72 + progress * 1.44 : 0.72 - progress * 1.44;
    });

    gates.current.forEach((gate, index) => {
      if (!gate) return;
      const material = gate.material as THREE.MeshBasicMaterial;
      const pulse = reducedMotion
        ? 0.5
        : (Math.sin(elapsed * 2.2 - index * 0.72) + 1) / 2;
      material.opacity = 0.16 + pulse * (active ? 0.5 : 0.24);
      gate.scale.setScalar(1 + pulse * 0.045);
    });
  });

  return (
    <group>
      <MetalBox
        position={[0, 0.13, 0]}
        size={[1.38, 0.12, 0.82]}
        color="#202620"
      />
      {[-0.7, 0.7].map((x) => (
        <group key={x}>
          {[-0.31, 0.31].map((z) => (
            <MetalBox
              key={z}
              position={[x, 0.5, z]}
              size={[0.1, 0.65, 0.1]}
              color="#586a61"
            />
          ))}
          <MetalBox
            position={[x, 0.82, 0]}
            size={[0.1, 0.1, 0.72]}
            color="#586a61"
          />
        </group>
      ))}
      {[-0.34, 0, 0.34].map((x, index) => (
        <group key={x} position={[x, 0.53, 0]}>
          <mesh rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[0.32, 0.045, 8, 28]} />
            <meshStandardMaterial
              color="#7f9186"
              metalness={0.82}
              roughness={0.23}
            />
          </mesh>
          <mesh
            ref={(node) => {
              gates.current[index] = node;
            }}
            rotation={[0, Math.PI / 2, 0]}
          >
            <torusGeometry args={[0.255, 0.012, 6, 28]} />
            <meshBasicMaterial
              color="#8eddb5"
              transparent
              opacity={0.3}
              depthWrite={false}
            />
          </mesh>
        </group>
      ))}
      <Line
        points={[
          [-0.76, 0.53, 0],
          [0.76, 0.53, 0],
        ]}
        color="#8eddb5"
        transparent
        opacity={active ? 0.7 : 0.34}
        lineWidth={1.25}
      />
      {[0.09, -0.09].map((z, index) => (
        <mesh
          key={z}
          ref={(node) => {
            packets.current[index] = node;
          }}
          position={[index === 0 ? -0.35 : 0.35, 0.53, z]}
        >
          <boxGeometry args={[0.13, 0.075, 0.075]} />
          <meshStandardMaterial
            color={index === 0 ? "#a1d3b8" : "#f0f2ed"}
            emissive={index === 0 ? "#8eddb5" : "#7f9186"}
            emissiveIntensity={active ? 0.9 : 0.42}
          />
        </mesh>
      ))}
      <mesh position={[0.5, 0.23, 0.31]}>
        <sphereGeometry args={[0.045, 10, 10]} />
        <meshStandardMaterial
          color="#a1d3b8"
          emissive="#8eddb5"
          emissiveIntensity={active ? 1.2 : 0.6}
        />
      </mesh>
      <Html
        position={[-0.1, 0.205, 0.36]}
        rotation={[-Math.PI / 2, 0, 0]}
        center
        transform
        distanceFactor={5.2}
        style={{ pointerEvents: "none" }}
      >
        <span className="gateway-status-label">SOCKET / OPEN</span>
      </Html>
    </group>
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
        color="#202620"
      />
      <MetalBox position={[0, 0.04, 0]} size={[2.12, 0.15, 1.82]} />
      {[-0.82, 0.82].map((x) => (
        <group key={x} position={[x, 0.65, 0]}>
          {Array.from({ length: 11 }, (_, i) => (
            <MetalBox
              key={i}
              position={[0, 0, -0.75 + i * 0.15]}
              size={[0.38, 1.18, 0.05]}
              color="#202620"
            />
          ))}
        </group>
      ))}
      <MetalBox
        position={[0, 1.29, 0]}
        size={[2.12, 0.17, 1.82]}
        color="#202620"
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
              color="#9ca69f"
              metalness={0.75}
              roughness={0.35}
            />
          </mesh>
        ))}
        <mesh>
          <cylinderGeometry args={[0.26, 0.26, 0.83, 12]} />
          <meshStandardMaterial
            color="#202620"
            emissive="#7f9186"
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
            color="#7f9186"
          />
        )),
      )}
      <mesh position={[0, 0.67, 0.92]}>
        <planeGeometry args={[1.14, 0.74]} />
        <meshStandardMaterial color="#0d0f0e" metalness={0.1} roughness={0.5} />
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
          color="#101411"
          emissive="#586a61"
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
        color={selected ? "#2b342e" : "#181c19"}
      />
      {module.id === "feed" ? (
        <MarketFeedReceiverArray active={selected} />
      ) : module.id === "socket" ? (
        <WebSocketGateway active={selected} />
      ) : module.id === "data" || module.id === "state" ? (
        <group>
          {[0, 1, 2, 3].map((i) => (
            <group key={i}>
              <MetalBox
                position={[0, 0.2 + i * 0.19, 0]}
                size={[module.id === "data" ? 1.13 : 0.85, 0.1, 0.8]}
                color={i % 2 ? "#202620" : "#202620"}
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
            color="#202620"
          />
          <mesh position={[0, 0.54, 0.163]}>
            <planeGeometry args={[1.08, 0.56]} />
            <meshStandardMaterial color="#0d0f0e" />
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
              color="#586a61"
            />
          ))}
        </group>
      ) : (
        <group rotation={[-0.2, 0, 0]}>
          <MetalBox
            position={[0, 0.67, 0]}
            size={[0.66, 1.18, 0.12]}
            color="#2b342e"
          />
          <mesh position={[0, 0.69, 0.067]}>
            <planeGeometry args={[0.54, 0.97]} />
            <meshStandardMaterial
              color="#141815"
              emissive="#202620"
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
            color="#9ca69f"
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
            <Line points={[a, mid, b]} color="#202620" lineWidth={2} />
            <Line
              points={[
                [0, 0.18, 0],
                [m.position[0] * 0.55, 0.18, m.position[2] * 0.55],
                [m.position[0], 0.18, m.position[2]],
              ]}
              color="#181c19"
              lineWidth={1}
            />
          </group>
        );
      })}
    </group>
  );
}
