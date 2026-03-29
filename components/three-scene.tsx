"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial, ContactShadows, Sparkles, Line } from "@react-three/drei";
import * as THREE from "three";


export function Scene() {
  // Simple parallax for the background particles
  useFrame((state) => {
    const pointerX = (state.pointer.x * Math.PI) / 8;
    const pointerY = (state.pointer.y * Math.PI) / 8;
    
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
