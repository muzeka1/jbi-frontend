'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

import styles from './image-slider.module.css';

type Props = {
  images: string[];
  duration: number;
  interval: number;
};

export default function RevealImageSlider({
  images,
  duration,
  interval,
}: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);

  const nextImageRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      if (isAnimating.current) return;

      const next = (activeIndex + 1) % images.length;

      setNextIndex(next);
      isAnimating.current = true;
    }, interval);

    return () => clearInterval(timer);
  }, [activeIndex, images.length, interval]);

  useEffect(() => {
    if (nextIndex === null || !nextImageRef.current) return;

    const element = nextImageRef.current;

    gsap.fromTo(
      element,
      {
        clipPath: 'inset(0 100% 0 0)',
      },
      {
        clipPath: 'inset(0 0% 0 0)',
        duration,
        ease: 'power3.inOut',
        onComplete: () => {
          setActiveIndex(nextIndex);
          setNextIndex(null);
          isAnimating.current = false;
        },
      }
    );
  }, [nextIndex, duration]);

  if (!images.length) return null;

  return (
    <div className={styles.wrapper}>
      {/* Текущая картинка — всегда снизу */}
      <div className={styles.image}>
        <Image
          src={images[activeIndex]}
          alt=""
          fill
          sizes="100vw"
          priority
        />
      </div>

      {/* Следующая картинка — поверх текущей */}
      {nextIndex !== null && (
        <div
          ref={nextImageRef}
          className={`${styles.image} ${styles.nextImage}`}
        >
          <Image
            src={images[nextIndex]}
            alt=""
            fill
            sizes="100vw"
            priority
          />
        </div>
      )}
    </div>
  );
}