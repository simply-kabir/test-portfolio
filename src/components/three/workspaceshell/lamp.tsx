"use client";

import type { RefObject } from "react";
import type { Group, Mesh } from "three";

type LampProps = {
  bulbRef: RefObject<Mesh | null>;
  shadeRef: RefObject<Group | null>;
};

export default function Lamp({ bulbRef, shadeRef }: LampProps) {
  return (
    <group position={[1.55, 0.02, 0.15]} rotation={[0, -0.9, 0]}>
      {/* Base — domed, with a thin ring lip */}
      <mesh position={[0, 0.012, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.12, 0.14, 0.03, 28]} />
        <meshStandardMaterial color="#18151c" roughness={0.35} metalness={0.65} />
      </mesh>
      <mesh position={[0, 0.03, 0]} castShadow>
        <sphereGeometry args={[0.09, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#1e1a24" roughness={0.3} metalness={0.7} />
      </mesh>

      <group position={[0, 0.05, 0]} rotation={[0, 0, 0.6]}>
        {/* Lower arm — tapered, thicker at the base */}
        <mesh position={[0, 0.22, 0]} castShadow>
          <cylinderGeometry args={[0.014, 0.02, 0.44, 12]} />
          <meshStandardMaterial color="#221e28" roughness={0.3} metalness={0.7} />
        </mesh>

        {/* Elbow knuckle — bigger joint + collar ring */}
        <mesh position={[0, 0.44, 0]} castShadow>
          <sphereGeometry args={[0.045, 20, 20]} />
          <meshStandardMaterial color="#2c2735" roughness={0.25} metalness={0.75} />
        </mesh>
        <mesh position={[0, 0.44, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <torusGeometry args={[0.045, 0.008, 10, 20]} />
          <meshStandardMaterial color="#3a3345" roughness={0.2} metalness={0.8} />
        </mesh>

        <group position={[0, 0.44, 0]} rotation={[0, 0, 1.55]}>
          {/* Upper arm — slightly thinner, still tapered */}
          <mesh position={[0, 0.18, 0]} castShadow>
            <cylinderGeometry args={[0.012, 0.017, 0.36, 12]} />
            <meshStandardMaterial color="#221e28" roughness={0.3} metalness={0.7} />
          </mesh>

          {/* Head knuckle */}
          <mesh position={[0, 0.36, 0]} castShadow>
            <sphereGeometry args={[0.036, 20, 20]} />
            <meshStandardMaterial color="#2c2735" roughness={0.25} metalness={0.75} />
          </mesh>
          <mesh position={[0, 0.36, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <torusGeometry args={[0.036, 0.007, 10, 20]} />
            <meshStandardMaterial color="#3a3345" roughness={0.2} metalness={0.8} />
          </mesh>

          <group ref={shadeRef} position={[0, 0.36, 0]}>
            {/* Shade — short and wide (bowl), not tall and narrow */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} castShadow>
              <coneGeometry args={[0.135, 0.1, 24, 1, true]} />
              <meshStandardMaterial color="#141018" roughness={0.3} metalness={0.55} side={2} />
            </mesh>

            {/* Rim highlight at the shade's open edge */}
            <mesh position={[0, 0, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.135, 0.004, 8, 28]} />
              <meshStandardMaterial color="#4a4258" roughness={0.2} metalness={0.8} />
            </mesh>

            <mesh ref={bulbRef} position={[0, 0, 0.06]}>
              <circleGeometry args={[0.11, 24]} />
              <meshStandardMaterial
                color="#F1EDE6"
                emissive="#E8A33D"
                emissiveIntensity={1.3}
                roughness={0.2}
              />
            </mesh>

            <pointLight
              position={[0, 0, 0.06]}
              intensity={0.1}
              distance={0.6}
              decay={2}
              color="#E8A33D"
            />
          </group>
        </group>
      </group>
    </group>
  );
}