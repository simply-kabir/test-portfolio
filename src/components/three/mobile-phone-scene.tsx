"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Suspense } from "react";
import { MobilePhoneModel } from "./mobile-phone-model";

function ResponsivePhone() {
  const { viewport } = useThree();

  // Dynamically compute scale factor based on screen aspect ratio
  // Fits comfortably inside viewport whether portrait, landscape, tall, or squarish screens
  const isPortrait = viewport.aspect < 1;
  const targetScale = isPortrait
    ? Math.min(viewport.width / 2.3, viewport.height / 4.4)
    : Math.min(viewport.height / 3.8, 1.1);

  return (
    <group position={[0, 0, 0]} scale={targetScale}>
      <MobilePhoneModel />
    </group>
  );
}

export default function MobilePhoneScene() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={1.4} color="#F1EDE6" />
        <directionalLight position={[1.5, 1.5, 2.5]} intensity={2.2} color="#F1EDE6" />
        <directionalLight position={[-1.5, 1, 1.5]} intensity={1.0} color="#E8A33D" />
        <directionalLight position={[0, -1, 2]} intensity={0.5} color="#F1EDE6" />
        <Suspense fallback={null}>
          <ResponsivePhone />
        </Suspense>
      </Canvas>
    </div>
  );
}