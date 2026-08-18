export default function Mouse() {
  return (
    <group position={[0.95, 0.09, 0.68]}>
      <mesh scale={[0.1, 0.09, 0.17]} castShadow receiveShadow>
        <sphereGeometry args={[1, 24, 16]} />
        <meshStandardMaterial color="#413a4c" roughness={0.2} metalness={0.4} />
      </mesh>

      {/* Left/right button seam */}
      <mesh position={[0, 0.083, 0.02]} rotation={[0.1, 0, 0]}>
        <boxGeometry args={[0.002, 0.001, 0.13]} />
        <meshStandardMaterial color="#18151c" roughness={0.6} />
      </mesh>

      {/* Scroll wheel */}
      <mesh position={[0, 0.078, 0.06]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.011, 0.011, 0.018, 8]} />
        <meshStandardMaterial color="#18151c" roughness={0.5} />
      </mesh>
    </group>
  );
}