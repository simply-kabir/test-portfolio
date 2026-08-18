export interface WheelPosition {
  x: number;
  y: number;
}

export function normalizeAngle(deg: number): number {
  const n = deg % 360;
  return n < 0 ? n + 360 : n;
}

export function baseAngleForIndex(index: number, total: number): number {
  return normalizeAngle((360 / total) * index);
}

export function positionOnWheel(angleDeg: number, radius: number): WheelPosition {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: radius * Math.cos(rad), y: radius * Math.sin(rad) };
}

export function angularDistance(a: number, b: number): number {
  const diff = Math.abs(normalizeAngle(a) - normalizeAngle(b)) % 360;
  return diff > 180 ? 360 - diff : diff;
}

export const VISIBLE_ARC_CENTER = 180;

/** 0 at the visible arc's center, 1 at/after its edge. */
export function falloff(angleDeg: number, halfArcWidth: number): number {
  const dist = angularDistance(angleDeg, VISIBLE_ARC_CENTER);
  return Math.min(dist / halfArcWidth, 1);
}

/**
 * Given the current rotation offset, which skill index sits closest to
 * the visible arc's center right now. Drives the info panel + active glow.
 */
export function nearestIndexToVisibleCenter(rotationOffset: number, total: number): number {
  const spacing = 360 / total;
  const target = normalizeAngle(VISIBLE_ARC_CENTER - rotationOffset);
  return Math.round(target / spacing) % total;
}