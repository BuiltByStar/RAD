"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Html,
  ContactShadows,
  Environment,
  Text3D,
  Center,
  RoundedBox
} from "@react-three/drei";
import { useRouter } from "next/navigation";
import * as THREE from "three";

// The points radiating from the 3D model (Positioned wider and forward to avoid text clipping)
const navNodes = [
  { label: "TEAMS", path: "/teams", position: [-3.15, 1.42, 0.45] as [number, number, number] },
  { label: "CONTENT", path: "/content", position: [3.1, 1.42, 0.45] as [number, number, number] },
  { label: "ABOUT", path: "/about", position: [-2.75, -1.12, 0.32] as [number, number, number] },
  { label: "STAFF", path: "/staff", position: [2.75, -1.12, 0.32] as [number, number, number] },
  { label: "CONTACT", path: "/contact", position: [0, -1.88, 0.62] as [number, number, number] },
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
  const groupRef = useRef<THREE.Group>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const secondaryHaloRef = useRef<THREE.Mesh>(null);
  const lineColor = hovered ? "#ffd1d1" : "#b31111";

  useFrame((state) => {
    if (groupRef.current) {
      const target = hovered ? 1.14 : 1;
      const currentScale = groupRef.current.scale.x;
      const nextScale = THREE.MathUtils.lerp(currentScale, target, 0.11);
      groupRef.current.scale.setScalar(nextScale);
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.85) * 0.035;
    }

    if (haloRef.current) {
      haloRef.current.rotation.z = state.clock.elapsedTime * 0.25;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.6) * 0.045;
      haloRef.current.scale.setScalar(hovered ? 1.06 : pulse);
    }

    if (secondaryHaloRef.current) {
      secondaryHaloRef.current.rotation.y = state.clock.elapsedTime * 0.42;
      secondaryHaloRef.current.rotation.z = state.clock.elapsedTime * 0.16;
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
         <lineBasicMaterial attach="material" color={lineColor} transparent opacity={hovered ? 0.7 : 0.18} />
      </line>

      {/* The actual clickable geometric component */}
      <group 
        ref={groupRef}
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
        <mesh scale={[1.08, 1.08, 0.88]}>
          <sphereGeometry args={[0.28, 32, 32]} />
          <meshStandardMaterial
            color={hovered ? "#ff8787" : "#670808"}
            transparent
            opacity={0.42}
            emissive="#ff1a1a"
            emissiveIntensity={0.85}
            roughness={0.08}
            metalness={0.18}
          />
        </mesh>

        <mesh scale={[0.82, 0.82, 0.76]}>
          <sphereGeometry args={[0.22, 32, 32]} />
          <meshStandardMaterial 
              color={hovered ? "#ffb4b4" : "#ff2323"} 
              metalness={0.28}
              roughness={0.12}
              emissive={hovered ? "#ff5a5a" : "#b81010"} 
              emissiveIntensity={hovered ? 1.8 : 1.15} 
          />
        </mesh>

        <mesh scale={[0.34, 0.34, 0.26]}>
          <sphereGeometry args={[0.28, 24, 24]} />
          <meshBasicMaterial color="#fff3f3" transparent opacity={0.9} />
        </mesh>

        <mesh ref={haloRef} rotation={[Math.PI / 2, 0, 0]}>
           <torusGeometry args={[0.44, 0.012, 24, 96]} />
           <meshBasicMaterial color={hovered ? "#ffe7e7" : "#ff2f2f"} transparent opacity={hovered ? 0.85 : 0.42} />
        </mesh>

        <mesh ref={secondaryHaloRef} rotation={[0.6, Math.PI / 4, 0.4]}>
          <torusGeometry args={[0.56, 0.008, 24, 96]} />
          <meshBasicMaterial color={hovered ? "#ffdede" : "#d31717"} transparent opacity={hovered ? 0.68 : 0.28} />
        </mesh>

        <mesh scale={1.62}>
          <sphereGeometry args={[0.18, 32, 32]} />
          <meshBasicMaterial color="#ff0000" transparent opacity={0.12} />
        </mesh>
      </group>

      {/* The floating GUI Label */}
      <Html distanceFactor={10} position={[0, 0.5, 0]} center style={{ pointerEvents: 'none' }}>
        <div style={{
          color: hovered ? "#fff" : "rgba(255,255,255,0.62)",
          textTransform: "uppercase",
          letterSpacing: "0.22em",
          fontSize: "11px",
          fontWeight: 700,
          transition: "all 0.2s",
          textShadow: hovered ? "0 0 14px #ff0000" : "none",
          backdropFilter: "blur(14px)",
          padding: "0.4rem 0.6rem",
          borderRadius: "999px",
          background: hovered ? "rgba(255, 24, 24, 0.16)" : "rgba(255,255,255,0.04)",
          border: hovered ? "1px solid rgba(255,110,110,0.4)" : "1px solid rgba(255,255,255,0.07)"
        }}>
          {label}
        </div>
      </Html>
    </group>
  );
}

function HubModel() {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const accentRingRef = useRef<THREE.Mesh>(null);
  const auraRef = useRef<THREE.Mesh>(null);
  const accentColor = useMemo(() => new THREE.Color("#ff1a1a"), []);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.32) * 0.028;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.34) * 0.018;
      groupRef.current.position.y = 0.26 + Math.sin(state.clock.elapsedTime * 0.72) * 0.045;
      const introScale = THREE.MathUtils.lerp(groupRef.current.scale.x, 1, 0.06);
      groupRef.current.scale.setScalar(introScale);
    }

    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 2;
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.12;
    }

    if (accentRingRef.current) {
      accentRingRef.current.rotation.y = state.clock.elapsedTime * 0.18;
      accentRingRef.current.rotation.z = state.clock.elapsedTime * 0.07;
    }

    if (auraRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.1) * 0.035;
      auraRef.current.scale.set(pulse, pulse * 0.96, pulse);
      const auraMaterial = auraRef.current.material as THREE.MeshBasicMaterial;
      auraMaterial.opacity = 0.16 + Math.sin(state.clock.elapsedTime * 1.1) * 0.03;
    }
  });

  return (
    <group ref={groupRef} scale={0.88}>
      <mesh ref={auraRef} position={[0, -0.05, -0.72]} rotation={[0, 0, 0.04]}>
        <planeGeometry args={[5.6, 3.3]} />
        <meshBasicMaterial color="#c00000" transparent opacity={0.18} />
      </mesh>

      <mesh ref={ringRef} position={[0, 0.02, -0.22]}>
        <torusGeometry args={[2.3, 0.018, 32, 160]} />
        <meshBasicMaterial color="#ff6767" transparent opacity={0.16} />
      </mesh>

      <mesh ref={accentRingRef} rotation={[0.48, 0.18, 0.12]} position={[0, 0.06, -0.4]}>
        <torusGeometry args={[2.85, 0.022, 32, 160]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.18} />
      </mesh>

      <RoundedBox args={[4.95, 2.1, 0.42]} radius={0.34} smoothness={5} position={[0, 0, -0.28]}>
        <meshPhysicalMaterial
          color="#120202"
          metalness={0.42}
          roughness={0.34}
          clearcoat={1}
          clearcoatRoughness={0.12}
          reflectivity={1}
          transmission={0.04}
        />
      </RoundedBox>

      <RoundedBox args={[4.25, 1.48, 0.34]} radius={0.28} smoothness={5} position={[0, 0.03, -0.02]}>
        <meshPhysicalMaterial
          color="#700000"
          metalness={0.12}
          roughness={0.08}
          transmission={0.3}
          thickness={1.6}
          ior={1.24}
          envMapIntensity={1.2}
          clearcoat={1}
          clearcoatRoughness={0.08}
          emissive="#7a0000"
          emissiveIntensity={0.45}
        />
      </RoundedBox>

      <RoundedBox args={[3.72, 0.16, 0.08]} radius={0.08} smoothness={4} position={[0, 0.62, 0.08]}>
        <meshBasicMaterial color="#ff6d6d" transparent opacity={0.26} />
      </RoundedBox>

      <RoundedBox args={[3.2, 0.1, 0.06]} radius={0.08} smoothness={4} position={[0, -0.68, 0.06]}>
        <meshBasicMaterial color="#ff2b2b" transparent opacity={0.18} />
      </RoundedBox>

      <Center>
        <Text3D
          font="https://unpkg.com/three@0.149.0/examples/fonts/helvetiker_bold.typeface.json"
          size={1.52}
          height={0.28}
          curveSegments={28}
          bevelEnabled
          bevelThickness={0.034}
          bevelSize={0.024}
          bevelOffset={0}
          bevelSegments={14}
        >
          RAD
          <meshPhysicalMaterial
            color="#d10000"
            metalness={0.82}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.05}
            reflectivity={1}
            emissive="#560000"
            emissiveIntensity={0.56}
          />
        </Text3D>
      </Center>
      
      {navNodes.map((node) => (
         <NavNode key={node.label} {...node} />
      ))}
    </group>
  );
}

export function InteractiveNavHub() {
  return (
    <div className="at-hub-wrap" style={{ width: "100%", height: "56vh", minHeight: "500px", maxHeight: "680px", position: "relative", zIndex: 10, margin: "0.15rem 0 1rem", overflow: "visible" }}>
      <Canvas camera={{ position: [0, 0.78, 8.4], fov: 34 }} dpr={[1, 1.8]}>
        <ambientLight intensity={0.45} />
        <spotLight position={[5.5, 6, 7]} angle={0.36} penumbra={1} intensity={1.8} color="#ff4b4b" />
        <pointLight position={[-7, -3, -4]} intensity={0.28} color="#ffc5c5" />
        <pointLight position={[0, 3.5, 2]} intensity={0.65} color="#ff2020" />
        <pointLight position={[0, -2, 4]} intensity={0.34} color="#8a0303" />
        
        <Float speed={1.2} rotationIntensity={0.03} floatIntensity={0.12}>
          <HubModel />
        </Float>
        
        <ContactShadows position={[0, -2.2, 0]} opacity={0.24} scale={12.5} blur={2.6} far={4.9} color="#280000" />
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
