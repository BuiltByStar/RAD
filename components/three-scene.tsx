"use client";

import Link from "next/link";
import { startTransition, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const STAGE_ITEMS = [
  {
    title: "About",
    subtitle: "Org identity, timeline, and why RAD is built to scale.",
    href: "/about"
  },
  {
    title: "Roster",
    subtitle: "Current lineup, championship core, and competitive depth.",
    href: "/roster"
  },
  {
    title: "Content",
    subtitle: "Editorial, broadcasts, and long-form platform storytelling.",
    href: "/content"
  },
  {
    title: "Activations",
    subtitle: "Brand-ready inventory, campaigns, and future partnerships.",
    href: "/partners"
  }
] as const;

const SPACING = 3.4;

function StageObjects({ activeIndex }: { activeIndex: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = activeIndex * 0.18;

  useFrame((state, delta) => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotation,
      delta * 2.4
    );
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.08;
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.4} floatIntensity={0.5} rotationIntensity={0.35}>
        <mesh position={[-SPACING, 0.1, 0]}>
          <icosahedronGeometry args={[0.95, 0]} />
          <meshStandardMaterial color="#ff1818" metalness={0.7} roughness={0.22} emissive="#420000" />
        </mesh>
      </Float>

      <Float speed={1.1} floatIntensity={0.45} rotationIntensity={0.2}>
        <mesh position={[0, -0.1, 0]} rotation={[0.65, 0.8, 0]}>
          <torusKnotGeometry args={[0.8, 0.22, 160, 24]} />
          <meshStandardMaterial color="#f7f7f7" metalness={0.9} roughness={0.1} emissive="#140909" />
        </mesh>
      </Float>

      <Float speed={1.6} floatIntensity={0.55} rotationIntensity={0.4}>
        <mesh position={[SPACING, 0.12, 0]}>
          <octahedronGeometry args={[1.05, 0]} />
          <meshStandardMaterial color="#0d0d0d" metalness={0.55} roughness={0.28} emissive="#2d0000" />
        </mesh>
      </Float>

      <Float speed={1.3} floatIntensity={0.6} rotationIntensity={0.3}>
        <mesh position={[SPACING * 2, -0.18, 0]} rotation={[0.2, 0.45, 0.75]}>
          <capsuleGeometry args={[0.55, 1.25, 10, 20]} />
          <meshStandardMaterial color="#ff3a3a" metalness={0.8} roughness={0.16} emissive="#320000" />
        </mesh>
      </Float>
    </group>
  );
}

function CameraRig({ activeIndex }: { activeIndex: number }) {
  const targetX = activeIndex * SPACING;

  useFrame((state, delta) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, delta * 2.8);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 0.18, delta * 1.8);
    state.camera.lookAt(targetX, 0, 0);
  });

  return null;
}

export function Scene() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="rad-stage">
      <div className="rad-stage__canvas">
        <Canvas camera={{ position: [0, 0.2, 5.6], fov: 34 }} dpr={[1, 1.5]} gl={{ antialias: true }}>
          <color attach="background" args={["#050505"]} />
          <fog attach="fog" args={["#050505", 5, 12]} />
          <ambientLight intensity={0.9} />
          <directionalLight position={[4, 5, 5]} intensity={2.2} color="#ffffff" />
          <pointLight position={[-2, 1.5, 3]} intensity={14} color="#ff0000" distance={12} />
          <pointLight position={[2, -1, 2]} intensity={4} color="#ffffff" distance={10} />
          <StageObjects activeIndex={activeIndex} />
          <CameraRig activeIndex={activeIndex} />
        </Canvas>
      </div>

      <div className="rad-stage__controls" aria-label="Stage destinations">
        {STAGE_ITEMS.map((item, index) => (
          <Link
            key={item.title}
            href={item.href}
            className={`rad-stage__control${index === activeIndex ? " is-active" : ""}`}
            onMouseEnter={() => startTransition(() => setActiveIndex(index))}
            onFocus={() => startTransition(() => setActiveIndex(index))}
          >
            <span className="rad-stage__control-title">{item.title}</span>
            <span className="rad-stage__control-copy">{item.subtitle}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
