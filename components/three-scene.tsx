"use client";

import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshTransmissionMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";

import { ImmersiveHud } from "./immersive-hud";
import { Preloader } from "./preloader";

const WORLDS_COUNT = 4;
const SPACING = 15;

function useActiveScale(ref: RefObject<THREE.Group | null>, active: boolean, activeScale = 1.08) {
  useFrame((_, delta) => {
    if (!ref.current) return;
    const target = active ? activeScale : 1;
    const next = THREE.MathUtils.lerp(ref.current.scale.x, target, delta * 2.2);
    ref.current.scale.setScalar(next);
  });
}

function CoreWorld({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const orbitRef = useRef<THREE.Group>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);

  useActiveScale(groupRef, active, 1.12);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.22;
      groupRef.current.rotation.x = Math.sin(t * 0.28) * 0.08;
      groupRef.current.position.y = Math.sin(t * 0.7) * 0.22;
    }

    if (orbitRef.current) {
      orbitRef.current.rotation.y -= delta * 0.72;
      orbitRef.current.rotation.z += delta * 0.25;
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.x += delta * 0.18;
      outerRingRef.current.rotation.y -= delta * 0.3;
      const ringScale = 1 + Math.sin(t * 1.6) * 0.04;
      outerRingRef.current.scale.setScalar(ringScale);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <Float speed={1.8} rotationIntensity={0.12} floatIntensity={0.28}>
        <mesh>
          <icosahedronGeometry args={[1.95, 0]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={1.6}
            chromaticAberration={0.35}
            anisotropy={0.28}
            distortion={0.48}
            distortionScale={0.44}
            temporalDistortion={0.12}
            iridescence={1}
            iridescenceIOR={1}
            iridescenceThicknessRange={[0, 1200]}
            color="#ff3030"
          />
        </mesh>
      </Float>

      <mesh>
        <octahedronGeometry args={[0.86, 0]} />
        <meshPhysicalMaterial
          color="#140303"
          emissive="#7d0000"
          emissiveIntensity={active ? 1.65 : 1.05}
          metalness={0.92}
          roughness={0.16}
          clearcoat={1}
        />
      </mesh>

      <mesh ref={outerRingRef} rotation={[Math.PI / 2.6, 0, 0]}>
        <torusGeometry args={[3.02, 0.08, 28, 160]} />
        <meshStandardMaterial
          color="#ff5252"
          emissive="#ff1e1e"
          emissiveIntensity={active ? 1.8 : 1.2}
          metalness={0.45}
          roughness={0.12}
        />
      </mesh>

      <group ref={orbitRef}>
        {[
          [2.55, 0.1, 0.1],
          [-2.25, -0.55, 0.65],
          [0.2, 2.35, -0.55],
          [0.3, -2.1, 0.45]
        ].map((position, index) => (
          <mesh key={index} position={position as [number, number, number]} rotation={[0.4, 0.8, 0.2]}>
            <tetrahedronGeometry args={[0.34 + index * 0.05, 0]} />
            <meshStandardMaterial
              color={index % 2 === 0 ? "#ff6a6a" : "#1a1a1a"}
              emissive={index % 2 === 0 ? "#b20000" : "#2a0909"}
              emissiveIntensity={index % 2 === 0 ? 1.1 : 0.45}
              metalness={0.8}
              roughness={0.18}
            />
          </mesh>
        ))}
      </group>

      <Sparkles count={26} scale={5.4} size={2.2} speed={0.45} opacity={0.28} color="#ff4a4a" />
    </group>
  );
}

function VanguardWorld({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const ringARef = useRef<THREE.Mesh>(null);
  const ringBRef = useRef<THREE.Mesh>(null);
  const barsRef = useRef<THREE.Group>(null);

  useActiveScale(groupRef, active, 1.08);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.55) * 0.18;
      groupRef.current.rotation.y += delta * 0.16;
    }

    if (ringARef.current) {
      ringARef.current.rotation.x += delta * 0.4;
      ringARef.current.rotation.y += delta * 0.2;
    }

    if (ringBRef.current) {
      ringBRef.current.rotation.x -= delta * 0.24;
      ringBRef.current.rotation.z += delta * 0.32;
    }

    if (barsRef.current) {
      barsRef.current.rotation.y -= delta * 0.48;
      barsRef.current.children.forEach((child, index) => {
        child.position.y = Math.sin(t * 1.4 + index) * 0.18;
      });
    }
  });

  return (
    <group ref={groupRef} position={[1 * SPACING, 0, 0]}>
      <Float speed={1.3} rotationIntensity={0.2} floatIntensity={0.2}>
        <mesh rotation={[Math.PI / 5, Math.PI / 4, 0]}>
          <torusKnotGeometry args={[1.2, 0.26, 220, 32]} />
          <meshPhysicalMaterial
            color="#060606"
            metalness={1}
            roughness={0.06}
            clearcoat={1}
            clearcoatRoughness={0.08}
            envMapIntensity={2.4}
          />
        </mesh>
      </Float>

      <mesh ref={ringARef} rotation={[Math.PI / 2.1, 0.2, 0]}>
        <torusGeometry args={[2.55, 0.06, 24, 160]} />
        <meshStandardMaterial color="#ff2424" emissive="#c80000" emissiveIntensity={1.45} />
      </mesh>

      <mesh ref={ringBRef} rotation={[0.4, 0, Math.PI / 2.5]}>
        <torusGeometry args={[1.9, 0.045, 20, 120]} />
        <meshStandardMaterial color="#ffffff" emissive="#7a1717" emissiveIntensity={0.55} />
      </mesh>

      <group ref={barsRef}>
        {[0, 1, 2, 3].map((index) => {
          const angle = (index / 4) * Math.PI * 2;
          const radius = 2.45;
          return (
            <mesh
              key={index}
              position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}
              rotation={[0.2, angle, Math.PI / 6]}
            >
              <boxGeometry args={[0.22, 1.4, 0.22]} />
              <meshStandardMaterial
                color={index % 2 === 0 ? "#ff3030" : "#0f0f0f"}
                emissive={index % 2 === 0 ? "#9a0000" : "#240909"}
                emissiveIntensity={index % 2 === 0 ? 1.2 : 0.32}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

function MediaWorld({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const haloARef = useRef<THREE.Mesh>(null);
  const haloBRef = useRef<THREE.Mesh>(null);
  const satelliteRef = useRef<THREE.Group>(null);

  useActiveScale(groupRef, active, 1.1);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.9) * 0.25;
      groupRef.current.rotation.y += delta * 0.12;
    }

    if (haloARef.current) {
      haloARef.current.rotation.y += delta * 0.35;
      haloARef.current.rotation.z += delta * 0.12;
    }

    if (haloBRef.current) {
      haloBRef.current.rotation.x -= delta * 0.26;
      haloBRef.current.rotation.z -= delta * 0.2;
    }

    if (satelliteRef.current) {
      satelliteRef.current.rotation.y += delta * 0.52;
      satelliteRef.current.children.forEach((child, index) => {
        child.position.y = Math.sin(t * 1.1 + index * 1.5) * 0.26;
      });
    }
  });

  return (
    <group ref={groupRef} position={[2 * SPACING, 0, 0]}>
      <mesh>
        <sphereGeometry args={[1.12, 64, 64]} />
        <meshPhysicalMaterial
          color="#ff2d2d"
          emissive="#d30000"
          emissiveIntensity={active ? 2.1 : 1.45}
          metalness={0.6}
          roughness={0.06}
          clearcoat={1}
          transmission={0.08}
        />
      </mesh>

      <mesh ref={haloARef} rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[2.24, 0.08, 24, 160]} />
        <meshStandardMaterial color="#ff4a4a" emissive="#ff1e1e" emissiveIntensity={1.1} />
      </mesh>

      <mesh ref={haloBRef} rotation={[0.4, 0.4, Math.PI / 2]}>
        <torusGeometry args={[1.62, 0.04, 18, 120]} />
        <meshStandardMaterial color="#ffffff" emissive="#7a1515" emissiveIntensity={0.45} />
      </mesh>

      <group ref={satelliteRef}>
        {[
          { pos: [-2.4, 1, 0.2], radius: 0.62, color: "#1a1a1a", emissive: "#2a0909" },
          { pos: [2.2, -0.75, -0.4], radius: 0.78, color: "#e40000", emissive: "#a60000" },
          { pos: [0.2, 2.1, 0.55], radius: 0.4, color: "#ffffff", emissive: "#491010" }
        ].map((satellite, index) => (
          <Float key={index} speed={1.4 + index * 0.35} rotationIntensity={0.35} floatIntensity={0.5}>
            <mesh position={satellite.pos as [number, number, number]}>
              <sphereGeometry args={[satellite.radius, 48, 48]} />
              <meshPhysicalMaterial
                color={satellite.color}
                emissive={satellite.emissive}
                emissiveIntensity={satellite.color === "#1a1a1a" ? 0.4 : 0.9}
                metalness={0.8}
                roughness={0.08}
                clearcoat={1}
              />
            </mesh>
          </Float>
        ))}
      </group>

      <Sparkles count={18} scale={4.8} size={2.4} speed={0.32} opacity={0.22} color="#ff7b7b" />
    </group>
  );
}

function AlliancesWorld({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const latticeRef = useRef<THREE.Group>(null);
  const satellitesRef = useRef<THREE.Group>(null);

  useActiveScale(groupRef, active, 1.1);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.62) * 0.16;
      groupRef.current.rotation.y -= delta * 0.18;
    }

    if (latticeRef.current) {
      latticeRef.current.rotation.x += delta * 0.24;
      latticeRef.current.rotation.y -= delta * 0.18;
      latticeRef.current.rotation.z += delta * 0.12;
    }

    if (satellitesRef.current) {
      satellitesRef.current.rotation.y += delta * 0.46;
      satellitesRef.current.children.forEach((child, index) => {
        child.position.y = Math.sin(t * 0.9 + index * 1.2) * 0.2;
      });
    }
  });

  return (
    <group ref={groupRef} position={[3 * SPACING, 0, 0]}>
      <Float speed={1.15} rotationIntensity={0.1} floatIntensity={0.18}>
        <mesh>
          <octahedronGeometry args={[1.9, 0]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={2.2}
            chromaticAberration={0.5}
            anisotropy={0.45}
            distortion={0.12}
            distortionScale={0.14}
            color="#ffffff"
          />
        </mesh>
      </Float>

      <group ref={latticeRef}>
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[2.7, 0.05, 20, 120]} />
          <meshStandardMaterial color="#ff3a3a" emissive="#941111" emissiveIntensity={0.85} />
        </mesh>
        <mesh rotation={[0, Math.PI / 4, Math.PI / 4]}>
          <torusGeometry args={[2.15, 0.04, 18, 96]} />
          <meshStandardMaterial color="#fff5f5" emissive="#601313" emissiveIntensity={0.42} />
        </mesh>
      </group>

      <group ref={satellitesRef}>
        {[0, 1, 2, 3].map((index) => {
          const angle = (index / 4) * Math.PI * 2;
          const radius = 3.05;
          return (
            <mesh
              key={index}
              position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}
              rotation={[0.4, angle, 0.4]}
            >
              <octahedronGeometry args={[0.36, 0]} />
              <meshPhysicalMaterial
                color={index % 2 === 0 ? "#ffffff" : "#ff3d3d"}
                emissive={index % 2 === 0 ? "#6e1b1b" : "#a40000"}
                emissiveIntensity={index % 2 === 0 ? 0.4 : 1.05}
                metalness={0.8}
                roughness={0.12}
                clearcoat={1}
              />
            </mesh>
          );
        })}
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

function CameraRig({ activeIndex }: { activeIndex: number }) {
  const targetX = activeIndex * SPACING;

  useFrame((state, delta) => {
    const pointerX = state.pointer.x * 0.55;
    const pointerY = state.pointer.y * 1.35;
    const targetY = pointerY + Math.sin(state.clock.elapsedTime * 0.4) * 0.18;
    const targetZ = 7 - Math.abs(state.pointer.x) * 0.22;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX + pointerX, delta * 3.2);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, delta * 2.1);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, delta * 2.4);

    state.camera.lookAt(targetX, 0, 0);
  });

  return null;
}

export function Scene() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let isThrottled = false;
    let touchStartX = 0;

    const handleNext = () => {
      setActiveIndex((prev) => Math.min(prev + 1, WORLDS_COUNT - 1));
    };

    const handlePrev = () => {
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    };

    const onWheel = (event: WheelEvent) => {
      if (isThrottled) return;

      if (Math.abs(event.deltaY) > 20 || Math.abs(event.deltaX) > 20) {
        event.preventDefault();

        if (event.deltaY > 0 || event.deltaX > 0) {
          handleNext();
        } else {
          handlePrev();
        }

        isThrottled = true;
        window.setTimeout(() => {
          isThrottled = false;
        }, 760);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") handleNext();
      if (event.key === "ArrowLeft") handlePrev();
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartX = event.touches[0].clientX;
    };

    const onTouchEnd = (event: TouchEvent) => {
      const diff = touchStartX - event.changedTouches[0].clientX;

      if (diff > 50) handleNext();
      if (diff < -50) handlePrev();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <div className="immersive-canvas-wrap">
      <Preloader />
      <ImmersiveHud activeIndex={activeIndex} totalWorlds={WORLDS_COUNT} />

      <Canvas camera={{ position: [0, 0, 7], fov: 45 }} gl={{ antialias: true, powerPreference: "high-performance" }} dpr={[1, 2]}>
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#000000", 5, 26]} />

        <ambientLight intensity={0.7} />
        <directionalLight position={[6, 5, 6]} intensity={1.8} color="#ffffff" />
        <spotLight position={[-6, 5, 6]} intensity={3.6} color="#ff0000" angle={0.5} penumbra={1} />
        <pointLight position={[0, 0, 5]} intensity={1.1} color="#ff2b2b" />

        <Shapes activeIndex={activeIndex} />
        <CameraRig activeIndex={activeIndex} />

        <Sparkles count={180} scale={32} size={1.6} speed={0.18} opacity={0.22} color="#ff3333" />
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
