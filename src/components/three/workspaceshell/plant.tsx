"use client";

import { useMemo } from "react";
import {
  BufferGeometry,
  Float32BufferAttribute,
  CanvasTexture,
  RepeatWrapping,
  DoubleSide,
  CatmullRomCurve3,
  Vector3,
  TubeGeometry,
} from "three";

// Generate Ceramic pot surface micro-bump map
function createCeramicBumpTexture() {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "#808080";
  ctx.fillRect(0, 0, 256, 256);

  // Fine ceramic clay grain noise
  for (let i = 0; i < 9000; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    const val = 122 + Math.floor(Math.random() * 24);
    ctx.fillStyle = `rgb(${val},${val},${val})`;
    ctx.fillRect(x, y, 1.5, 1.5);
  }

  // Micro surface wear
  for (let i = 0; i < 14; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    ctx.strokeStyle = Math.random() < 0.5 ? "#686868" : "#949494";
    ctx.lineWidth = 0.7;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + (Math.random() - 0.5) * 16, y + (Math.random() - 0.5) * 16);
    ctx.stroke();
  }

  const texture = new CanvasTexture(canvas);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}

// Generate Alocasia Frydek leaf texture (deep velvet green with prominent silvery white veins)
function createAlocasiaTexture(baseGreen: string, veinColor: string) {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Rich velvet dark green base
  ctx.fillStyle = baseGreen;
  ctx.fillRect(0, 0, 256, 512);

  // Velvety subtle noise
  for (let i = 0; i < 3500; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 512;
    ctx.fillStyle = Math.random() < 0.5 ? "rgba(10,18,12,0.2)" : "rgba(35,55,30,0.15)";
    ctx.fillRect(x, y, 1.5, 1.5);
  }

  // Central silvery-white midrib vein
  ctx.strokeStyle = veinColor;
  ctx.lineWidth = 4.5;
  ctx.shadowColor = veinColor;
  ctx.shadowBlur = 3;
  ctx.beginPath();
  ctx.moveTo(128, 500);
  ctx.lineTo(128, 24);
  ctx.stroke();

  // Lateral side veins branching out
  const lateralVeins = [
    { y: 440, spanX: 70, angleY: -22 },
    { y: 370, spanX: 95, angleY: -32 },
    { y: 290, spanX: 105, angleY: -42 },
    { y: 210, spanX: 92, angleY: -48 },
    { y: 140, spanX: 72, angleY: -52 },
    { y: 80, spanX: 45, angleY: -56 },
  ];

  ctx.lineWidth = 2.6;
  for (const v of lateralVeins) {
    // Left branch
    ctx.beginPath();
    ctx.moveTo(128, v.y);
    ctx.quadraticCurveTo(128 - v.spanX * 0.5, v.y + v.angleY * 0.6, 128 - v.spanX, v.y + v.angleY);
    ctx.stroke();

    // Right branch
    ctx.beginPath();
    ctx.moveTo(128, v.y);
    ctx.quadraticCurveTo(128 + v.spanX * 0.5, v.y + v.angleY * 0.6, 128 + v.spanX, v.y + v.angleY);
    ctx.stroke();
  }

  // Faint pale margin outline
  ctx.strokeStyle = "rgba(180, 215, 165, 0.25)";
  ctx.lineWidth = 1.2;
  ctx.shadowBlur = 0;
  ctx.strokeRect(4, 4, 248, 504);

  const texture = new CanvasTexture(canvas);
  return texture;
}

// Construct Alocasia peltate / arrowhead leaf geometry (posterior lobes, apex taper, V-fold & edge wave)
function createAlocasiaLeafGeometry(
  length: number,
  width: number,
  archAmount: number,
  vFold: number
) {
  const geom = new BufferGeometry();
  const segmentsY = 24;
  const segmentsX = 12;

  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let iy = 0; iy <= segmentsY; iy++) {
    const v = iy / segmentsY;
    const yLocal = v * length;

    // Arrowhead width envelope
    let widthFactor = 1;
    if (v < 0.15) {
      widthFactor = (v / 0.15) * 0.8 + 0.2;
    } else if (v < 0.4) {
      widthFactor = 0.8 + 0.2 * (1 - (v - 0.15) / 0.25);
    } else {
      widthFactor = Math.pow(1 - (v - 0.4) / 0.6, 1.3);
    }
    const currentWidth = width * widthFactor;

    // Downward arch along length
    const zArch = -Math.sin(v * Math.PI) * archAmount * length;

    for (let ix = 0; ix <= segmentsX; ix++) {
      const u = ix / segmentsX;
      const xLocal = (u - 0.5) * currentWidth;

      // Concave V-fold along midrib
      const distFromCenter = Math.abs(u - 0.5) * 2;
      const vFoldZ = Math.pow(distFromCenter, 1.2) * vFold * width;

      // Subtle edge wave / margin rippling
      const edgeRipple = Math.sin(v * Math.PI * 8 + (u > 0.5 ? 1 : -1)) * (width * 0.03) * (1 - v);

      const x = xLocal;
      const z = zArch + vFoldZ + edgeRipple;

      positions.push(x, yLocal, z);
      uvs.push(u, v);
    }
  }

  const stride = segmentsX + 1;
  for (let iy = 0; iy < segmentsY; iy++) {
    for (let ix = 0; ix < segmentsX; ix++) {
      const a = iy * stride + ix;
      const b = (iy + 1) * stride + ix;
      const c = (iy + 1) * stride + (ix + 1);
      const d = iy * stride + (ix + 1);

      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  geom.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geom.setAttribute("uv", new Float32BufferAttribute(uvs, 2));
  geom.setIndex(indices);
  geom.computeVertexNormals();

  return geom;
}

interface AlocasiaLeafConfig {
  length: number;
  width: number;
  arch: number;
  vFold: number;
  stemStartX: number;
  stemStartZ: number;
  stemEndX: number;
  stemEndY: number;
  stemEndZ: number;
  leafPitch: number;
  leafYaw: number;
  leafRoll: number;
  baseColor: string;
  veinColor: string;
}

const ALOCASIA_CONFIGS: AlocasiaLeafConfig[] = [
  // Large mature upper canopy leaves
  { length: 0.28, width: 0.17, arch: 0.22, vFold: 0.18, stemStartX: 0.01, stemStartZ: 0.01, stemEndX: 0.06, stemEndY: 0.52, stemEndZ: 0.04, leafPitch: 0.45, leafYaw: 0.2, leafRoll: 0.05, baseColor: "#1A2E1C", veinColor: "#E0ECD8" },
  { length: 0.26, width: 0.16, arch: 0.24, vFold: 0.20, stemStartX: -0.02, stemStartZ: 0.02, stemEndX: -0.08, stemEndY: 0.48, stemEndZ: 0.06, leafPitch: 0.50, leafYaw: 1.2, leafRoll: -0.08, baseColor: "#182A1A", veinColor: "#D6E8CD" },
  { length: 0.27, width: 0.165, arch: 0.20, vFold: 0.16, stemStartX: 0.02, stemStartZ: -0.02, stemEndX: 0.09, stemEndY: 0.50, stemEndZ: -0.07, leafPitch: 0.42, leafYaw: 2.3, leafRoll: 0.10, baseColor: "#1C301D", veinColor: "#E2F0DA" },
  { length: 0.24, width: 0.15, arch: 0.26, vFold: 0.22, stemStartX: -0.01, stemStartZ: -0.03, stemEndX: -0.07, stemEndY: 0.45, stemEndZ: -0.08, leafPitch: 0.55, leafYaw: 3.5, leafRoll: -0.06, baseColor: "#162817", veinColor: "#D8EACF" },

  // Medium mid-tier leaves
  { length: 0.21, width: 0.135, arch: 0.28, vFold: 0.24, stemStartX: 0.03, stemStartZ: 0.03, stemEndX: 0.12, stemEndY: 0.40, stemEndZ: 0.10, leafPitch: 0.65, leafYaw: 0.7, leafRoll: 0.12, baseColor: "#1E331F", veinColor: "#DEF0D6" },
  { length: 0.22, width: 0.14, arch: 0.30, vFold: 0.22, stemStartX: -0.03, stemStartZ: 0.04, stemEndX: -0.13, stemEndY: 0.42, stemEndZ: 0.11, leafPitch: 0.60, leafYaw: 1.8, leafRoll: -0.14, baseColor: "#1B2C1C", veinColor: "#D4E6CC" },
  { length: 0.20, width: 0.13, arch: 0.32, vFold: 0.25, stemStartX: 0.04, stemStartZ: -0.04, stemEndX: 0.14, stemEndY: 0.38, stemEndZ: -0.12, leafPitch: 0.70, leafYaw: 2.9, leafRoll: 0.15, baseColor: "#203621", veinColor: "#E4F2DC" },
  { length: 0.19, width: 0.125, arch: 0.34, vFold: 0.26, stemStartX: -0.04, stemStartZ: -0.04, stemEndX: -0.12, stemEndY: 0.36, stemEndZ: -0.11, leafPitch: 0.72, leafYaw: 4.1, leafRoll: -0.12, baseColor: "#192B19", veinColor: "#D8EACC" },

  // Younger lower shoots
  { length: 0.15, width: 0.10, arch: 0.36, vFold: 0.28, stemStartX: 0.05, stemStartZ: 0.05, stemEndX: 0.16, stemEndY: 0.30, stemEndZ: 0.14, leafPitch: 0.85, leafYaw: 5.0, leafRoll: 0.18, baseColor: "#2A442B", veinColor: "#EBF8E3" },
  { length: 0.14, width: 0.095, arch: 0.38, vFold: 0.30, stemStartX: -0.05, stemStartZ: 0.05, stemEndX: -0.15, stemEndY: 0.28, stemEndZ: 0.13, leafPitch: 0.88, leafYaw: 5.8, leafRoll: -0.16, baseColor: "#2D472E", veinColor: "#EDFAE5" },
  { length: 0.16, width: 0.105, arch: 0.35, vFold: 0.27, stemStartX: 0.04, stemStartZ: -0.05, stemEndX: 0.15, stemEndY: 0.32, stemEndZ: -0.13, leafPitch: 0.80, leafYaw: 3.1, leafRoll: 0.14, baseColor: "#284129", veinColor: "#E8F5E0" },
  { length: 0.13, width: 0.09, arch: 0.40, vFold: 0.32, stemStartX: -0.04, stemStartZ: -0.05, stemEndX: -0.14, stemEndY: 0.26, stemEndZ: -0.12, leafPitch: 0.90, leafYaw: 1.5, leafRoll: -0.20, baseColor: "#304B31", veinColor: "#EFFCE7" },
];

export default function Plant() {
  const bumpTexture = useMemo(() => createCeramicBumpTexture(), []);

  const items = useMemo(() => {
    return ALOCASIA_CONFIGS.map((cfg) => {
      const leafGeom = createAlocasiaLeafGeometry(
        cfg.length,
        cfg.width,
        cfg.arch,
        cfg.vFold
      );
      const texture = createAlocasiaTexture(cfg.baseColor, cfg.veinColor);

      // Arching petiole stem curve
      const p1 = new Vector3(cfg.stemStartX, 0.31, cfg.stemStartZ);
      const p2 = new Vector3(
        (cfg.stemStartX + cfg.stemEndX) * 0.5,
        0.31 + cfg.stemEndY * 0.55,
        (cfg.stemStartZ + cfg.stemEndZ) * 0.5
      );
      const p3 = new Vector3(cfg.stemEndX, 0.31 + cfg.stemEndY, cfg.stemEndZ);

      const curve = new CatmullRomCurve3([p1, p2, p3]);
      const stemGeom = new TubeGeometry(curve, 16, 0.0055, 8, false);

      return { leafGeom, texture, stemGeom, p3, cfg };
    });
  }, []);

  return (
    <group position={[-1.2, 0, 0.15]}>
      {/* Premium Matte Ceramic / Terracotta Pot Main Body */}
      <mesh position={[0, 0.16, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.165, 0.135, 0.32, 32]} />
        <meshStandardMaterial
          color="#2C2825"
          roughness={0.85}
          metalness={0.03}
          bumpMap={bumpTexture || undefined}
          bumpScale={0.0025}
        />
      </mesh>

      {/* Pot Top Rim Lip */}
      <mesh position={[0, 0.32, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <torusGeometry args={[0.162, 0.014, 16, 32]} />
        <meshStandardMaterial
          color="#2C2825"
          roughness={0.82}
          metalness={0.03}
          bumpMap={bumpTexture || undefined}
          bumpScale={0.002}
        />
      </mesh>

      {/* Dark Soil Base Layer */}
      <mesh position={[0, 0.31, 0]}>
        <cylinderGeometry args={[0.155, 0.155, 0.03, 32]} />
        <meshStandardMaterial color="#1a1512" roughness={0.96} />
      </mesh>

      {/* Alocasia Frydek Petioles & Broad Leaves */}
      {items.map(({ leafGeom, texture, stemGeom, p3, cfg }, i) => (
        <group key={i}>
          {/* Arching Stem (Petiole) */}
          <mesh geometry={stemGeom} castShadow receiveShadow>
            <meshStandardMaterial color="#2B4029" roughness={0.55} />
          </mesh>

          {/* Peltate Arrowhead Leaf Blade */}
          <mesh
            geometry={leafGeom}
            position={[p3.x, p3.y, p3.z]}
            rotation={[cfg.leafPitch, cfg.leafYaw, cfg.leafRoll]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial
              map={texture || undefined}
              roughness={0.38}
              metalness={0.04}
              side={DoubleSide}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}