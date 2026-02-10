"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import {
  shouldUseAntialiasing,
  getDevicePixelRatioCap,
  getParticleCountMultiplier,
} from "@/lib/performance";

/**
 * Simplified crystal (single geometry, minimal effects)
 * Optimized for performance on low-end desktop devices
 */
function SimpleCrystal() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.08;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.05;
    }
  });

  return (
    <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.3}>
      <mesh ref={meshRef} scale={1}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.25} />
      </mesh>
    </Float>
  );
}

/**
 * Minimal particles (reduced count based on device)
 * Much fewer particles than the full scene
 */
function SimpleParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const multiplier = getParticleCountMultiplier();

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    // Base count is 100, multiplied by device capability
    const count = Math.floor(100 * multiplier);
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [multiplier]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.008;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.005;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.025}
        color="#60a5fa"
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
}

/**
 * Minimal floating orbs (just 2 instead of 4)
 */
function SimpleOrbs() {
  return (
    <>
      <SimpleOrb position={[-3, 2, -3]} color="#60a5fa" size={0.25} speed={0.6} />
      <SimpleOrb position={[3, -2, -4]} color="#5eead4" size={0.2} speed={0.5} />
    </>
  );
}

function SimpleOrb({
  position,
  color,
  size,
  speed,
}: {
  position: [number, number, number];
  color: string;
  size: number;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.1} />
    </mesh>
  );
}

/**
 * Simple grid floor
 */
function SimpleGrid() {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.z = (state.clock.elapsedTime * 0.2) % 2;
    }
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[30, 30, "#27272a", "#18181b"]}
      position={[0, -5, 0]}
    />
  );
}

/**
 * Simplified hero scene for low-end desktop devices
 * Optimized for performance with:
 * - Reduced particle count
 * - Fewer floating orbs
 * - Simpler geometry
 * - No sparkles, DNA helix, or mouse-following light
 */
export function SimpleHeroScene() {
  const dprCap = getDevicePixelRatioCap();
  const useAntialias = shouldUseAntialiasing();

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        dpr={[1, dprCap]}
        gl={{ antialias: useAntialias, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          {/* Minimal lighting */}
          <ambientLight intensity={0.12} />
          <pointLight position={[10, 10, 10]} intensity={0.6} color="#60a5fa" />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#5eead4" />

          {/* Simplified components */}
          <SimpleCrystal />
          <SimpleParticles />
          <SimpleOrbs />
          <SimpleGrid />
        </Suspense>
      </Canvas>
    </div>
  );
}
