"use client";

import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Suspense } from "react";
import { MeshStandardMaterial, Color, type Mesh } from "three";

function PhoneModel() {
  const { scene } = useGLTF("/models/phone-test.glb");

useEffect(() => {
  scene.traverse((child) => {
    const mesh = child as Mesh;
    if (!mesh.isMesh || !mesh.material) return;

    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

    for (const mat of materials) {
      if (mat instanceof MeshStandardMaterial && mat.name === "PhoneCase_Mat") {
        mat.color = new Color("#221e28");
        mat.metalness = 0.4; // testing this alone this time
      }
    }
  });
}, [scene]);

  return <primitive object={scene} scale={1.4} position={[0, -0.2, 0]} />;
}

export default function MobilePhoneScene() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas camera={{ position: [0, 0, 3], fov: 40 }}>
        <ambientLight intensity={0.6} color="#F1EDE6" />
        <directionalLight position={[2, 2, 2]} intensity={1.1} color="#F1EDE6" />
        <directionalLight position={[-1.5, 0.5, -1]} intensity={0.3} color="#E8A33D" />
        <Suspense fallback={null}>
          <PhoneModel />
        </Suspense>
      </Canvas>
    </div>
  );
}