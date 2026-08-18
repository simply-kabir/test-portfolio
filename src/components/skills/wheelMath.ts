/**
 * Mathematical calculations for positioning skill icons on a rotating circular wheel.
 */

export interface IconPosition {
  x: number;
  y: number;
  angleRad: number;
  angleDeg: number;
}

export function calculateIconPosition(
  index: number,
  total: number,
  radius: number,
  rotationAngleDeg: number
): IconPosition {
  // Angle step between consecutive icons in radians
  const stepAngleRad = (2 * Math.PI) / total;
  
  // Icon angle = base step * index + total wheel rotation angle
  const iconAngleRad = index * stepAngleRad + (rotationAngleDeg * Math.PI) / 180;

  // Convert polar coordinates (radius, angle) to Cartesian coordinates (x, y)
  const x = radius * Math.cos(iconAngleRad);
  const y = radius * Math.sin(iconAngleRad);

  return {
    x,
    y,
    angleRad: iconAngleRad,
    angleDeg: (iconAngleRad * 180) / Math.PI,
  };
}

/**
 * Calculates how close an icon is to the visible focus point on the arc.
 * Focus point: West edge (180° / Math.PI radians), facing the left information panel.
 */
export function getIconProximityToFocus(angleRad: number): number {
  const focusAngleRad = Math.PI; // 180 degrees (West edge facing left text panel)

  // Normalize angle difference to [-Math.PI, Math.PI]
  let diff = (angleRad - focusAngleRad) % (2 * Math.PI);
  if (diff > Math.PI) diff -= 2 * Math.PI;
  if (diff < -Math.PI) diff += 2 * Math.PI;

  return Math.abs(diff); // Distance in radians from focus point
}
