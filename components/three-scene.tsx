"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

export function Scene() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Animate the monolith based on mouse position
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Gentle floating and rotation
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(t / 4) / 4;
    meshRef.current.rotation.y = t / 4;
    meshRef.current.position.y = Math.sin(t / 1.5) / 10;
    
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

      {/* Main Geometry: "Obsidian Monolith" */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={hovered ? 1.05 : 1}
        >
          {/* Icosahedron creates a nice crystalline gem shape */}
          <icosahedronGeometry args={[2, 0]} />
          
          <MeshDistortMaterial
            color="#080808"
            envMapIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.9}
            roughness={0.1}
            distort={0.2}
            speed={2}
          />
        </mesh>
      </Float>

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

      <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
      <Environment preset="city" />
    </>
  );
}
