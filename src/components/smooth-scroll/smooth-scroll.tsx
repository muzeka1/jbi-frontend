// 'use client';

// import { useEffect } from 'react';
// import Lenis from 'lenis';

// export default function SmoothScroll({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   useEffect(() => {
//     const lenis = new Lenis({
//       duration: 1.2,
//       smoothWheel: true,
//     });

//     let animationFrame: number;

//     function raf(time: number) {
//       lenis.raf(time);
//       animationFrame = requestAnimationFrame(raf);
//     }

//     animationFrame = requestAnimationFrame(raf);

//     return () => {
//       cancelAnimationFrame(animationFrame);
//       lenis.destroy();
//     };
//   }, []);

//   return children;
// }

'use client';

import { useEffect } from 'react';

import { getLenis } from '@/src/lib/lenis';

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = getLenis();

    if (!lenis) return;

    let animationFrame: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrame = requestAnimationFrame(raf);
    }

    animationFrame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return children;
}
