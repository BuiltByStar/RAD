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
  RoundedBox,
  MeshTransmissionMaterial
} from "@react-three/drei";
import { useRouter } from "next/navigation";
import * as THREE from "three";

// Navigation nodes (Positions adjusted for a more dynamic "halo" arrangement)
const navNodes = [
  { label: "TEAMS", path: "/teams", position: [-3.4, 1.6, 0.5] as [number, number, number] },
  { label: "CONTENT", path: "/content", position: [3.4, 1.6, 0.5] as [number, number, number] },
  { label: "ABOUT", path: "/about", position: [-3.0, -1.2, 0.4] as [number, number, number] },
  { label: "STAFF", path: "/staff", position: [3.0, -1.2, 0.4] as [number, number, number] },
  { label: "CONTACT", path: "/contact", position: [0, -2.1, 0.7] as [number, number, number] },
];

function ParticleField({ count = 80 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        p[i * 3] = (Math.random() - 0.5) * 15;
        p[i * 3 + 1] = (Math.random() - 0.5) * 10;
        p[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
    }
    return p;
  }, [count]);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) {
        ref.current.rotation.y = state.clock.elapsedTime * 0.04;
        ref.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#ff3030" transparent opacity={0.4} sizeAttenuation={true} />
    </points>
  );
}

function OrbitingRings() {
    const ring1 = useRef<THREE.Mesh>(null);
    const ring2 = useRef<THREE.Mesh>(null);
    const ring3 = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (ring1.current) {
            ring1.current.rotation.z = t * 0.25;
            ring1.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.2) * 0.1;
        }
        if (ring2.current) {
            ring2.current.rotation.y = t * -0.18;
            ring2.current.rotation.z = t * 0.12;
            ring2.current.rotation.x = Math.PI / 4;
        }
        if (ring3.current) {
            ring3.current.rotation.z = t * 0.35;
            ring3.current.rotation.x = -Math.PI / 6 + Math.cos(t * 0.3) * 0.08;
        }
    });

    return (
        <group>
            {/* Inner tech ring */}
            <mesh ref={ring1}>
                <torusGeometry args={[2.55, 0.012, 16, 128]} />
                <meshBasicMaterial color="#ff2222" transparent opacity={0.24} />
            </mesh>
            {/* Outer tilted ring */}
            <mesh ref={ring2}>
                <torusGeometry args={[3.2, 0.008, 12, 160]} />
                <meshBasicMaterial color="#ff4444" transparent opacity={0.15} />
            </mesh>
            {/* Wide accent ring */}
            <mesh ref={ring3}>
                <torusGeometry args={[4.05, 0.006, 12, 180]} />
                <meshBasicMaterial color="#ff1111" transparent opacity={0.12} />
            </mesh>
        </group>
    );
}

function EnergyCore() {
    const coreRef = useRef<THREE.Mesh>(null);
    const outerRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (coreRef.current) {
            const s = 1.0 + Math.sin(t * 2.5) * 0.04;
            coreRef.current.scale.setScalar(s);
        }
        if (outerRef.current) {
            const s = 1.5 + Math.sin(t * 1.8) * 0.08;
            outerRef.current.scale.setScalar(s);
            outerRef.current.rotation.y = t * 0.5;
        }
    });

    return (
        <group position={[0, 0, -0.8]}>
            {/* Central dense core */}
            <mesh ref={coreRef}>
                <sphereGeometry args={[0.35, 32, 32]} />
                <meshBasicMaterial color="#ff0000" />
            </mesh>
            {/* Glowing atmosphere */}
            <mesh ref={outerRef}>
                <sphereGeometry args={[0.62, 32, 32]} />
                <meshBasicMaterial 
                    color="#ff3333" 
                    transparent 
                    opacity={0.12} 
                    blending={THREE.AdditiveBlending} 
                />
            </mesh>
            {/* Point light within the core */}
            <pointLight distance={6} intensity={1.5} color="#ff0000" />
        </group>
    );
}

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
  const coreRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      const target = hovered ? 1.2 : 1;
      groupRef.current.scale.lerp(new THREE.Vector3(target, target, target), 0.12);
      groupRef.current.position.y += Math.sin(t * 1.5 + position[0]) * 0.0015;
    }
    if (coreRef.current) {
        coreRef.current.rotation.y = t * 0.8;
        coreRef.current.rotation.z = t * 0.4;
    }
    if (haloRef.current) {
        haloRef.current.rotation.z = t * -0.5;
        const s = 1 + Math.sin(t * 2) * 0.05;
        haloRef.current.scale.setScalar(hovered ? 1.15 : s);
    }
  });

  return (
    <group position={position}>
      {/* Connector line to center */}
      <line>
         <bufferGeometry attach="geometry">
            <bufferAttribute
               attach="attributes-position"
               count={2}
               args={[new Float32Array([0, 0, 0, -position[0], -position[1], -position[2]]), 3]}
             />
         </bufferGeometry>
         <lineBasicMaterial 
            color={hovered ? "#ff8888" : "#ff2222"} 
            transparent 
            opacity={hovered ? 0.75 : 0.15} 
            blending={THREE.AdditiveBlending}
         />
      </line>

      <group 
        ref={groupRef}
        onClick={(e) => { e.stopPropagation(); router.push(path); }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
      >
        {/* Inner Octahedron core for a more "tech" feel */}
        <mesh ref={coreRef}>
          <octahedronGeometry args={[0.22, 0]} />
          <meshStandardMaterial 
            color={hovered ? "#ff4d4d" : "#940000"} 
            emissive="#ff0000" 
            emissiveIntensity={hovered ? 2.5 : 1.2} 
            metalness={0.8}
            roughness={0.1}
          />
        </mesh>

        {/* Glass sphere shell */}
        <mesh scale={1.3}>
           <sphereGeometry args={[0.22, 32, 32]} />
           <MeshTransmissionMaterial 
                backside
                samples={4}
                thickness={0.5}
                chromaticAberration={0.06}
                anisotropy={0.1}
                distortion={0.1}
                distortionScale={0.14}
                temporalDistortion={0.1}
                transmission={1}
                color={hovered ? "#fff0f0" : "#ffdddd"}
                roughness={0.05}
           />
        </mesh>

        {/* Orbiting ring for node */}
        <mesh ref={haloRef} rotation={[Math.PI / 2.5, 0.2, 0]}>
            <torusGeometry args={[0.5, 0.01, 16, 64]} />
            <meshBasicMaterial color="#ff3333" transparent opacity={hovered ? 0.8 : 0.3} />
        </mesh>

        {/* Interaction glow */}
        <mesh scale={1.8}>
           <sphereGeometry args={[0.25, 16, 16]} />
           <meshBasicMaterial color="#ff0000" transparent opacity={hovered ? 0.08 : 0.0} />
        </mesh>
      </group>

      <Html distanceFactor={10} position={[0, 0.65, 0]} center style={{ pointerEvents: 'none' }}>
        <div style={{
          color: hovered ? "#fff" : "rgba(255,255,255,0.7)",
          textTransform: "uppercase",
          letterSpacing: "0.25em",
          fontSize: "10px",
          fontWeight: 800,
          transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
          textShadow: hovered ? "0 0 12px #ff0000" : "none",
          padding: "0.4rem 0.7rem",
          borderRadius: "4px",
          background: hovered ? "rgba(255, 0, 0, 0.2)" : "rgba(255,255,255,0.03)",
          border: hovered ? "1px solid rgba(255,100,100,0.5)" : "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(10px)"
        }}>
          {label}
        </div>
      </Html>
    </group>
  );
}

function HubModel() {
  const groupRef = useRef<THREE.Group>(null);
  const t3dRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.04;
      groupRef.current.rotation.z = Math.cos(t * 0.15) * 0.02;
      groupRef.current.position.y = 0.2 + Math.sin(t * 0.8) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <OrbitingRings />
      <EnergyCore />

      <Center ref={t3dRef}>
        <Text3D
          font="https://unpkg.com/three@0.149.0/examples/fonts/helvetiker_bold.typeface.json"
          size={1.6}
          height={0.4}
          curveSegments={24}
          bevelEnabled
          bevelThickness={0.05}
          bevelSize={0.03}
          bevelOffset={0}
          bevelSegments={10}
        >
          RAD
          <meshPhysicalMaterial
            color="#050505"
            emissive="#ff0000"
            emissiveIntensity={0.65}
            metalness={1.0}
            roughness={0.12}
            clearcoat={1}
            clearcoatRoughness={0.05}
            reflectivity={1}
            transmission={0.05}
            ior={1.45}
          />
        </Text3D>
      </Center>

      {/* Structured "frame" around the text */}
      <RoundedBox args={[5.2, 2.3, 0.5]} radius={0.4} smoothness={4} position={[0, 0, -0.3]}>
        <MeshTransmissionMaterial 
            samples={6}
            thickness={1}
            chromaticAberration={0.02}
            distortion={0.1}
            distortionScale={0.1}
            temporalDistortion={0.1}
            color="#1a0000"
            roughness={0.1}
            transmission={0.8}
        />
      </RoundedBox>

      {/* Floating accent elements */}
      <group position={[0,0,-0.1]}>
        <RoundedBox args={[3.8, 0.08, 0.1]} radius={0.04} position={[0, 1.25, 0]}>
            <meshBasicMaterial color="#ff3333" transparent opacity={0.3} />
        </RoundedBox>
        <RoundedBox args={[3.8, 0.08, 0.1]} radius={0.04} position={[0, -1.25, 0]}>
            <meshBasicMaterial color="#ff3333" transparent opacity={0.3} />
        </RoundedBox>
      </group>
      
      {navNodes.map((node) => (
         <NavNode key={node.label} {...node} />
      ))}
    </group>
  );
}

export function InteractiveNavHub() {
  return (
    <div className="at-hub-wrap" style={{ 
      width: "100%", 
      height: "62vh", 
      minHeight: "550px", 
      maxHeight: "750px", 
      position: "relative", 
      zIndex: 10, 
      margin: "1rem 0", 
      overflow: "visible" 
    }}>
      <Canvas camera={{ position: [0, 0.8, 8.8], fov: 32 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <spotLight position={[8, 10, 10]} angle={0.3} penumbra={1} intensity={2.5} color="#ff3333" />
        <pointLight position={[-8, -5, -5]} intensity={0.5} color="#ff6666" />
        <pointLight position={[0, 4, 3]} intensity={1.2} color="#ff0000" />
        
        <ParticleField count={100} />
        
        <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.15}>
          <HubModel />
        </Float>
        
        <ContactShadows position={[0, -2.4, 0]} opacity={0.3} scale={15} blur={1.5} far={4.5} color="#100000" />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
