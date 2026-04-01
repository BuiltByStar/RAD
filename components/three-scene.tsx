"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

// ─── Constellation Network ──────────────────────────────────────────────────

function ConstellationNetwork() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const count = 60;
  const connectionDistance = 2.5;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
    }
    return arr;
  }, []);

  const velocities = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 0.003;
    }
    return arr;
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;

    const posAttr = pointsRef.current.geometry.attributes.position;
    const posArr = posAttr.array as Float32Array;

    // Move particles
    for (let i = 0; i < count * 3; i++) {
      posArr[i] += velocities[i];
      // Bounce off bounds
      if (Math.abs(posArr[i]) > 7) {
        velocities[i] *= -1;
      }
    }
    posAttr.needsUpdate = true;

    // Build connection lines
    if (linesRef.current) {
      const linePositions: number[] = [];
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = posArr[i * 3] - posArr[j * 3];
          const dy = posArr[i * 3 + 1] - posArr[j * 3 + 1];
          const dz = posArr[i * 3 + 2] - posArr[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < connectionDistance) {
            linePositions.push(
              posArr[i * 3], posArr[i * 3 + 1], posArr[i * 3 + 2],
              posArr[j * 3], posArr[j * 3 + 1], posArr[j * 3 + 2]
            );
          }
        }
      }
      const lineGeo = linesRef.current.geometry;
      lineGeo.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(linePositions, 3)
      );
      lineGeo.computeBoundingSphere();
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#e60000"
          transparent
          opacity={0.7}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial
          color="#e60000"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

// ─── Wireframe Icosahedron ──────────────────────────────────────────────────

function CoreGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.3;
    const scale = 1 + Math.sin(state.clock.elapsedTime * 0.3) * 0.04;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.8, 1]} />
        <meshStandardMaterial
          color="#1a0000"
          wireframe
          emissive="#e60000"
          emissiveIntensity={0.3}
          transparent
          opacity={0.4}
        />
      </mesh>
    </Float>
  );
}

// ─── Main Scene ─────────────────────────────────────────────────────────────

export function Scene() {
  useFrame((state) => {
    const pointerX = (state.pointer.x * Math.PI) / 10;
    const pointerY = (state.pointer.y * Math.PI) / 10;

    state.camera.position.x += (pointerX - state.camera.position.x) * 0.03;
    state.camera.position.y += (pointerY - state.camera.position.y) * 0.03;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <color attach="background" args={["#010101"]} />

      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <pointLight position={[8, 8, 8]} intensity={1.5} color="#ffffff" />
      <spotLight position={[-10, 10, -10]} intensity={2} color="#e60000" angle={0.4} penumbra={1} />
      <spotLight position={[10, -5, 5]} intensity={1} color="#330000" angle={0.6} penumbra={1} />

      {/* Constellation Network */}
      <ConstellationNetwork />

      {/* Central wireframe core */}
      <CoreGeometry />

      {/* Ambient particles */}
      <Sparkles count={80} scale={18} size={2} speed={0.15} opacity={0.2} color="#e60000" />
      <Sparkles count={40} scale={22} size={3} speed={0.1} opacity={0.08} color="#ffffff" />

      <Environment preset="night" />
    </>
  );
}
