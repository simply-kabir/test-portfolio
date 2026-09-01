"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Suspense } from "react";
import { Center } from "@react-three/drei";
import { MobilePhoneModel } from "./mobile-phone-model";

function ResponsivePhone() {
  const { viewport } = useThree();

  // Exact bounds-based responsive scaling:
  // Unscaled phone dimensions: width = 1.438, height = 3.0
  // Target: occupy max 45% of visible viewport height and max 55% of visible viewport width
  const scale = Math.min(
    (viewport.width * 0.55) / 1.438,
    (viewport.height * 0.45) / 3.0
  );

  return (
    <Center>
      <group scale={scale}>
        <MobilePhoneModel />
      </group>
    </Center>
  );
}

export default function MobilePhoneScene() {
  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        className="w-full h-full"
        style={{ width: "100%", height: "100%" }}
      >
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