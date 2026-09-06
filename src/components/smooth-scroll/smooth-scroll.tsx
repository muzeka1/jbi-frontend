'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { getLenis } from '@/src/lib/lenis';

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = getLenis();

    if (!lenis) return;
    let animationFrame: number;

    function raf(time: number) {
      if (!lenis) return;
      lenis.raf(time);
      animationFrame = requestAnimationFrame(raf);
    }

    animationFrame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    const lenis = getLenis();

    if (!lenis) return;

    // Даем Next.js время обновить DOM
    requestAnimationFrame(() => {
      lenis.resize();
    });
  }, [pathname]);

  return children;
}