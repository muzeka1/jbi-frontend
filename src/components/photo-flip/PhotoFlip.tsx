'use client';

import gsap from 'gsap';
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import styles from './PhotoFlip.module.css';

type PhotoFlipProps = {
  interval?: number;
  duration?: number;
  columns?: number;
  className?: string;
};

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const images = [
  '/images/renders/1.jpg',
  '/images/renders/2.jpg',
];

type PhotoFlipInnerProps = Omit<PhotoFlipProps, 'className'> & {
  className?: string;
};

function PhotoFlipInner({
  interval = 2000,
  duration = 8,
  columns = 14,
  className,
}: PhotoFlipInnerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentLayerRef = useRef<HTMLDivElement>(null);
  const nextLayerRef = useRef<HTMLDivElement>(null);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scheduleNextRef = useRef<(() => void) | null>(null);
  const currentIndexRef = useRef(0);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);

  /**
   * Создаём плитки для одного изображения.
   */
  const createTiles = (image: string) => {
    return Array.from({ length: columns }, (_, index) => (
      <div
        key={index}
        className={styles.tile}
        style={
          {
            '--tile-index': index,
            '--columns': columns,
            '--image': `url("${image}")`,
          } as React.CSSProperties
        }
      />
    ));
  };

  /**
   * Первый запуск.
   */

  useIsomorphicLayoutEffect(() => {
    const currentLayer = currentLayerRef.current;

    if (!currentLayer || images.length === 0) {
      return;
    }

    const tiles = currentLayer.querySelectorAll<HTMLElement>(
      `.${styles.tile}`,
    );

    gsap.set(tiles, {
      rotateY: 0,
      transformOrigin: 'center center',
      opacity: 1,
    });

    function scheduleNext() {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        const current = currentIndexRef.current % images.length;
        const next = (current + 1) % images.length;

        setNextIndex(next);
      }, interval);
    }

    scheduleNext();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      gsap.killTweensOf(tiles);
    };
  }, [interval, columns]);

  /**
   * Анимация нового ряда плиток.
   */
  useIsomorphicLayoutEffect(() => {
    if (
      nextIndex === null ||
      !nextLayerRef.current
    ) {
      return;
    }

    const nextLayer = nextLayerRef.current;

    const tiles = nextLayer.querySelectorAll<HTMLElement>(
      `.${styles.tile}`,
    );

    gsap.set(tiles, {
      rotateY: -180,
      opacity: 0,
      transformOrigin: 'center center',
    });

    const gap = 0.4;

    const animation = gsap.timeline({
      onComplete: () => {
        currentIndexRef.current = nextIndex;

        setCurrentIndex(nextIndex);
        setNextIndex(null);

        scheduleNextRef.current?.();
      },
    });

    animation.to(
      tiles,
      {
        opacity: 1,
        duration: duration / 2,
        ease: 'power2.out',
        stagger: duration / (columns * 2),
      },
      gap,
    );

    animation.to(
      tiles,
      {
        rotateY: 0,
        duration: duration / 2,
        ease: 'power3.inOut',
        stagger: duration / (columns * 2),
      },
      0,
    );

    return () => {
      animation.kill();
      gsap.killTweensOf(tiles);
    };
  }, [nextIndex, duration, columns]);

  if (!images.length) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${className ?? ''}`}
      style={
        {
          '--columns': columns,
        } as React.CSSProperties
      }
    >
      {/* Текущая фотография */}
      <div
        ref={currentLayerRef}
        className={styles.layer}
      >
        {createTiles(images[currentIndex])}
      </div>

      {/* Следующая фотография */}
      {nextIndex !== null && (
        <div
          ref={nextLayerRef}
          className={`${styles.layer} ${styles.nextLayer}`}
        >
          {createTiles(images[nextIndex])}
        </div>
      )}
    </div>
  );
}

export default function PhotoFlip({
  interval = 2000,
  duration = 3,
  columns = 14,
  className,
}: PhotoFlipProps) {
  const imagesKey = JSON.stringify(images);

  return (
    <PhotoFlipInner
      key={imagesKey}
      interval={interval}
      duration={duration}
      columns={columns}
      className={className}
    />
  );
}