const LEG_POSITIONS: [number, number, number][] = [
  [1.6, -0.54, 0.8],
  [1.6, -0.54, -0.8],
  [-1.6, -0.54, 0.8],
  [-1.6, -0.54, -0.8],
];

export default function Desk() {
  return (
    <group>
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[3.6, 0.08, 2]} />
        <meshStandardMaterial color="#231c14" roughness={0.6} metalness={0.1} />
      </mesh>

      {LEG_POSITIONS.map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <cylinderGeometry args={[0.04, 0.035, 0.9, 8]} />
          <meshStandardMaterial color="#1a1510" roughness={0.5} metalness={0.3} />
        </mesh>
      ))}
    </group>
  );
}