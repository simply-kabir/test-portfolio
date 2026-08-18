import Lenis from "lenis";

let lenis: Lenis | null = null;

export function getLenis() {
  if (!lenis) {
    lenis = new Lenis({
      duration: 1.2,

      smoothWheel: true,

      touchMultiplier: 2,

      wheelMultiplier: 1,

      autoRaf: false,
    });
  }

  return lenis;
}