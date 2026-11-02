"use client";

import React, { useMemo, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Center, useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface DoctorModelProps {
  wireframe?: boolean;
  autoRotate?: boolean;
  scale?: number;
}

export default function DoctorModel({
  wireframe = false,
  autoRotate = true,
  scale = 1.45,
}: DoctorModelProps) {
  const { scene } = useGLTF("/models/doctor.glb");
  const groupRef = useRef<THREE.Group>(null);

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (Array.isArray(mesh.material)) {
          mesh.material = mesh.material.map((m) => m.clone());
        } else if (mesh.material) {
          mesh.material = mesh.material.clone();
        }
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
    return clone;
  }, [scene]);

  useEffect(() => {
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        mats.forEach((mat) => {
          if (mat && "wireframe" in mat) {
            (mat as THREE.MeshStandardMaterial).wireframe = wireframe;
          }
        });
      }
    });
  }, [clonedScene, wireframe]);

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.45;
    }
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={clonedScene} scale={scale} />
      </Center>
    </group>
  );
}
