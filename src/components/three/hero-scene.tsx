"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";

// Animated Crystal with multiple layers - More subtle
function AnimatedCrystal() {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.08;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -state.clock.elapsedTime * 0.2;
      innerRef.current.rotation.z = state.clock.elapsedTime * 0.15;
    }
    if (outerRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.02;
      outerRef.current.scale.setScalar(scale);
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef}>
        {/* Inner glowing core - dimmer */}
        <mesh ref={innerRef} scale={0.5}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#60a5fa" transparent opacity={0.5} />
        </mesh>

        {/* Middle wireframe layer - more subtle */}
        <mesh scale={0.8}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color="#5eead4" wireframe transparent opacity={0.25} />
        </mesh>

        {/* Outer distorted shell - very subtle */}
        <mesh ref={outerRef} scale={1.2}>
          <icosahedronGeometry args={[1, 4]} />
          <MeshDistortMaterial
            color="#60a5fa"
            transparent
            opacity={0.08}
            distort={0.3}
            speed={2}
            roughness={0.5}
          />
        </mesh>

        {/* Orbiting rings - dimmer */}
        <Ring radius={1.8} speed={0.8} color="#60a5fa" />
        <Ring radius={2.2} speed={-0.5} color="#5eead4" rotationX={Math.PI / 3} />
        <Ring radius={2.5} speed={0.3} color="#818cf8" rotationX={Math.PI / 2} />
      </group>
    </Float>
  );
}

// Orbiting ring component - more subtle
function Ring({ radius, speed, color, rotationX = 0 }: { radius: number; speed: number; color: string; rotationX?: number }) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * speed;
    }
  });

  return (
    <mesh ref={ringRef} rotation={[rotationX, 0, 0]}>
      <torusGeometry args={[radius, 0.008, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.2} />
    </mesh>
  );
}

// Seeded pseudo-random number generator for deterministic particle positions
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

// Enhanced particle field - dimmer
function EnhancedParticleField() {
  const points1Ref = useRef<THREE.Points>(null);
  const points2Ref = useRef<THREE.Points>(null);

  const [geometry1, geometry2] = useMemo(() => {
    // Layer 1: Closer, larger particles
    const geo1 = new THREE.BufferGeometry();
    const positions1 = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      positions1[i * 3] = (seededRandom(i * 3) - 0.5) * 15;
      positions1[i * 3 + 1] = (seededRandom(i * 3 + 1) - 0.5) * 15;
      positions1[i * 3 + 2] = (seededRandom(i * 3 + 2) - 0.5) * 15;
    }
    geo1.setAttribute("position", new THREE.BufferAttribute(positions1, 3));

    // Layer 2: Further, smaller particles
    const geo2 = new THREE.BufferGeometry();
    const positions2 = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      positions2[i * 3] = (seededRandom(1000 + i * 3) - 0.5) * 25;
      positions2[i * 3 + 1] = (seededRandom(1000 + i * 3 + 1) - 0.5) * 25;
      positions2[i * 3 + 2] = (seededRandom(1000 + i * 3 + 2) - 0.5) * 25;
    }
    geo2.setAttribute("position", new THREE.BufferAttribute(positions2, 3));

    return [geo1, geo2];
  }, []);

  useFrame((state) => {
    if (points1Ref.current) {
      points1Ref.current.rotation.y = state.clock.elapsedTime * 0.015;
      points1Ref.current.rotation.x = state.clock.elapsedTime * 0.008;
    }
    if (points2Ref.current) {
      points2Ref.current.rotation.y = -state.clock.elapsedTime * 0.01;
      points2Ref.current.rotation.z = state.clock.elapsedTime * 0.008;
    }
  });

  return (
    <>
      <points ref={points1Ref} geometry={geometry1}>
        <pointsMaterial
          size={0.03}
          color="#60a5fa"
          transparent
          opacity={0.4}
          sizeAttenuation
        />
      </points>
      <points ref={points2Ref} geometry={geometry2}>
        <pointsMaterial
          size={0.015}
          color="#5eead4"
          transparent
          opacity={0.2}
          sizeAttenuation
        />
      </points>
    </>
  );
}

// Floating orbs - dimmer
function FloatingOrbs() {
  return (
    <>
      <FloatingOrb position={[-4, 2, -3]} color="#60a5fa" size={0.3} speed={0.8} />
      <FloatingOrb position={[4, -2, -4]} color="#5eead4" size={0.25} speed={0.6} />
      <FloatingOrb position={[-3, -3, -2]} color="#818cf8" size={0.2} speed={1} />
      <FloatingOrb position={[3, 3, -5]} color="#60a5fa" size={0.35} speed={0.7} />
    </>
  );
}

function FloatingOrb({ position, color, size, speed }: { position: [number, number, number]; color: string; size: number; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.4;
      meshRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * speed * 0.5) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshBasicMaterial color={color} transparent opacity={0.12} />
    </mesh>
  );
}

// Animated grid floor - much dimmer
function AnimatedGrid() {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.z = (state.clock.elapsedTime * 0.3) % 2;
    }
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[30, 30, "#27272a", "#18181b"]}
      position={[0, -5, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

// Mouse-following light - dimmer
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
      intensity={1}
      color="#60a5fa"
      distance={8}
    />
  );
}

// DNA Helix effect - dimmer
function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null);
  const spheres = useMemo(() => {
    const items = [];
    const count = 30;
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
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[6, 0, -5]} scale={0.35}>
      {spheres.map((sphere, i) => (
        <group key={i}>
          <mesh position={sphere.pos1}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="#60a5fa" transparent opacity={0.3} />
          </mesh>
          <mesh position={sphere.pos2}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="#5eead4" transparent opacity={0.3} />
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
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          {/* Lighting - dimmer */}
          <ambientLight intensity={0.15} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#60a5fa" />
          <pointLight position={[-10, -10, -10]} intensity={0.4} color="#5eead4" />
          <pointLight position={[0, 10, 0]} intensity={0.3} color="#818cf8" />
          <MouseLight />

          {/* Main crystal */}
          <AnimatedCrystal />

          {/* Particle fields */}
          <EnhancedParticleField />

          {/* Sparkles effect - fewer and dimmer */}
          <Sparkles
            count={60}
            scale={15}
            size={1.5}
            speed={0.3}
            color="#60a5fa"
            opacity={0.4}
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
