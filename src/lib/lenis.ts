import Lenis from 'lenis';

let lenis: Lenis | null = null;

export function getLenis() {
  if (!lenis && typeof window !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });
  }

  return lenis;
}