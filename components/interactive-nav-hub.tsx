"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, ContactShadows, Environment, MeshDistortMaterial } from "@react-three/drei";
import { useRouter } from "next/navigation";
import * as THREE from "three";

// The points radiating from the 3D model
const navNodes = [
  { label: "ROSTER", path: "/roster", position: [2.2, 1.2, 0] as [number, number, number] },
  { label: "TEAMS", path: "/teams", position: [-2.0, 1.5, 0.5] as [number, number, number] },
  { label: "CONTENT", path: "/content", position: [0, -2.2, 1] as [number, number, number] },
  { label: "PARTNERS", path: "/partners", position: [1.8, -1.2, -1.5] as [number, number, number] },
  { label: "ABOUT", path: "/about", position: [-1.8, -0.8, -1.2] as [number, number, number] },
];

function NavNode({ 
  position, 
  label, 
  path 
}: { 
  position: [number, number, number]; 
  label: string; 
  path: string;
}) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
        // Breathing scale for the little node
        const s = hovered ? 1.6 : 1 + Math.sin(state.clock.elapsedTime * 4) * 0.15;
        meshRef.current.scale.set(s,s,s);
    }
  });

  // Calculate the path back to the origin (0,0,0) from this node's local space
  const originLine = new Float32Array([0, 0, 0, -position[0], -position[1], -position[2]]);

  return (
    <group position={position}>
      {/* Invisible connection lines linking the node back to the center model */}
      <line>
         <bufferGeometry attach="geometry">
            <bufferAttribute
               attach="attributes-position"
               count={2}
               args={[originLine, 3]}
             />
         </bufferGeometry>
         <lineBasicMaterial attach="material" color="#e60000" transparent opacity={0.4} />
      </line>

      {/* The actual clickable point */}
      <mesh 
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          router.push(path);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <octahedronGeometry args={[0.25, 0]} />
        <meshStandardMaterial 
            color={hovered ? "#ffffff" : "#e60000"} 
            emissive={hovered ? "#e60000" : "#220000"} 
            emissiveIntensity={hovered ? 2 : 0.5} 
        />
      </mesh>

      {/* The floating GUI Label */}
      <Html distanceFactor={10} position={[0, 0.5, 0]} center style={{ pointerEvents: 'none' }}>
        <div style={{
          color: hovered ? "#fff" : "rgba(255,255,255,0.7)",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          fontSize: "14px",
          fontWeight: "bold",
          transition: "all 0.2s",
          textShadow: hovered ? "0 0 12px #e60000" : "none"
        }}>
          {label}
        </div>
      </Html>
    </group>
  );
}

function HubModel() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Rotate the entire network slowly
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Red Core */}
      <mesh scale={1.2}>
        <icosahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
            color="#8c0000"
            envMapIntensity={2}
            clearcoat={1}
            metalness={0.9}
            roughness={0.1}
            distort={0.4}
            speed={2}
            emissive="#4a0000"
            emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Clickable routing points radiating from the center */}
      {navNodes.map((node) => (
         <NavNode key={node.label} {...node} />
      ))}
    </group>
  );
}

export function InteractiveNavHub() {
  return (
    <div style={{ width: "100%", height: "65vh", position: "relative", zIndex: 10, margin: "2rem 0" }}>
      <Canvas camera={{ position: [0, 0, 7.5], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={2} color="#ff0000" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#6b21a8" />
        
        <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
          <HubModel />
        </Float>
        
        <ContactShadows position={[0, -3.5, 0]} opacity={0.8} scale={15} blur={3} far={5} color="#4a0000" />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
