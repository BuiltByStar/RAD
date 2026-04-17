"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

import { ImmersiveHud } from "./immersive-hud";
import { Preloader } from "./preloader";

const WORLDS_COUNT = 4;
const SPACING = 15;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function useActiveScale(ref: RefObject<THREE.Group | null>, active: boolean, activeScale = 1.08) {
  useFrame((_, delta) => {
    if (!ref.current) return;
    const target = active ? activeScale : 1;
    const next = THREE.MathUtils.lerp(ref.current.scale.x, target, delta * 2.2);
    ref.current.scale.setScalar(next);
  });
}

function Blade({
  position,
  rotation,
  size,
  color = "#101010",
  emissive = "#050505",
  emissiveIntensity = 0.08,
  roughness = 0.82,
  metalness = 0.72
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  size: [number, number, number];
  color?: string;
  emissive?: string;
  emissiveIntensity?: number;
  roughness?: number;
  metalness?: number;
}) {
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={emissiveIntensity}
        roughness={roughness}
        metalness={metalness}
      />
    </mesh>
  );
}

function CoreWorld({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const seamRef = useRef<THREE.Group>(null);

  useActiveScale(groupRef, active, 1.1);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.14;
      groupRef.current.rotation.x = Math.sin(t * 0.35) * 0.06;
      groupRef.current.position.y = Math.sin(t * 0.7) * 0.16;
    }
    if (seamRef.current) {
      seamRef.current.rotation.y -= delta * 0.18;
      seamRef.current.position.y = Math.sin(t * 1.1) * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <Float speed={1.1} rotationIntensity={0.04} floatIntensity={0.12}>
        <group>
          <Blade position={[0, 0, 0]} rotation={[0.14, 0.18, 0.05]} size={[0.42, 4.3, 0.48]} color="#0c0c0c" roughness={0.9} />
          <Blade position={[-0.78, 0.38, -0.16]} rotation={[0.04, -0.26, 0.42]} size={[0.24, 3.6, 0.42]} color="#141414" roughness={0.86} />
          <Blade position={[0.84, -0.28, 0.18]} rotation={[0.08, 0.34, -0.42]} size={[0.24, 3.45, 0.42]} color="#171717" roughness={0.86} />
          <Blade position={[-1.15, -0.76, 0.25]} rotation={[0.1, -0.22, 0.82]} size={[0.18, 2.5, 0.34]} color="#111111" roughness={0.9} />
          <Blade position={[1.2, 0.74, -0.24]} rotation={[0.1, 0.22, -0.82]} size={[0.18, 2.5, 0.34]} color="#111111" roughness={0.9} />
        </group>
      </Float>

      <group ref={seamRef}>
        <Blade
          position={[0, 0, 0.18]}
          rotation={[0.2, 0.1, 0.02]}
          size={[0.1, 3.5, 0.1]}
          color="#780000"
          emissive="#9f0000"
          emissiveIntensity={active ? 1.05 : 0.72}
          roughness={0.3}
          metalness={0.4}
        />
        <Blade
          position={[0, 0, -0.18]}
          rotation={[0.2, 0.1, 0.02]}
          size={[0.08, 2.4, 0.08]}
          color="#a30000"
          emissive="#a30000"
          emissiveIntensity={active ? 0.95 : 0.58}
          roughness={0.26}
          metalness={0.22}
        />
      </group>
    </group>
  );
}

function VanguardWorld({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const wallRef = useRef<THREE.Group>(null);
  const outerRef = useRef<THREE.Group>(null);

  useActiveScale(groupRef, active, 1.06);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
      groupRef.current.position.y = Math.sin(t * 0.58) * 0.14;
    }
    if (wallRef.current) {
      wallRef.current.children.forEach((child, index) => {
        child.position.y = Math.sin(t * 0.82 + index * 0.5) * 0.1;
      });
    }
    if (outerRef.current) {
      outerRef.current.rotation.y -= delta * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[1 * SPACING, 0, 0]}>
      <group ref={wallRef}>
        {[-1.8, -1.1, -0.38, 0.38, 1.1, 1.8].map((offset, index) => (
          <Blade
            key={offset}
            position={[offset, 0, 0]}
            rotation={[0.08, offset * 0.08, 0]}
            size={[0.34, 3.7 - Math.abs(offset) * 0.4, 0.5]}
            color={index % 2 === 0 ? "#0f0f0f" : "#151515"}
            roughness={0.88}
            metalness={0.78}
          />
        ))}
      </group>

      <group ref={outerRef}>
        {[
          [-2.95, 0.55, 0.36],
          [2.95, -0.45, -0.22],
          [0, 1.85, -0.2],
          [0, -1.85, 0.22]
        ].map((position, index) => (
          <Blade
            key={index}
            position={position as [number, number, number]}
            rotation={[0.18, index * 0.6, index < 2 ? 0.22 : Math.PI / 2]}
            size={[0.22, 1.8, 0.34]}
            color={index % 2 === 0 ? "#180f0f" : "#111111"}
            emissive={index % 2 === 0 ? "#560000" : "#040404"}
            emissiveIntensity={index % 2 === 0 ? 0.34 : 0.05}
            roughness={0.82}
            metalness={0.8}
          />
        ))}
      </group>

      <Blade
        position={[0, 0, 0.5]}
        rotation={[0.08, 0, 0]}
        size={[0.16, 2.8, 0.16]}
        color="#760000"
        emissive="#860000"
        emissiveIntensity={active ? 0.78 : 0.52}
        roughness={0.36}
        metalness={0.42}
      />
    </group>
  );
}

function MediaWorld({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const panelsRef = useRef<THREE.Group>(null);
  const tickerRef = useRef<THREE.Group>(null);

  useActiveScale(groupRef, active, 1.08);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
      groupRef.current.position.y = Math.sin(t * 0.65) * 0.12;
    }
    if (panelsRef.current) {
      panelsRef.current.children.forEach((child, index) => {
        child.rotation.y = THREE.MathUtils.lerp(child.rotation.y, -0.42 + index * 0.42, delta * 2.2);
      });
    }
    if (tickerRef.current) {
      tickerRef.current.rotation.y -= delta * 0.18;
      tickerRef.current.children.forEach((child, index) => {
        child.position.y = Math.sin(t * 0.92 + index) * 0.08;
      });
    }
  });

  return (
    <group ref={groupRef} position={[2 * SPACING, 0, 0]}>
      <group ref={panelsRef}>
        {[-1.55, 0, 1.55].map((offset, index) => (
          <group key={offset} position={[offset, index === 1 ? 0 : 0.16, -0.1 * Math.abs(offset)]}>
            <Blade
              position={[0, 0, 0]}
              rotation={[0.06, -0.42 + index * 0.42, 0]}
              size={[1.28, 2.05, 0.14]}
              color="#0e0e0e"
              roughness={0.9}
              metalness={0.78}
            />
            <Blade
              position={[0, 0, 0.09]}
              rotation={[0.06, -0.42 + index * 0.42, 0]}
              size={[1.02, 1.6, 0.03]}
              color={index === 1 ? "#2a0707" : "#190404"}
              emissive={index === 1 ? "#6a0000" : "#3d0000"}
              emissiveIntensity={index === 1 ? 0.65 : 0.28}
              roughness={0.42}
              metalness={0.25}
            />
          </group>
        ))}
      </group>

      <group ref={tickerRef}>
        {[-2.5, -1.15, 0, 1.15, 2.5].map((offset, index) => (
          <Blade
            key={offset}
            position={[offset, 1.7 - (index % 2) * 3.4, 0.28]}
            rotation={[0.2, 0, Math.PI / 2]}
            size={[0.08, 1.2 + (index % 2) * 0.35, 0.08]}
            color={index === 2 ? "#840000" : "#141414"}
            emissive={index === 2 ? "#8f0000" : "#050505"}
            emissiveIntensity={index === 2 ? 0.72 : 0.05}
            roughness={0.76}
            metalness={0.72}
          />
        ))}
      </group>

      <Blade
        position={[0, -2.2, -0.1]}
        rotation={[0.1, 0, 0]}
        size={[3.8, 0.1, 0.18]}
        color="#111111"
        roughness={0.88}
        metalness={0.68}
      />
    </group>
  );
}

function AlliancesWorld({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Group>(null);
  const bridgeRef = useRef<THREE.Group>(null);

  useActiveScale(groupRef, active, 1.08);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y -= delta * 0.1;
      groupRef.current.position.y = Math.sin(t * 0.56) * 0.12;
    }
    if (nodesRef.current) {
      nodesRef.current.children.forEach((child, index) => {
        child.position.y = Math.sin(t * 0.84 + index * 0.9) * 0.1 + (index < 2 ? 0.7 : -0.7);
      });
    }
    if (bridgeRef.current) {
      bridgeRef.current.rotation.z = Math.sin(t * 0.38) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[3 * SPACING, 0, 0]}>
      <group ref={nodesRef}>
        {[
          [-2.1, 0.7, 0],
          [2.1, 0.7, 0],
          [-2.1, -0.7, 0],
          [2.1, -0.7, 0]
        ].map((position, index) => (
          <group key={index} position={position as [number, number, number]}>
            <Blade
              position={[0, 0, 0]}
              rotation={[0.2, index < 2 ? -0.18 : 0.18, 0]}
              size={[0.7, 1.1, 0.34]}
              color="#111111"
              roughness={0.86}
              metalness={0.74}
            />
            <mesh position={[0, 0, 0.22]}>
              <sphereGeometry args={[0.12, 20, 20]} />
              <meshStandardMaterial
                color={index % 2 === 0 ? "#770000" : "#111111"}
                emissive={index % 2 === 0 ? "#7f0000" : "#050505"}
                emissiveIntensity={index % 2 === 0 ? 0.62 : 0.06}
                roughness={0.38}
                metalness={0.5}
              />
            </mesh>
          </group>
        ))}
      </group>

      <group ref={bridgeRef}>
        <Blade
          position={[0, 0.72, 0]}
          rotation={[0.04, 0, 0]}
          size={[4.05, 0.12, 0.16]}
          color="#151515"
          roughness={0.84}
          metalness={0.7}
        />
        <Blade
          position={[0, -0.72, 0]}
          rotation={[0.04, 0, 0]}
          size={[4.05, 0.12, 0.16]}
          color="#151515"
          roughness={0.84}
          metalness={0.7}
        />
        <Blade
          position={[0, 0, 0.12]}
          rotation={[0, 0, Math.PI / 2]}
          size={[0.14, 1.52, 0.12]}
          color="#7b0000"
          emissive="#8d0000"
          emissiveIntensity={active ? 0.7 : 0.48}
          roughness={0.34}
          metalness={0.38}
        />
      </group>
    </group>
  );
}

function Shapes({ activeIndex }: { activeIndex: number }) {
  return (
    <>
      <CoreWorld active={activeIndex === 0} />
      <VanguardWorld active={activeIndex === 1} />
      <MediaWorld active={activeIndex === 2} />
      <AlliancesWorld active={activeIndex === 3} />
    </>
  );
}

function CameraRig({ activeIndex, reducedMotion }: { activeIndex: number; reducedMotion: boolean }) {
  const targetX = activeIndex * SPACING;

  useFrame((state, delta) => {
    const pointerX = reducedMotion ? 0 : state.pointer.x * 0.45;
    const pointerY = reducedMotion ? 0 : state.pointer.y * 1.05;
    const targetY = pointerY + (reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 0.4) * 0.12);
    const targetZ = 7.2 - Math.abs(state.pointer.x) * 0.16;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX + pointerX, delta * 3);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, delta * 2);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, delta * 2.2);

    state.camera.lookAt(targetX, 0, 0);
  });

  return null;
}

/**
 * Pauses R3F rendering when the scene is offscreen or the tab is hidden.
 * Uses invalidate() to tick one frame after each state change so the lerp
 * in CameraRig still resolves even under frameloop="demand".
 */
function RenderController({ shouldRender }: { shouldRender: boolean }) {
  const invalidate = useThree((s) => s.invalidate);
  const set = useThree((s) => s.set);

  useEffect(() => {
    set({ frameloop: shouldRender ? "always" : "never" });
    if (shouldRender) invalidate();
  }, [shouldRender, set, invalidate]);

  return null;
}

export function Scene() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const wrapRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const shouldRender = isVisible && isTabVisible;

  // IntersectionObserver — only render when this section is on screen
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "120px", threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Tab visibility — pause when backgrounded
  useEffect(() => {
    const onChange = () => setIsTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, []);

  // Keyboard only when the canvas wrapper has focus.
  // NO window-level wheel trap (that broke page scroll before).
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const next = () => setActiveIndex((p) => Math.min(p + 1, WORLDS_COUNT - 1));
    const prev = () => setActiveIndex((p) => Math.max(p - 1, 0));

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        next();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        prev();
      }
    };

    // Touch swipe — only inside the canvas
    let touchStartX = 0;
    const onTouchStart = (event: TouchEvent) => {
      touchStartX = event.touches[0].clientX;
    };
    const onTouchEnd = (event: TouchEvent) => {
      const diff = touchStartX - event.changedTouches[0].clientX;
      if (diff > 50) next();
      else if (diff < -50) prev();
    };

    el.addEventListener("keydown", onKey);
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("keydown", onKey);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  const dpr = useMemo<[number, number]>(() => [1, reducedMotion ? 1.25 : 2], [reducedMotion]);

  return (
    <div
      ref={wrapRef}
      className="immersive-canvas-wrap focus-visible:outline-none"
      tabIndex={0}
      role="region"
      aria-label="RAD worlds interactive 3D scene"
    >
      <Preloader />
      <ImmersiveHud
        activeIndex={activeIndex}
        totalWorlds={WORLDS_COUNT}
        onSelect={setActiveIndex}
      />

      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 42 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        dpr={dpr}
        frameloop={shouldRender ? "always" : "never"}
      >
        <RenderController shouldRender={shouldRender} />
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#000000", 5, 24]} />

        <ambientLight intensity={0.55} />
        <directionalLight position={[6, 5, 6]} intensity={1.5} color="#ffffff" />
        <spotLight position={[-6, 5, 6]} intensity={2.4} color="#a40000" angle={0.48} penumbra={1} />
        <pointLight position={[0, 0, 5]} intensity={0.7} color="#700000" />

        <Shapes activeIndex={activeIndex} />
        <CameraRig activeIndex={activeIndex} reducedMotion={reducedMotion} />

        {!reducedMotion && (
          <Sparkles count={36} scale={28} size={1.1} speed={0.1} opacity={0.06} color="#ff2d2d" />
        )}
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
