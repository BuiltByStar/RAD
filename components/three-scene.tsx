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
  const outerRingRef = useRef<THREE.Mesh>(null);
  const innerBandRef = useRef<THREE.Mesh>(null);

  useActiveScale(groupRef, active, 1.12);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.22;
      groupRef.current.rotation.x = Math.sin(t * 0.28) * 0.08;
      groupRef.current.position.y = Math.sin(t * 0.7) * 0.22;
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.x += delta * 0.18;
      outerRingRef.current.rotation.y -= delta * 0.3;
      const ringScale = 1 + Math.sin(t * 1.6) * 0.04;
      outerRingRef.current.scale.setScalar(ringScale);
    }

    if (innerBandRef.current) {
      innerBandRef.current.rotation.y -= delta * 0.16;
      innerBandRef.current.rotation.z += delta * 0.08;
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
        <torusGeometry args={[3.02, 0.11, 32, 180]} />
        <meshStandardMaterial
          color="#121212"
          emissive="#020202"
          emissiveIntensity={active ? 0.12 : 0.05}
          metalness={0.84}
          roughness={0.72}
        />
      </mesh>

      <mesh ref={innerBandRef} rotation={[0.4, 0.1, Math.PI / 2.2]}>
        <torusGeometry args={[2.28, 0.045, 18, 140]} />
        <meshStandardMaterial
          color="#1b1b1b"
          emissive="#050505"
          emissiveIntensity={0.08}
          metalness={0.88}
          roughness={0.64}
        />
      </mesh>

      <Sparkles count={26} scale={5.4} size={2.2} speed={0.45} opacity={0.28} color="#ff4a4a" />
    </group>
  );
}

function VanguardWorld({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const barsRef = useRef<THREE.Group>(null);
  const spineRef = useRef<THREE.Group>(null);

  useActiveScale(groupRef, active, 1.08);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.55) * 0.18;
      groupRef.current.rotation.y += delta * 0.16;
    }

    if (barsRef.current) {
      barsRef.current.rotation.y -= delta * 0.48;
      barsRef.current.children.forEach((child, index) => {
        child.position.y = Math.sin(t * 1.4 + index) * 0.18;
      });
    }

    if (spineRef.current) {
      spineRef.current.rotation.y += delta * 0.12;
      spineRef.current.rotation.z = Math.sin(t * 0.8) * 0.06;
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

      <group ref={spineRef}>
        {[-1.05, -0.35, 0.35, 1.05].map((offset, index) => (
          <mesh key={offset} position={[offset, 0, 0]} rotation={[0.2, 0.4, 0.2]}>
            <boxGeometry args={[0.24, 3.3 - index * 0.28, 0.24]} />
            <meshStandardMaterial
              color={index % 2 === 0 ? "#0c0c0c" : "#181818"}
              emissive="#040404"
              emissiveIntensity={0.05}
              metalness={0.76}
              roughness={0.7}
            />
          </mesh>
        ))}
      </group>

      <group ref={barsRef}>
        {[0, 1, 2, 3, 4, 5].map((index) => {
          const angle = (index / 6) * Math.PI * 2;
          const radius = 2.65;
          return (
            <mesh
              key={index}
              position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}
              rotation={[0.28, angle, Math.PI / 8]}
            >
              <boxGeometry args={[0.22, 1.9, 0.28]} />
              <meshStandardMaterial
                color={index % 3 === 0 ? "#280707" : "#101010"}
                emissive={index % 3 === 0 ? "#6d0000" : "#030303"}
                emissiveIntensity={index % 3 === 0 ? 0.55 : 0.04}
                metalness={0.82}
                roughness={0.68}
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
  const frameRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Group>(null);
  const signalRef = useRef<THREE.Group>(null);

  useActiveScale(groupRef, active, 1.1);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.9) * 0.25;
      groupRef.current.rotation.y += delta * 0.12;
    }

    if (frameRef.current) {
      frameRef.current.rotation.y += delta * 0.22;
      frameRef.current.rotation.z = Math.sin(t * 0.55) * 0.04;
    }

    if (screenRef.current) {
      screenRef.current.rotation.y -= delta * 0.16;
    }

    if (signalRef.current) {
      signalRef.current.rotation.y += delta * 0.36;
      signalRef.current.children.forEach((child, index) => {
        child.position.y = Math.sin(t * 0.95 + index * 1.1) * 0.18;
      });
    }
  });

  return (
    <group ref={groupRef} position={[2 * SPACING, 0, 0]}>
      <group ref={frameRef}>
        <mesh rotation={[0.18, 0.42, 0]}>
          <boxGeometry args={[3.4, 2.1, 0.18]} />
          <meshStandardMaterial color="#101010" metalness={0.88} roughness={0.72} />
        </mesh>
        <mesh position={[0, 0, 0.12]} rotation={[0.18, 0.42, 0]}>
          <boxGeometry args={[2.82, 1.58, 0.05]} />
          <meshStandardMaterial
            color="#390707"
            emissive="#790000"
            emissiveIntensity={active ? 0.95 : 0.58}
            metalness={0.22}
            roughness={0.34}
          />
        </mesh>
      </group>

      <group ref={screenRef}>
        {[-1.5, 0, 1.5].map((offset, index) => (
          <mesh
            key={offset}
            position={[offset, index === 1 ? -0.15 : 0.55 - index * 0.2, -0.45 + index * 0.12]}
            rotation={[0.12, -0.38 + index * 0.22, 0]}
          >
            <boxGeometry args={[0.82, 1.55, 0.06]} />
            <meshStandardMaterial
              color={index === 1 ? "#141414" : "#0f0f0f"}
              emissive={index === 1 ? "#5f0000" : "#2a0808"}
              emissiveIntensity={index === 1 ? 0.62 : 0.2}
              metalness={0.62}
              roughness={0.58}
            />
          </mesh>
        ))}
      </group>

      <group ref={signalRef}>
        {[0, 1, 2].map((index) => {
          const angle = (index / 3) * Math.PI * 2;
          const radius = 2.55;
          return (
            <mesh key={index} position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]} rotation={[0.6, angle, 0]}>
              <boxGeometry args={[0.18, 1.28, 0.18]} />
              <meshStandardMaterial
                color={index === 0 ? "#7a0000" : "#141414"}
                emissive={index === 0 ? "#8e0000" : "#050505"}
                emissiveIntensity={index === 0 ? 0.7 : 0.08}
                metalness={0.8}
                roughness={0.66}
              />
            </mesh>
          );
        })}
      </group>

      <Sparkles count={16} scale={4.8} size={1.8} speed={0.28} opacity={0.18} color="#ff5a5a" />
    </group>
  );
}

function AlliancesWorld({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const linkRef = useRef<THREE.Group>(null);
  const nodeRef = useRef<THREE.Group>(null);

  useActiveScale(groupRef, active, 1.1);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.62) * 0.16;
      groupRef.current.rotation.y -= delta * 0.18;
    }

    if (linkRef.current) {
      linkRef.current.rotation.y -= delta * 0.12;
      linkRef.current.rotation.x = Math.sin(t * 0.48) * 0.08;
    }

    if (nodeRef.current) {
      nodeRef.current.rotation.y += delta * 0.24;
      nodeRef.current.children.forEach((child, index) => {
        child.position.y = Math.sin(t * 0.88 + index * 0.9) * 0.14;
      });
    }
  });

  return (
    <group ref={groupRef} position={[3 * SPACING, 0, 0]}>
      <group ref={linkRef}>
        <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.15}>
          <mesh position={[-1.28, 0, 0]} rotation={[0.4, 0.2, Math.PI / 2.3]}>
            <torusGeometry args={[1.22, 0.22, 28, 120]} />
            <meshStandardMaterial color="#121212" metalness={0.9} roughness={0.64} />
          </mesh>
        </Float>
        <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.15}>
          <mesh position={[1.28, 0, 0]} rotation={[0.4, -0.2, Math.PI / 2.3]}>
            <torusGeometry args={[1.22, 0.22, 28, 120]} />
            <meshStandardMaterial color="#171717" metalness={0.9} roughness={0.64} />
          </mesh>
        </Float>
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.14, 0.14, 2.15, 18]} />
          <meshStandardMaterial color="#6f0000" emissive="#7f0000" emissiveIntensity={active ? 0.88 : 0.56} metalness={0.55} roughness={0.34} />
        </mesh>
      </group>

      <group ref={nodeRef}>
        {[
          [-3.1, 0.25, 0.2],
          [3.1, -0.15, -0.25],
          [0, 2.3, 0.18],
          [0, -2.25, -0.22]
        ].map((position, index) => (
          <mesh key={index} position={position as [number, number, number]}>
            <sphereGeometry args={[0.28 + (index % 2) * 0.04, 28, 28]} />
            <meshPhysicalMaterial
              color={index < 2 ? "#0f0f0f" : "#8a0000"}
              emissive={index < 2 ? "#050505" : "#8a0000"}
              emissiveIntensity={index < 2 ? 0.08 : 0.58}
              metalness={0.78}
              roughness={0.32}
              clearcoat={1}
            />
          </mesh>
        ))}
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
