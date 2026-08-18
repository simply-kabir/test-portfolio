const KEY_COLS = 12;
const KEY_ROWS = 3;
const KEY_SIZE = 0.09;
const KEY_GAP = 0.015;

export default function Keyboard() {
  const totalWidth = KEY_COLS * (KEY_SIZE + KEY_GAP);
  const totalDepth = (KEY_ROWS + 1) * (KEY_SIZE + KEY_GAP);

  const keys: [number, number, number][] = [];
  for (let r = 0; r < KEY_ROWS; r++) {
    for (let c = 0; c < KEY_COLS; c++) {
      const x = -totalWidth / 2 + c * (KEY_SIZE + KEY_GAP) + KEY_SIZE / 2;
      const z = -totalDepth / 2 + r * (KEY_SIZE + KEY_GAP) + KEY_SIZE / 2;
      // deterministic tiny height variance instead of Math.random, so it never jitters on re-render
      const h = 0.018 + (Math.sin(r * 12.9 + c * 4.3) * 0.5 + 0.5) * 0.004;
      keys.push([x, z, h]);
    }
  }

  return (
    <group position={[0, 0.02, 0.65]} rotation={[-0.05, 0, 0]}>
      {/* Base plate */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.55, 0.035, 0.62]} />
        <meshStandardMaterial color="#221e28" roughness={0.5} metalness={0.2} />
      </mesh>

      {/* Keycaps */}
      {keys.map(([x, z, h], i) => (
        <mesh key={i} position={[x, 0.017 + h / 2, z]} castShadow receiveShadow>
          <boxGeometry args={[KEY_SIZE * 0.85, h, KEY_SIZE * 0.85]} />
          <meshStandardMaterial color="#413a4c" roughness={0.25} metalness={0.35} />
        </mesh>
      ))}

      {/* Spacebar */}
      <mesh
        position={[0, 0.026, totalDepth / 2 - KEY_SIZE / 2 - KEY_GAP]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[totalWidth * 0.42, 0.02, KEY_SIZE * 0.8]} />
        <meshStandardMaterial color="#413a4c" roughness={0.25} metalness={0.35} />
      </mesh>
    </group>
  );
}