"use client";

import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, useProgress } from "@react-three/drei";
import * as THREE from "three";
import DoctorModel from "@/components/three/DoctorModel";

function ModalLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-white px-4 py-2.5 shadow-md">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#4361EE] border-t-transparent" />
        <span className="font-mono text-xs font-medium text-[#1A1A2E]">
          Streaming 3D Rig ({Math.round(progress)}%)
        </span>
      </div>
    </Html>
  );
}

export default function ModalDoctorCanvas({
  prefersReducedMotion,
}: {
  prefersReducedMotion: boolean;
}) {
  const [wireframe, setWireframe] = useState(false);

  return (
    <div className="relative h-[340px] w-full overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-b from-[#F8FAFC] to-[#EEF2FF] sm:h-[400px] dark:border-white/10 dark:from-[#151525] dark:to-[#1E1E36]">
      {/* Top bar badges & wireframe toggle */}
      <div className="pointer-events-none absolute left-4 right-4 top-4 z-10 flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#1A1A2E] shadow-sm backdrop-blur dark:bg-[#0F0F1A]/90 dark:text-white">
          <span className="h-2 w-2 rounded-full bg-[#01ACB2]" />
          Live 3D Asset · doctor_in_a_white_coat.glb
        </span>

        <button
          type="button"
          onClick={() => setWireframe((w) => !w)}
          className="pointer-events-auto rounded-full border border-gray-200 bg-white/95 px-3 py-1 text-xs font-semibold text-[#1A1A2E] shadow-sm transition hover:border-[#4361EE] hover:text-[#4361EE] dark:border-white/15 dark:bg-[#0F0F1A]/90 dark:text-white"
        >
          {wireframe ? "Switch to PBR Shaded" : "Inspect Mesh Wireframe"}
        </button>
      </div>

      <Canvas
        camera={{ position: [0, 0.2, 3.8], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.4} />
        <hemisphereLight args={["#ffffff", "#cbd5e1", 1.15]} />
        <directionalLight position={[4, 6, 5]} intensity={1.9} />
        <directionalLight position={[-4, 2, -4]} intensity={0.85} color="#01ACB2" />

        <Suspense fallback={<ModalLoader />}>
          <group position={[0, -0.08, 0]}>
            <DoctorModel
              wireframe={wireframe}
              autoRotate={!prefersReducedMotion}
              scale={1.42}
            />
            <mesh position={[0, -1.38, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.75, 0.8, 64]} />
              <meshBasicMaterial
                color="#01ACB2"
                transparent
                opacity={0.5}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        </Suspense>

        <OrbitControls
          enablePan={false}
          minDistance={2.3}
          maxDistance={5.5}
          rotateSpeed={0.9}
        />
      </Canvas>

      <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white/85 px-3 py-1 text-[11px] font-medium text-[#6B7280] backdrop-blur dark:bg-[#0F0F1A]/80 dark:text-gray-300">
        Drag to rotate 360° · Scroll/pinch to zoom
      </div>
    </div>
  );
}
