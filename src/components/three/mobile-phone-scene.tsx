"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { MobilePhoneModel } from "./mobile-phone-model";

export default function MobilePhoneScene() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={1.4} color="#F1EDE6" />
        <directionalLight position={[1.5, 1.5, 2.5]} intensity={2.2} color="#F1EDE6" />
        <directionalLight position={[-1.5, 1, 1.5]} intensity={1.0} color="#E8A33D" />
        <directionalLight position={[0, -1, 2]} intensity={0.5} color="#F1EDE6" />
        <Suspense fallback={null}>
          <MobilePhoneModel />
        </Suspense>
      </Canvas>
    </div>
  );
}