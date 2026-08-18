export const WHEEL_CONFIG = {
  // Elliptical radii — radiusY > radiusX creates a tall, narrow ellipse
  // that spreads icons vertically so more are visible at once.
  radiusX: 800,   // px — horizontal radius (how far left icons reach from center)
  radiusY: 900,   // px — vertical radius (vertical spread of the arc)

  // Container size must fit the larger axis
  get containerSize() {
    return Math.max(this.radiusX, this.radiusY) * 2;
  },

  rightOffsetPercent: 64, // % of containerSize parked off-canvas to the right
  visibleHalfArcDeg: 72,  // ± degrees from 180° treated as "visible arc" (up from 55)
  revolutionDurationSec: 60,
  entranceDurationSec: 1.6,
} as const;