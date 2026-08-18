"use client";

export default function Lighting() {
  return (
    <>
      <ambientLight intensity={0.24} color="#F1EDE6" />

      <directionalLight
        position={[2.5, 4, 3]}
        intensity={1.0}
        color="#F1EDE6"
      />

      {/* Soft wide overhead fill — makes the whole setup visible, no hard shadow edge */}
      <spotLight
        position={[0.2, 3.8, 0.6]}
        angle={0.85}
        penumbra={1}
        intensity={2.6}
        distance={8}
        decay={1.2}
        color="#F0E6D3"
      />

      <pointLight
        position={[-1.8, 1.6, -1.2]}
        intensity={0.45}
        distance={6}
        decay={2}
        color="#B8823A"
      />

      <pointLight
        position={[0, -1, 2]}
        intensity={0.1}
        distance={5}
        decay={2}
        color="#F1EDE6"
      />

      <pointLight
        position={[0.4, 0.5, 1.2]}
        intensity={0.22}
        distance={2.5}
        decay={2}
        color="#F1EDE6"
      />
    </>
  );
}