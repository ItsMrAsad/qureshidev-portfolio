"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";

// Animated Crystal with multiple layers
function AnimatedCrystal() {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -state.clock.elapsedTime * 0.3;
      innerRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
    if (outerRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.03;
      outerRef.current.scale.setScalar(scale);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={groupRef}>
        {/* Inner glowing core */}
        <mesh ref={innerRef} scale={0.5}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#0ea5e9" transparent opacity={0.8} />
        </mesh>

        {/* Middle wireframe layer */}
        <mesh scale={0.8}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color="#10b981" wireframe transparent opacity={0.6} />
        </mesh>

        {/* Outer distorted shell */}
        <mesh ref={outerRef} scale={1.2}>
          <icosahedronGeometry args={[1, 4]} />
          <MeshDistortMaterial
            color="#0ea5e9"
            transparent
            opacity={0.15}
            distort={0.4}
            speed={3}
            roughness={0}
          />
        </mesh>

        {/* Orbiting rings */}
        <Ring radius={1.8} speed={1} color="#0ea5e9" />
        <Ring radius={2.2} speed={-0.7} color="#10b981" rotationX={Math.PI / 3} />
        <Ring radius={2.5} speed={0.5} color="#06b6d4" rotationX={Math.PI / 2} />
      </group>
    </Float>
  );
}

// Orbiting ring component
function Ring({ radius, speed, color, rotationX = 0 }: { radius: number; speed: number; color: string; rotationX?: number }) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * speed;
    }
  });

  return (
    <mesh ref={ringRef} rotation={[rotationX, 0, 0]}>
      <torusGeometry args={[radius, 0.01, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.4} />
    </mesh>
  );
}

// Enhanced particle field with multiple layers
// Seeded pseudo-random number generator for deterministic particle positions
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

function EnhancedParticleField() {
  const points1Ref = useRef<THREE.Points>(null);
  const points2Ref = useRef<THREE.Points>(null);

  const [geometry1, geometry2] = useMemo(() => {
    // Layer 1: Closer, larger particles
    const geo1 = new THREE.BufferGeometry();
    const positions1 = new Float32Array(300 * 3);
    for (let i = 0; i < 300; i++) {
      positions1[i * 3] = (seededRandom(i * 3) - 0.5) * 15;
      positions1[i * 3 + 1] = (seededRandom(i * 3 + 1) - 0.5) * 15;
      positions1[i * 3 + 2] = (seededRandom(i * 3 + 2) - 0.5) * 15;
    }
    geo1.setAttribute("position", new THREE.BufferAttribute(positions1, 3));

    // Layer 2: Further, smaller particles
    const geo2 = new THREE.BufferGeometry();
    const positions2 = new Float32Array(800 * 3);
    for (let i = 0; i < 800; i++) {
      positions2[i * 3] = (seededRandom(1000 + i * 3) - 0.5) * 25;
      positions2[i * 3 + 1] = (seededRandom(1000 + i * 3 + 1) - 0.5) * 25;
      positions2[i * 3 + 2] = (seededRandom(1000 + i * 3 + 2) - 0.5) * 25;
    }
    geo2.setAttribute("position", new THREE.BufferAttribute(positions2, 3));

    return [geo1, geo2];
  }, []);

  useFrame((state) => {
    if (points1Ref.current) {
      points1Ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      points1Ref.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
    if (points2Ref.current) {
      points2Ref.current.rotation.y = -state.clock.elapsedTime * 0.015;
      points2Ref.current.rotation.z = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <>
      <points ref={points1Ref} geometry={geometry1}>
        <pointsMaterial
          size={0.04}
          color="#0ea5e9"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
      <points ref={points2Ref} geometry={geometry2}>
        <pointsMaterial
          size={0.02}
          color="#06b6d4"
          transparent
          opacity={0.5}
          sizeAttenuation
        />
      </points>
    </>
  );
}

// Floating orbs
function FloatingOrbs() {
  return (
    <>
      <FloatingOrb position={[-4, 2, -3]} color="#0ea5e9" size={0.3} speed={1.2} />
      <FloatingOrb position={[4, -2, -4]} color="#10b981" size={0.25} speed={0.8} />
      <FloatingOrb position={[-3, -3, -2]} color="#06b6d4" size={0.2} speed={1.5} />
      <FloatingOrb position={[3, 3, -5]} color="#0ea5e9" size={0.35} speed={1} />
      <FloatingOrb position={[0, 4, -6]} color="#10b981" size={0.15} speed={1.8} />
    </>
  );
}

function FloatingOrb({ position, color, size, speed }: { position: [number, number, number]; color: string; size: number; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
      meshRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * speed * 0.5) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} />
    </mesh>
  );
}

// Animated grid floor
function AnimatedGrid() {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.z = (state.clock.elapsedTime * 0.5) % 2;
    }
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[30, 30, "#0ea5e9", "#0c4a6e"]}
      position={[0, -5, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

// Mouse-following light
function MouseLight() {
  const lightRef = useRef<THREE.PointLight>(null);
  const { viewport } = useThree();

  useFrame(({ pointer }) => {
    if (lightRef.current) {
      lightRef.current.position.x = (pointer.x * viewport.width) / 2;
      lightRef.current.position.y = (pointer.y * viewport.height) / 2;
    }
  });

  return (
    <pointLight
      ref={lightRef}
      position={[0, 0, 3]}
      intensity={2}
      color="#3b82f6"
      distance={10}
    />
  );
}

// DNA Helix effect
function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null);
  const spheres = useMemo(() => {
    const items = [];
    const count = 40;
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 4;
      const y = (i / count) * 10 - 5;
      items.push({
        pos1: [Math.cos(t) * 2, y, Math.sin(t) * 2] as [number, number, number],
        pos2: [Math.cos(t + Math.PI) * 2, y, Math.sin(t + Math.PI) * 2] as [number, number, number],
      });
    }
    return items;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[6, 0, -5]} scale={0.4}>
      {spheres.map((sphere, i) => (
        <group key={i}>
          <mesh position={sphere.pos1}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial color="#3b82f6" transparent opacity={0.6} />
          </mesh>
          <mesh position={sphere.pos2}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial color="#06b6d4" transparent opacity={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#0ea5e9" />
          <pointLight position={[-10, -10, -10]} intensity={0.8} color="#10b981" />
          <pointLight position={[0, 10, 0]} intensity={0.5} color="#06b6d4" />
          <MouseLight />

          {/* Main crystal */}
          <AnimatedCrystal />

          {/* Particle fields */}
          <EnhancedParticleField />

          {/* Sparkles effect */}
          <Sparkles
            count={100}
            scale={15}
            size={2}
            speed={0.5}
            color="#0ea5e9"
          />

          {/* Floating orbs */}
          <FloatingOrbs />

          {/* DNA Helix */}
          <DNAHelix />

          {/* Animated grid */}
          <AnimatedGrid />
        </Suspense>
      </Canvas>
    </div>
  );
}
