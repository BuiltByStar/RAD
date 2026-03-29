"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, ContactShadows, Environment, MeshDistortMaterial, Text3D, Center } from "@react-three/drei";
import { useRouter } from "next/navigation";
import * as THREE from "three";

// The points radiating from the 3D model (Positioned wider and forward to avoid text clipping)
const navNodes = [
  { label: "ROSTER", path: "/roster", position: [3.2, 1.8, 0.5] as [number, number, number] },
  { label: "TEAMS", path: "/teams", position: [-3.4, 1.8, 0.6] as [number, number, number] },
  { label: "CONTENT", path: "/content", position: [0, -2.5, 0.8] as [number, number, number] },
  { label: "PARTNERS", path: "/partners", position: [2.8, -1.8, 0.4] as [number, number, number] },
  { label: "ABOUT", path: "/about", position: [-3.0, -1.5, 0.3] as [number, number, number] },
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

      {/* The actual clickable geometric component */}
      <group 
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
        {/* Core Jewel */}
        <mesh>
          <icosahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial 
              color={hovered ? "#ffffff" : "#e60000"} 
              metalness={0.9}
              roughness={0.1}
              emissive={hovered ? "#ff0000" : "#440000"} 
              emissiveIntensity={hovered ? 2 : 1} 
          />
        </mesh>
        
        {/* Rotating Orbital Halo */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
           <torusGeometry args={[0.5, 0.02, 16, 32]} />
           <meshBasicMaterial color={hovered ? "#ffffff" : "#e60000"} transparent opacity={hovered ? 0.9 : 0.3} />
        </mesh>
      </group>

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
  
  // Oscillate the entire network so the text always faces forward
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.6;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central 3D 'RAD' Text Core */}
      <Center>
        <Text3D
          font="https://unpkg.com/three@0.149.0/examples/fonts/helvetiker_bold.typeface.json"
          size={1.8}
          height={0.6}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.08}
          bevelSize={0.04}
          bevelOffset={0}
          bevelSegments={5}
        >
          RAD
          <MeshDistortMaterial
              color="#8c0000"
              envMapIntensity={2}
              clearcoat={1}
              metalness={0.9}
              roughness={0.1}
              distort={0.1} // reduced so text is readable
              speed={2}
              emissive="#4a0000"
              emissiveIntensity={0.5}
          />
        </Text3D>
      </Center>
      
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
