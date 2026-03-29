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
  MeshTransmissionMaterial
} from "@react-three/drei";
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
  const groupRef = useRef<THREE.Group>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const secondaryHaloRef = useRef<THREE.Mesh>(null);
  const lineColor = hovered ? "#ffffff" : "#ff2a2a";

  useFrame((state) => {
    if (groupRef.current) {
      const target = hovered ? 1.14 : 1;
      const currentScale = groupRef.current.scale.x;
      const nextScale = THREE.MathUtils.lerp(currentScale, target, 0.12);
      groupRef.current.scale.setScalar(nextScale);
      groupRef.current.rotation.y += 0.01;
    }

    if (haloRef.current) {
      haloRef.current.rotation.z = state.clock.elapsedTime * 0.55;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.8) * 0.06;
      haloRef.current.scale.setScalar(hovered ? 1.06 : pulse);
    }

    if (secondaryHaloRef.current) {
      secondaryHaloRef.current.rotation.y = state.clock.elapsedTime * 0.8;
      secondaryHaloRef.current.rotation.z = state.clock.elapsedTime * 0.35;
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
         <lineBasicMaterial attach="material" color={lineColor} transparent opacity={hovered ? 0.8 : 0.28} />
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
        <mesh>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial
            color={hovered ? "#ffd9d9" : "#ff5c5c"}
            transparent
            opacity={0.22}
            emissive="#ff1a1a"
            emissiveIntensity={0.9}
            roughness={0.14}
            metalness={0.12}
          />
        </mesh>

        <mesh>
          <sphereGeometry args={[0.19, 32, 32]} />
          <meshStandardMaterial 
              color={hovered ? "#ffffff" : "#ff5a5a"} 
              metalness={0.4}
              roughness={0.03}
              emissive={hovered ? "#ff4d4d" : "#7b0d0d"} 
              emissiveIntensity={hovered ? 1.7 : 1.05} 
          />
        </mesh>

        <mesh scale={0.52}>
          <sphereGeometry args={[0.24, 24, 24]} />
          <meshBasicMaterial color="#fff1f1" transparent opacity={0.85} />
        </mesh>

        <mesh ref={haloRef} rotation={[Math.PI / 2, 0, 0]}>
           <torusGeometry args={[0.46, 0.017, 24, 96]} />
           <meshBasicMaterial color={hovered ? "#ffffff" : "#ff3b3b"} transparent opacity={hovered ? 0.92 : 0.55} />
        </mesh>

        <mesh ref={secondaryHaloRef} rotation={[0.6, Math.PI / 4, 0.4]}>
          <torusGeometry args={[0.58, 0.011, 24, 96]} />
          <meshBasicMaterial color={hovered ? "#ffdede" : "#ff1f1f"} transparent opacity={hovered ? 0.75 : 0.42} />
        </mesh>

        <mesh scale={1.62}>
          <sphereGeometry args={[0.18, 32, 32]} />
          <meshBasicMaterial color="#ff0000" transparent opacity={0.16} />
        </mesh>
      </group>

      {/* The floating GUI Label */}
      <Html distanceFactor={10} position={[0, 0.5, 0]} center style={{ pointerEvents: 'none' }}>
        <div style={{
          color: hovered ? "#fff" : "rgba(255,255,255,0.7)",
          textTransform: "uppercase",
          letterSpacing: "0.18em",
          fontSize: "12px",
          fontWeight: "bold",
          transition: "all 0.2s",
          textShadow: hovered ? "0 0 14px #ff0000" : "none",
          backdropFilter: "blur(6px)"
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
  const accentColor = useMemo(() => new THREE.Color("#ff1a1a"), []);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.22 + Math.sin(state.clock.elapsedTime * 0.34) * 0.14;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.28) * 0.07;
      const introScale = THREE.MathUtils.lerp(groupRef.current.scale.x, 1, 0.06);
      groupRef.current.scale.setScalar(introScale);
    }

    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 2;
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.22;
    }

    if (accentRingRef.current) {
      accentRingRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      accentRingRef.current.rotation.z = state.clock.elapsedTime * 0.12;
    }
  });

  return (
    <group ref={groupRef} scale={0.82}>
      <mesh ref={ringRef} position={[0, 0, -0.12]}>
        <torusGeometry args={[2.1, 0.02, 32, 160]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
      </mesh>

      <mesh ref={accentRingRef} rotation={[0.55, 0.2, 0.1]} position={[0, 0, -0.35]}>
        <torusGeometry args={[2.65, 0.03, 32, 160]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.24} />
      </mesh>

      <Center>
        <Text3D
          font="https://unpkg.com/three@0.149.0/examples/fonts/helvetiker_bold.typeface.json"
          size={1.78}
          height={0.44}
          curveSegments={22}
          bevelEnabled
          bevelThickness={0.045}
          bevelSize={0.03}
          bevelOffset={0}
          bevelSegments={10}
        >
          RAD
          <MeshTransmissionMaterial
            backside
            samples={6}
            resolution={256}
            thickness={0.48}
            roughness={0.08}
            transmission={0.92}
            ior={1.1}
            chromaticAberration={0.03}
            anisotropy={0.15}
            distortion={0.04}
            distortionScale={0.08}
            temporalDistortion={0.06}
            color="#f4f4f4"
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
    <div className="at-hub-wrap" style={{ width: "100%", height: "44vh", minHeight: "340px", maxHeight: "520px", position: "relative", zIndex: 10, margin: "0.5rem 0 0.25rem" }}>
      <Canvas camera={{ position: [0, 0, 7.1], fov: 40 }} dpr={[1, 1.8]}>
        <ambientLight intensity={0.7} />
        <spotLight position={[6, 7, 8]} angle={0.34} penumbra={1} intensity={2.2} color="#ff3b3b" />
        <pointLight position={[-8, -6, -6]} intensity={0.7} color="#ffffff" />
        <pointLight position={[0, 5, -3]} intensity={0.55} color="#ff0000" />
        
        <Float speed={1.35} rotationIntensity={0.08} floatIntensity={0.42}>
          <HubModel />
        </Float>
        
        <ContactShadows position={[0, -3.05, 0]} opacity={0.42} scale={12} blur={2.8} far={4.4} color="#320000" />
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
