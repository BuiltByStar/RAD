"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Edges, Environment, Float, Lightformer, Sparkles } from "@react-three/drei";
import {
  Bloom,
  EffectComposer
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

import { ImmersiveHud } from "./immersive-hud";
import { Preloader } from "./preloader";

const WORLDS_COUNT = 4;
const SPACING = 15;

/* ─────────────────────────── hooks ─────────────────────────── */

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

function useBreakpoint(query = "(max-width: 640px)") {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

function useActiveScale(ref: RefObject<THREE.Group | null>, active: boolean, activeScale = 1.08) {
  useFrame((_, delta) => {
    if (!ref.current) return;
    const target = active ? activeScale : 1;
    const next = THREE.MathUtils.damp(ref.current.scale.x, target, 4, delta);
    ref.current.scale.setScalar(next);
  });
}

/* ─────────────────────────── materials ─────────────────────────── */

const BRAND = {
  red: "#ff2b45",
  redHi: "#ff6b7e",
  redDeep: "#8a0a1a",
  redEmber: "#4a0510",
  ink: "#080809",
  edge: "#ff3d57"
} as const;

function ChromeBody(props: { color?: string; roughness?: number }) {
  return (
    <meshPhysicalMaterial
      color={props.color ?? BRAND.ink}
      roughness={props.roughness ?? 0.22}
      metalness={0.95}
      clearcoat={1}
      clearcoatRoughness={0.15}
      reflectivity={1}
      sheen={1}
      sheenRoughness={0.4}
      sheenColor={BRAND.redDeep}
      envMapIntensity={1.1}
    />
  );
}

function EmissiveGlass(props: { color?: string; intensity?: number }) {
  return (
    <meshPhysicalMaterial
      color={props.color ?? BRAND.red}
      emissive={props.color ?? BRAND.red}
      emissiveIntensity={props.intensity ?? 2.4}
      roughness={0.15}
      metalness={0}
      transmission={0.35}
      thickness={0.25}
      transparent
      opacity={0.95}
    />
  );
}

/* ─────────────────────────── worlds ─────────────────────────── */

function CoreWorld({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const seamRef = useRef<THREE.Mesh>(null);
  const ringARef = useRef<THREE.Mesh>(null);
  const ringBRef = useRef<THREE.Mesh>(null);

  useActiveScale(groupRef, active, 1.1);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.18;
      groupRef.current.rotation.x = Math.sin(t * 0.35) * 0.05;
      groupRef.current.position.y = Math.sin(t * 0.65) * 0.12;
    }
    if (seamRef.current) {
      const mat = seamRef.current.material as THREE.MeshPhysicalMaterial;
      mat.emissiveIntensity = 2.4 + Math.sin(t * 2.6) * 0.6 + (active ? 0.8 : 0);
    }
    if (ringARef.current) ringARef.current.rotation.z += delta * 0.6;
    if (ringBRef.current) ringBRef.current.rotation.x += delta * 0.4;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.2}>
        {/* Central crystal */}
        <mesh castShadow receiveShadow>
          <icosahedronGeometry args={[1.55, 0]} />
          <ChromeBody roughness={0.18} />
          <Edges scale={1.002} threshold={1} color={BRAND.edge} />
        </mesh>

        {/* Emissive seam bar through the crystal */}
        <mesh ref={seamRef} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.055, 0.055, 4.4, 20]} />
          <EmissiveGlass intensity={active ? 3 : 2.4} />
        </mesh>
      </Float>

      {/* Orbiting rings */}
      <mesh ref={ringARef} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[2.55, 0.018, 16, 160]} />
        <meshBasicMaterial color={BRAND.red} toneMapped={false} />
      </mesh>
      <mesh ref={ringBRef} rotation={[Math.PI / 1.5, Math.PI / 3, 0]}>
        <torusGeometry args={[3.1, 0.012, 16, 160]} />
        <meshBasicMaterial color={BRAND.redHi} toneMapped={false} opacity={0.6} transparent />
      </mesh>
    </group>
  );
}

function VanguardWorld({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const pillarsRef = useRef<THREE.Group>(null);
  const beamRef = useRef<THREE.Mesh>(null);

  useActiveScale(groupRef, active, 1.06);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.1;
    }
    if (pillarsRef.current) {
      pillarsRef.current.children.forEach((child, i) => {
        child.position.y = Math.sin(t * 0.8 + i * 0.6) * 0.18;
      });
    }
    if (beamRef.current) {
      const mat = beamRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.85 + Math.sin(t * 3) * 0.15;
    }
  });

  const pillars = useMemo(
    () => [-1.8, -1.1, -0.38, 0.38, 1.1, 1.8].map((x) => ({ x, h: 3.7 - Math.abs(x) * 0.42 })),
    []
  );

  return (
    <group ref={groupRef} position={[1 * SPACING, 0, 0]}>
      <group ref={pillarsRef}>
        {pillars.map(({ x, h }, i) => (
          <mesh key={x} position={[x, 0, 0]} rotation={[0.05, 0, 0]}>
            <boxGeometry args={[0.32, h, 0.5]} />
            <ChromeBody color={i % 2 ? "#0e0e10" : "#141417"} roughness={0.28} />
            <Edges scale={1.002} threshold={15} color={i === 2 || i === 3 ? BRAND.edge : "#2a2a2e"} />
          </mesh>
        ))}
      </group>

      {/* Central emissive beam */}
      <mesh ref={beamRef} position={[0, 0, 0.6]}>
        <cylinderGeometry args={[0.04, 0.04, 3.2, 16]} />
        <meshBasicMaterial color={BRAND.red} toneMapped={false} transparent />
      </mesh>

      {/* Crest — floating dodecahedron above */}
      <Float speed={1.3} rotationIntensity={0.3} floatIntensity={0.2}>
        <mesh position={[0, 2.3, 0.1]}>
          <dodecahedronGeometry args={[0.48, 0]} />
          <ChromeBody roughness={0.2} />
          <Edges scale={1.002} threshold={1} color={BRAND.edge} />
        </mesh>
      </Float>

      {/* Base ring */}
      <mesh position={[0, -2.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.6, 0.03, 12, 96]} />
        <meshBasicMaterial color={BRAND.red} toneMapped={false} />
      </mesh>
    </group>
  );
}

function MediaWorld({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const panelsRef = useRef<THREE.Group>(null);
  const scanRef = useRef<THREE.Mesh>(null);

  useActiveScale(groupRef, active, 1.08);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
      groupRef.current.position.y = Math.sin(t * 0.55) * 0.1;
    }
    if (panelsRef.current) {
      panelsRef.current.children.forEach((child, i) => {
        child.rotation.y = THREE.MathUtils.damp(
          child.rotation.y,
          -0.42 + i * 0.42,
          3,
          delta
        );
      });
    }
    if (scanRef.current) {
      scanRef.current.position.y = ((t * 0.6) % 2.4) - 1.2;
    }
  });

  return (
    <group ref={groupRef} position={[2 * SPACING, 0, 0]}>
      <group ref={panelsRef}>
        {[-1.6, 0, 1.6].map((offset, i) => (
          <group key={offset} position={[offset, i === 1 ? 0.05 : 0, -0.12 * Math.abs(offset)]}>
            {/* Outer frame */}
            <mesh>
              <boxGeometry args={[1.35, 2.15, 0.1]} />
              <ChromeBody color={i === 1 ? "#0d0d0f" : "#111114"} roughness={0.3} />
              <Edges scale={1.002} threshold={15} color={i === 1 ? BRAND.edge : "#262628"} />
            </mesh>
            {/* Screen */}
            <mesh position={[0, 0, 0.06]}>
              <planeGeometry args={[1.1, 1.75]} />
              <meshBasicMaterial color={i === 1 ? "#330610" : "#1a0508"} toneMapped={false} />
            </mesh>
            {/* Scanning line (only on center panel) */}
            {i === 1 ? (
              <mesh ref={scanRef} position={[0, 0, 0.065]}>
                <planeGeometry args={[1.05, 0.04]} />
                <meshBasicMaterial color={BRAND.red} toneMapped={false} transparent opacity={0.9} />
              </mesh>
            ) : null}
          </group>
        ))}
      </group>

      {/* Base slab */}
      <mesh position={[0, -1.6, -0.05]}>
        <boxGeometry args={[4.2, 0.08, 0.3]} />
        <ChromeBody roughness={0.45} />
      </mesh>

      {/* Volumetric red glow under the panels */}
      <pointLight position={[0, -0.3, 0.4]} intensity={2.2} distance={3.6} color={BRAND.red} />
    </group>
  );
}

function AlliancesWorld({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useActiveScale(groupRef, active, 1.08);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y -= delta * 0.12;
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.1;
    }
    if (nodesRef.current) {
      nodesRef.current.children.forEach((child, i) => {
        const orbit = t * 0.7 + i * (Math.PI / 2);
        child.position.x = Math.cos(orbit) * 1.9;
        child.position.z = Math.sin(orbit) * 1.9;
        child.position.y = Math.sin(t * 0.9 + i) * 0.25;
      });
    }
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.4;
      coreRef.current.rotation.y += delta * 0.6;
    }
  });

  return (
    <group ref={groupRef} position={[3 * SPACING, 0, 0]}>
      {/* Central core */}
      <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.2}>
        <mesh ref={coreRef}>
          <octahedronGeometry args={[0.95, 0]} />
          <ChromeBody roughness={0.15} />
          <Edges scale={1.002} threshold={1} color={BRAND.edge} />
        </mesh>
      </Float>

      {/* Orbiting nodes */}
      <group ref={nodesRef}>
        {Array.from({ length: 4 }).map((_, i) => (
          <mesh key={i}>
            <tetrahedronGeometry args={[0.3, 0]} />
            <ChromeBody color={i % 2 ? "#0f0f11" : "#151518"} roughness={0.25} />
            <Edges scale={1.002} threshold={1} color={BRAND.edge} />
          </mesh>
        ))}
      </group>

      {/* Orbit ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.9, 0.015, 12, 128]} />
        <meshBasicMaterial color={BRAND.red} toneMapped={false} />
      </mesh>
      <mesh rotation={[Math.PI / 2.6, Math.PI / 4, 0]}>
        <torusGeometry args={[1.9, 0.008, 8, 128]} />
        <meshBasicMaterial color={BRAND.redHi} toneMapped={false} transparent opacity={0.5} />
      </mesh>
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

/* ─────────────────────────── camera ─────────────────────────── */

function CameraRig({ activeIndex, reducedMotion }: { activeIndex: number; reducedMotion: boolean }) {
  const targetX = activeIndex * SPACING;
  const target = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    const pointerX = reducedMotion ? 0 : state.pointer.x * 0.55;
    const pointerY = reducedMotion ? 0 : state.pointer.y * 0.9;
    const bob = reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 0.4) * 0.08;

    target.current.set(targetX + pointerX, pointerY + bob, 7.5 - Math.abs(state.pointer.x) * 0.22);
    const lambda = 4.5;
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, target.current.x, lambda, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, target.current.y, lambda, delta);
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, target.current.z, lambda, delta);

    // lookAt with gentle easing
    const look = new THREE.Vector3(targetX, 0, 0);
    state.camera.lookAt(look);
  });

  return null;
}

/* ─────────────────────────── render control ─────────────────────────── */

function RenderController({ shouldRender }: { shouldRender: boolean }) {
  const invalidate = useThree((s) => s.invalidate);
  const set = useThree((s) => s.set);

  useEffect(() => {
    set({ frameloop: shouldRender ? "always" : "never" });
    if (shouldRender) invalidate();
  }, [shouldRender, set, invalidate]);

  return null;
}

/* ─────────────────────────── fallback ─────────────────────────── */

function StaticFallback() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/RadRivals_Wallpaper_Red.png"
        alt="RAD worlds"
        className="absolute inset-0 h-full w-full object-cover opacity-55"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgb(255_43_69_/_0.22),transparent_60%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60">
          RAD / Worlds
        </p>
        <p className="mt-2 font-[family-name:var(--font-display)] text-2xl uppercase tracking-tight">
          Core · Vanguard · Media · Alliances
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────── root ─────────────────────────── */

export function Scene() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const wrapRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const isSmall = useBreakpoint("(max-width: 640px)");

  const shouldRender = isVisible && isTabVisible;

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

  useEffect(() => {
    const onChange = () => setIsTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, []);

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

  const dpr = useMemo<[number, number]>(() => [1, reducedMotion || isSmall ? 1.25 : 1.75], [
    reducedMotion,
    isSmall
  ]);

  // Mobile + reduced-motion path: skip Canvas entirely
  if (isSmall || reducedMotion) {
    return (
      <div
        ref={wrapRef}
        className="immersive-canvas-wrap focus-visible:outline-none"
        tabIndex={0}
        role="region"
        aria-label="RAD worlds preview"
      >
        <StaticFallback />
        <ImmersiveHud
          activeIndex={activeIndex}
          totalWorlds={WORLDS_COUNT}
          onSelect={setActiveIndex}
        />
      </div>
    );
  }

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
        shadows
        camera={{ position: [0, 0, 7.5], fov: 40 }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05
        }}
        dpr={dpr}
        frameloop={shouldRender ? "always" : "never"}
      >
        <RenderController shouldRender={shouldRender} />
        <color attach="background" args={["#040406"]} />
        <fog attach="fog" args={["#040406", 6, 28]} />

        {/* Lightformer-based cheap IBL (no HDRI download) */}
        <Environment resolution={256} frames={1}>
          <Lightformer
            form="rect"
            intensity={1.8}
            position={[-5, 3, 3]}
            rotation={[0, Math.PI / 6, 0]}
            scale={[10, 6, 1]}
            color="#ffffff"
          />
          <Lightformer
            form="rect"
            intensity={2.2}
            position={[5, -2, 2]}
            rotation={[0, -Math.PI / 4, 0]}
            scale={[6, 4, 1]}
            color={BRAND.red}
          />
          <Lightformer
            form="ring"
            intensity={1.4}
            position={[0, 4, -4]}
            scale={[4, 4, 1]}
            color={BRAND.redHi}
          />
        </Environment>

        {/* Accent lights */}
        <ambientLight intensity={0.08} />
        <directionalLight
          position={[6, 6, 4]}
          intensity={0.9}
          color="#ffffff"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <spotLight
          position={[-6, 4, 4]}
          intensity={40}
          distance={24}
          angle={0.42}
          penumbra={1}
          color={BRAND.red}
        />
        <pointLight position={[0, 0, 4]} intensity={6} distance={10} color={BRAND.redDeep} />

        <Shapes activeIndex={activeIndex} />
        <CameraRig activeIndex={activeIndex} reducedMotion={reducedMotion} />

        <Sparkles
          count={20}
          scale={[40, 14, 14]}
          size={1.4}
          speed={0.12}
          opacity={0.3}
          color={BRAND.redHi}
        />

        <EffectComposer multisampling={0} enableNormalPass={false}>
          <Bloom
            mipmapBlur
            intensity={0.6}
            luminanceThreshold={0.4}
            luminanceSmoothing={0.3}
            radius={0.8}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
