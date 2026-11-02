"use client";

import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, OrbitControls, useProgress } from "@react-three/drei";
import * as THREE from "three";
import DoctorModel from "@/components/three/DoctorModel";

function CanvasLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2 rounded-2xl border border-gray-200 bg-white/95 px-4 py-3 text-center shadow-lg">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#4361EE] border-t-transparent" />
        <span className="font-mono text-xs font-semibold text-[#1A1A2E]">
          Loading 3D {Math.round(progress)}%
        </span>
      </div>
    </Html>
  );
}

function WireframeIcosahedron({
  autoRotate,
  isDark,
}: {
  autoRotate: boolean;
  isDark: boolean;
}) {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (!autoRotate) return;
    if (outerRef.current) {
      outerRef.current.rotation.x += delta * 0.22;
      outerRef.current.rotation.y += delta * 0.34;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x -= delta * 0.16;
      innerRef.current.rotation.y -= delta * 0.25;
    }
  });

  return (
    <Float
      speed={autoRotate ? 1.8 : 0}
      rotationIntensity={autoRotate ? 0.25 : 0}
      floatIntensity={autoRotate ? 0.55 : 0}
    >
      <group
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Main outer light-gray wireframe icosahedron */}
        <mesh ref={outerRef} scale={hovered ? 1.82 : 1.75}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial
            color={hovered ? "#4361EE" : isDark ? "#9CA3AF" : "#9CA3AF"}
            wireframe
            transparent
            opacity={hovered ? 0.85 : 0.72}
          />
        </mesh>

        {/* Subtle inner geometric core */}
        <mesh ref={innerRef} scale={0.95}>
          <icosahedronGeometry args={[1, 0]} />
          <meshBasicMaterial
            color={hovered ? "#7B2FF7" : isDark ? "#6B7280" : "#CBD5E1"}
            wireframe
            transparent
            opacity={0.55}
          />
        </mesh>
      </group>
    </Float>
  );
}

interface HeroCanvasProps {
  mode: "icosahedron" | "doctor";
  prefersReducedMotion: boolean;
  isDark: boolean;
}

export default function HeroCanvas({
  mode,
  prefersReducedMotion,
  isDark,
}: HeroCanvasProps) {
  return (
    <div
      className="relative h-[340px] w-full cursor-grab active:cursor-grabbing sm:h-[420px] lg:h-[490px]"
      aria-label="Interactive 3D viewport — drag to rotate"
    >
      <Canvas
        camera={{ position: [0, 0.15, 4.3], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.35} />
        <hemisphereLight args={["#ffffff", "#cbd5e1", 1.1]} />
        <directionalLight position={[4, 6, 5]} intensity={1.8} />
        <directionalLight position={[-4, 3, -3]} intensity={0.8} color="#4361EE" />

        <Suspense fallback={<CanvasLoader />}>
          {mode === "icosahedron" ? (
            <WireframeIcosahedron
              autoRotate={!prefersReducedMotion}
              isDark={isDark}
            />
          ) : (
            <group position={[0, -0.1, 0]}>
              <DoctorModel
                autoRotate={!prefersReducedMotion}
                scale={1.48}
                wireframe={false}
              />
              {/* Subtle turntable ring beneath character */}
              <mesh position={[0, -1.42, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.72, 0.76, 48]} />
                <meshBasicMaterial color="#4361EE" transparent opacity={0.45} side={THREE.DoubleSide} />
              </mesh>
            </group>
          )}
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.85}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={(3 * Math.PI) / 4}
        />
      </Canvas>
    </div>
  );
}
