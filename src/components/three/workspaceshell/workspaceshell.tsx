"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Object3D, Vector3 } from "three";
import type { Group, Mesh, SpotLight as SpotLightImpl } from "three";
import Desk from "./desk";
import Monitor from "./monitor";
import Keyboard from "./keyboard";
import Mouse from "./mouse";
import Plant from "./plant";
import Lamp from "./lamp";

const lampTarget = new Object3D();
const bulbWorldPos = new Vector3();
const targetWorldPos = new Vector3();

export default function WorkspaceShell({ progress = 0 }: { progress?: number }) {
  const groupRef = useRef<Group>(null);
  const bulbRef = useRef<Mesh>(null);
  const shadeRef = useRef<Group>(null);
  const spotRef = useRef<SpotLightImpl>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      // Fully damped out by progress 0.5 — well before the tight-margin zoom
      // zone (0.85-1), so it can never interfere with the dolly's framing.
      const damp = Math.max(0, 1 - progress / 0.5);
      groupRef.current.position.y = Math.sin(t * 0.6) * 0.02 * damp;
      groupRef.current.rotation.y = Math.sin(t * 0.25) * 0.04 * damp;
    }

    lampTarget.getWorldPosition(targetWorldPos);

    if (shadeRef.current) {
      shadeRef.current.lookAt(targetWorldPos);
    }

    if (bulbRef.current && spotRef.current) {
      bulbRef.current.getWorldPosition(bulbWorldPos);
      spotRef.current.position.copy(bulbWorldPos);
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.35, 0]} rotation={[0, -0.15, 0]} scale={1.15}>
      <Desk />
      <Monitor progress={progress} />
      <Keyboard />
      <Mouse />
      <Plant />
      <Lamp bulbRef={bulbRef} shadeRef={shadeRef} />

      <primitive object={lampTarget} position={[0.35, 0.03, 0.66]} />

      <spotLight
        ref={spotRef}
        target={lampTarget}
        angle={0.4}
        penumbra={0.6}
        intensity={2.8}
        distance={1.6}
        decay={2}
        color="#F1D9A8"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
    </group>
  );
}