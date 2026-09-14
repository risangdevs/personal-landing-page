"use client";
import {
  Component,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, Line } from "@react-three/drei";
import * as THREE from "three";
import { CoreMachine, ModuleNode, Conduits } from "./machine";
import { DataPackets, tracedPacketPosition } from "./packets";
import { useNavigation } from "@/stores/navigation-store";
import { systemModules, tracePath } from "@/data/system";
class RenderBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
function CameraController() {
  const { camera, pointer } = useThree();
  const target = useRef(new THREE.Vector3(0, 0.5, 0));
  const began = useRef(0);
  const lastPhase = useRef("");
  const destination = useRef(new THREE.Vector3(10, 9, 13));
  useFrame((state, delta) => {
    const nav = useNavigation.getState();
    const current = nav.phase;
    if (current !== lastPhase.current) {
      lastPhase.current = current;
      began.current = state.clock.elapsedTime;
    }
    let focus = new THREE.Vector3(0, 0.4, 0);
    let position = new THREE.Vector3(10, 9, 13);
    if (current === "entering") {
      const elapsed = state.clock.elapsedTime - began.current;
      if (elapsed < 2) {
        position.set(0, 1.7, 6 - elapsed * 2.4);
        focus.set(0, 1.1, -2);
      } else {
        position.set(10, 9, 13);
      }
    } else if (nav.selected !== "core") {
      const m = systemModules.find((m) => m.id === nav.selected)!;
      focus.set(...m.position);
      focus.y += 0.45;
      position.set(m.position[0] + 4, m.position[1] + 4.7, m.position[2] + 6.5);
    }
    if (nav.tracing) {
      focus.copy(tracedPacketPosition);
      position.set(focus.x + 4, focus.y + 4, focus.z + 7);
    }
    if (nav.reducedMotion) {
      camera.position.copy(position);
      target.current.copy(focus);
    } else {
      position.x += pointer.x * 0.22;
      position.y += pointer.y * 0.13;
      destination.current.copy(position);
      camera.position.lerp(destination.current, 1 - Math.exp(-delta * 2.2));
      target.current.lerp(focus, 1 - Math.exp(-delta * 2.8));
    }
    camera.lookAt(target.current);
  });
  return null;
}
function ExplodedScreen() {
  const phase = useNavigation((s) => s.phase);
  const group = useRef<THREE.Group>(null);
  const time = useRef(0);
  const labels = [
    "REACT UI",
    "RENDER LAYER",
    "STATE LAYER",
    "DATA LAYER",
    "WEBSOCKET",
    "MARKET FEED",
  ];
  useEffect(() => {
    time.current = 0;
  }, [phase]);
  useFrame((_, dt) => {
    if (phase !== "entering" || !group.current) return;
    time.current += dt;
    group.current.children.forEach((child, i) => {
      child.position.z =
        2 - i * 0.22 - Math.min(1, time.current / 2) * i * 0.62;
      child.position.x =
        Math.min(1, Math.max(0, time.current - 1.5) / 2) * (i - 2.5) * 1.6;
      child.rotation.y = Math.min(0.18, time.current * 0.06);
    });
  });
  if (phase !== "entering") return null;
  return (
    <group ref={group}>
      {labels.map((label, i) => (
        <group key={label} position={[0, 1.6, 2 - i * 0.22]}>
          <mesh>
            <boxGeometry args={[3.9, 2.5, 0.035]} />
            <meshStandardMaterial
              color={i === 0 ? "#171b2b" : "#262432"}
              transparent
              opacity={i === 0 ? 0.92 : 0.62}
              metalness={0.4}
              roughness={0.5}
            />
          </mesh>
          <Line
            points={[
              [-1.9, -1.2, 0.03],
              [-1.9, 1.2, 0.03],
              [1.9, 1.2, 0.03],
              [1.9, -1.2, 0.03],
              [-1.9, -1.2, 0.03],
            ]}
            color="#8b7ca7"
            transparent
            opacity={0.55}
          />
          <Html
            center
            transform
            position={[0, 0.85, 0.04]}
            distanceFactor={5}
            style={{ pointerEvents: "none" }}
          >
            <div className="exploded-label">
              0{i + 1} / {label}
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
}
function AdaptiveMonitor() {
  const { gl, setDpr, invalidate } = useThree();
  const quality = useNavigation((s) => s.quality);
  const effective = useNavigation((s) => s.effectiveQuality);
  const data = useRef({ start: 0, count: 0, slow: 0 });
  useEffect(() => {
    const nav = useNavigation.getState();
    const mobile = window.innerWidth < 768;
    const gpuLimit = gl.capabilities.maxTextureSize;
    const initial =
      mobile || gpuLimit < 4096
        ? "Low"
        : window.devicePixelRatio > 1.5
          ? "Medium"
          : "High";
    if (quality === "Auto") nav.setEffectiveQuality(initial);
  }, [gl, quality]);
  useEffect(() => {
    setDpr(
      effective === "High"
        ? Math.min(window.devicePixelRatio, 1.75)
        : effective === "Medium"
          ? 1
          : 0.7,
    );
  }, [effective, setDpr]);
  useFrame(({ clock }) => {
    const now = clock.elapsedTime;
    data.current.count++;
    if (now - data.current.start >= 2) {
      const fps = Math.round(data.current.count / (now - data.current.start));
      useNavigation.getState().setFps(fps);
      if (quality === "Auto" && fps < 40) {
        data.current.slow++;
        if (data.current.slow >= 2) {
          useNavigation.getState().setEffectiveQuality("Low");
        }
      } else data.current.slow = 0;
      data.current.start = now;
      data.current.count = 0;
    }
  });
  return null;
}
function ContextLossGuard() {
  const gl = useThree((state) => state.gl);
  useEffect(() => {
    const lost = (event: Event) => {
      event.preventDefault();
      useNavigation.getState().setMode("2d");
    };
    gl.domElement.addEventListener("webglcontextlost", lost);
    return () => gl.domElement.removeEventListener("webglcontextlost", lost);
  }, [gl]);
  return null;
}
export default function SystemScene() {
  const [visible, setVisible] = useState(true);
  const setMode = useNavigation((s) => s.setMode);
  useEffect(() => {
    const handler = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);
  return (
    <RenderBoundary onError={() => setMode("2d")}>
      <Canvas
        className="system-canvas"
        camera={{ position: [10, 9, 13], fov: 39, near: 0.1, far: 80 }}
        dpr={1}
        frameloop={visible ? "always" : "never"}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        onCreated={() => {
          useNavigation.getState().setReady(true);
        }}
        fallback={
          <p>
            3D rendering unavailable. Use Exit 3D mode to open the complete
            architecture view.
          </p>
        }
      >
        <ContextLossGuard />
        <color attach="background" args={["#08090c"]} />
        <fog attach="fog" args={["#08090c", 23, 43]} />
        <ambientLight intensity={0.7} />
        <directionalLight
          position={[3, 8, 5]}
          intensity={3.1}
          color="#e0dce9"
        />
        <directionalLight
          position={[-7, 3, -4]}
          intensity={2.8}
          color="#77759d"
        />
        <pointLight
          position={[0, 3, 0]}
          intensity={6}
          color="#ad91d0"
          distance={8}
        />
        <Suspense fallback={null}>
          <group position={[0, -0.4, 0]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
              <circleGeometry args={[8.5, 64]} />
              <meshStandardMaterial
                color="#10131a"
                metalness={0.3}
                roughness={0.72}
              />
            </mesh>
            {[3, 5.9, 8].map((radius) => (
              <mesh
                key={radius}
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, 0.002, 0]}
              >
                <ringGeometry args={[radius, radius + 0.012, 96]} />
                <meshBasicMaterial color="#252a35" side={THREE.DoubleSide} />
              </mesh>
            ))}
            <CoreMachine />
            <Conduits />
            {systemModules.map((m) => (
              <ModuleNode key={m.id} module={m} />
            ))}
            <DataPackets />
          </group>
          <ExplodedScreen />
        </Suspense>
        <CameraController />
        <AdaptiveMonitor />
      </Canvas>
    </RenderBoundary>
  );
}
