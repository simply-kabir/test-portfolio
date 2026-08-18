"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Lighting from "./lighting";
import WorkspaceShell from "./workspaceshell";
import CameraRig from "./camera-rig";

const mountStart = typeof performance !== "undefined" ? performance.now() : 0;
console.log(`[scene] module eval / mount start: 0ms`);

export default function SceneCanvas({ progress = 0 }: { progress?: number }) {
  const opacity = progress < 0.50 ? 1 : Math.max(0, 1 - (progress - 0.50) / 0.20);

  return (
    <div
      style={{
        opacity,
        visibility: opacity === 0 ? "hidden" : "visible",
        pointerEvents: opacity === 0 ? "none" : "auto",
        transition: "opacity 0.05s linear",
        width: "100%",
        height: "100%",
      }}
    >
      <Canvas
        frameloop={opacity === 0 ? "demand" : "always"}
        dpr={[1, 2]}
        shadows="soft"
        camera={{ position: [0, 1.3, 6.1], fov: 33, manual: true }}
        gl={{ antialias: true, alpha: true, toneMappingExposure: 1.25, powerPreference: "high-performance", }}
        style={{ width: "100%", height: "100%" }}
        onCreated={() => {
          console.log(`[scene] onCreated (WebGL context ready): ${(performance.now() - mountStart).toFixed(0)}ms`);
        }}
      >
        <Suspense fallback={null}>
          <Lighting />
          <WorkspaceShellLogged progress={progress} />
          <CameraRig progress={progress} />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Wrapper to log the very first useFrame tick (= first actual render)
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
function WorkspaceShellLogged(props: { progress: number }) {
  const logged = useRef(false);
  useFrame(() => {
    if (!logged.current) {
      logged.current = true;
      console.log(`[scene] first frame rendered: ${(performance.now() - mountStart).toFixed(0)}ms`);
    }
  });
  return <WorkspaceShell {...props} />;
}