"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, MeshTransmissionMaterial, Sparkles, Float } from "@react-three/drei";
import * as THREE from "three";

import { Preloader } from "./preloader";
import { ImmersiveHud } from "./immersive-hud";

const WORLDS_COUNT = 4;
const SPACING = 15;

// Abstract premium geometries for the 4 sections
function Shapes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating rotation for the entire group
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* World 0: The Core (Fractured Monolith) */}
      <mesh position={[0 * SPACING, 0, 0]}>
        <icosahedronGeometry args={[2, 0]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={1.5}
          chromaticAberration={0.4}
          anisotropy={0.3}
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.1}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          color="#ff2a2a" // Deep red tint
        />
      </mesh>

      {/* World 1: Vanguard (Sleek Torus) */}
      <mesh position={[1 * SPACING, 0, 0]} rotation={[Math.PI/4, Math.PI/4, 0]}>
        <torusGeometry args={[1.6, 0.4, 64, 100]} />
        <meshPhysicalMaterial
          color="#000000"
          metalness={1}
          roughness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={2}
        />
      </mesh>

      {/* World 2: Media (Floating Orbs) */}
      <group position={[2 * SPACING, 0, 0]}>
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
          <mesh position={[-1, 1, 0]}>
            <sphereGeometry args={[0.8, 64, 64]} />
            <meshPhysicalMaterial color="#aa0000" metalness={0.9} roughness={0.1} clearcoat={1} />
          </mesh>
        </Float>
        <Float speed={1.5} rotationIntensity={2} floatIntensity={1}>
          <mesh position={[1, -0.5, 0]}>
            <sphereGeometry args={[1.2, 64, 64]} />
            <meshPhysicalMaterial color="#111111" metalness={1} roughness={0} clearcoat={1} />
          </mesh>
        </Float>
      </group>

      {/* World 3: Alliances (Diamond/Octahedron) */}
      <mesh position={[3 * SPACING, 0, 0]}>
        <octahedronGeometry args={[2, 0]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={2}
          chromaticAberration={0.8}
          anisotropy={0.5}
          color="#ffffff"
        />
      </mesh>
    </group>
  );
}

// Camera controller to lerp horizontally and respond to mouse movement
function CameraRig({ activeIndex }: { activeIndex: number }) {
  const targetX = activeIndex * SPACING;

  useFrame((state, delta) => {
    // Lerp camera X position
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      targetX,
      delta * 4
    );

    // Parallax effect based on pointer (slight movement to look premium)
    const pointerX = state.pointer.x * 2;
    const pointerY = state.pointer.y * 2;
    
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      pointerY * 1.5,
      delta * 2
    );
    
    // Look at the target
    state.camera.lookAt(
      THREE.MathUtils.lerp(state.camera.position.x, targetX, delta * 4),
      0,
      0
    );
  });

  return null;
}

export function Scene() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Wheel and Drag Logic to switch worlds
  useEffect(() => {
    let isThrottled = false;
    let touchStartX = 0;

    const handleNext = () => {
      setActiveIndex((prev) => Math.min(prev + 1, WORLDS_COUNT - 1));
    };
    const handlePrev = () => {
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    };

    const onWheel = (e: WheelEvent) => {
      if (isThrottled) return;
      if (Math.abs(e.deltaY) > 20 || Math.abs(e.deltaX) > 20) {
        if (e.deltaY > 0 || e.deltaX > 0) handleNext();
        else handlePrev();
        
        isThrottled = true;
        setTimeout(() => (isThrottled = false), 800); // 800ms cooldown for premium feel
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      
      if (diff > 50) handleNext();
      else if (diff < -50) handlePrev();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div className="immersive-canvas-wrap">
      <Preloader />
      <ImmersiveHud activeIndex={activeIndex} totalWorlds={WORLDS_COUNT} />
      
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#000000", 5, 20]} />

        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
        <spotLight position={[-5, 5, 5]} intensity={4} color="#ff0000" angle={0.5} penumbra={1} />
        
        <Shapes />
        <CameraRig activeIndex={activeIndex} />

        {/* Ambient dust */}
        <Sparkles count={200} scale={30} size={1.5} speed={0.2} opacity={0.3} color="#ff3333" />
        
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
