"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial, ContactShadows, Sparkles, Line } from "@react-three/drei";
import * as THREE from "three";

function Lightning() {
  const lightRef = useRef<THREE.PointLight>(null);
  
  useFrame(() => {
    if (!lightRef.current) return;
    // 1-2% chance every frame for a flash
    if (Math.random() > 0.96) {
      lightRef.current.intensity = 20 + Math.random() * 30; // Stronger flash!
    } else {
      lightRef.current.intensity = THREE.MathUtils.lerp(lightRef.current.intensity, 0, 0.3);
    }
  });

  return (
    <pointLight 
      ref={lightRef} 
      position={[-5, 8, -5]} 
      color="#d8b4fe" 
      distance={50} 
      decay={2}
      intensity={0}
    />
  );
}

function CrackedMonolith({ hovered }: { hovered: boolean }) {
  const innerRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Abstract, volatile rotations inside
    if (innerRef.current) {
        innerRef.current.rotation.y = -t * 0.8;
        innerRef.current.rotation.x = t * 0.4;
    }
    // Glitchy wireframe pulse
    if (wireRef.current) {
        wireRef.current.rotation.y = t * 1.2;
        // erratic jittering scale
        const s = 1.05 + Math.random() * 0.03; 
        wireRef.current.scale.set(s, s, s);
    }
  });

  const activeScale = hovered ? 1.05 : 1;

  return (
    <group scale={activeScale}>
        {/* The unstable energy core */}
        <mesh ref={innerRef} scale={0.75}>
            <octahedronGeometry args={[2, 0]} />
            <MeshDistortMaterial
                color="#e60000"
                envMapIntensity={2}
                clearcoat={1}
                metalness={1}
                roughness={0.2}
                distort={0.5}
                speed={8}
                emissive="#e60000"
                emissiveIntensity={0.8}
            />
        </mesh>
        
        {/* Dark fractured shell */}
        <mesh ref={outerRef}>
          <icosahedronGeometry args={[2.1, 0]} />
          <MeshDistortMaterial
            color="#040008"
            envMapIntensity={1}
            clearcoat={1}
            metalness={0.9}
            roughness={0.1}
            distort={0.2}
            speed={2}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Crackling wireframe envelope */}
        <mesh ref={wireRef} scale={1.05}>
          <icosahedronGeometry args={[2.2, 1]} />
          <meshBasicMaterial color="#d8b4fe" wireframe transparent opacity={0.25} />
        </mesh>
    </group>
  );
}

export function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Animate the monolith based on mouse AND scroll position
  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Parallax floating and rotation
    const t = state.clock.getElapsedTime();
    const scrollY = window.scrollY || 0;
    
    // As the user scrolls down, the monolith rotates slightly and floats dynamically
    groupRef.current.rotation.x = Math.sin(t / 4) / 4 + scrollY * 0.0005;
    groupRef.current.rotation.y = t / 4 + scrollY * 0.001;
    groupRef.current.position.y = Math.sin(t / 1.5) / 10 + scrollY * 0.001; // Shifts up as we scroll!
    
    // Parallax effect with mouse
    const pointerX = (state.pointer.x * Math.PI) / 8;
    const pointerY = (state.pointer.y * Math.PI) / 8;
    
    // Smooth interpolation towards pointer
    state.camera.position.x += (pointerX - state.camera.position.x) * 0.05;
    state.camera.position.y += (pointerY - state.camera.position.y) * 0.05;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <color attach="background" args={["#010101"]} />
      
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
      <spotLight position={[-10, 10, -10]} intensity={2.5} color="#e60000" angle={0.5} penumbra={1} />
      <spotLight position={[10, -10, 10]} intensity={2.0} color="#6b21a8" angle={0.5} penumbra={1} />

      <Lightning />

      {/* Main Geometry: "Cracked Monolith" */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1} position={[2.5, -0.5, -2]}>
        <group
          ref={groupRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <CrackedMonolith hovered={hovered} />
        </group>
      </Float>

      {/* Sparkles / Ambient Particles */}
      <Sparkles count={150} scale={15} size={3} speed={0.4} opacity={0.3} color="#e60000" />
      <Sparkles count={80} scale={20} size={5} speed={0.2} opacity={0.4} color="#6b21a8" />

      {/* Floating shards */}
      {Array.from({ length: 15 }).map((_, i) => (
        <Float
          key={i}
          speed={1.5}
          rotationIntensity={2}
          floatIntensity={2}
          position={[
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 5 - 5, // Push back
          ]}
        >
          <mesh scale={Math.random() * 0.3 + 0.1}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial 
              color="#111" 
              metalness={0.8} 
              roughness={0.2} 
              emissive={Math.random() > 0.7 ? "#e60000" : "#000"} 
              emissiveIntensity={2}
            />
          </mesh>
        </Float>
      ))}

      {/* Static shadow under the entire scene */}
      <ContactShadows position={[0, -4, 0]} opacity={0.6} scale={20} blur={2.5} far={4.5} color="#000000" />
      <Environment preset="city" />
    </>
  );
}
