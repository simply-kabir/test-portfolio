"use client";

import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Suspense } from "react";

function PhoneModel() {
  const { scene } = useGLTF("/models/phone-test.glb");
  return <primitive object={scene} scale={1} />;
}

export default function PhoneTestPage() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#0a090c" }}>
      <Canvas camera={{ position: [0, 0, 3], fov: 40 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <Suspense fallback={null}>
          <PhoneModel />
        </Suspense>
      </Canvas>
    </div>
  );
}