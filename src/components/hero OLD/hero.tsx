
'use client';

import { useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/effect-fade';

import styles from './hero.module.css';

const slides = [
  '/images/renders/1.jpg',
  '/images/renders/2.jpg',
];

const COLUMNS = 12;
const ROWS = 1;

const SLIDE_DURATION = 0.9;
const STAGGER = 0.09;

const SLIDE_CHANGE_DELAY = 0;

const AUTOPLAY_DELAY = 5000;

const shuffle = <T,>(array: T[]) => {
  return [...array]
};
export default function Hero() {
  const swiperRef = useRef<SwiperType | null>(null);
  const isAnimating = useRef(false);
  const slideChangeTimeout = useRef<gsap.core.Tween | null>(null);


  const animateSlideIn = useCallback(
    (slideElement: HTMLElement) => {
      const cells = Array.from(
        slideElement.querySelectorAll<HTMLElement>(
          `.${styles.cell}`
        )
      );

      if (!cells.length) {
        isAnimating.current = false;
        return;
      }

      const randomCells = shuffle(cells);

      // Новый слайд сначала полностью закрыт.
      gsap.set(cells, {
        rotateY: -180,
        opacity: 0,
      });

      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating.current = false;
        },
      });

      tl.to(
        randomCells,
        {
          rotateY: 0,
          duration: SLIDE_DURATION,
          stagger: STAGGER,
          ease: 'none'
        },
        0
      );

      tl.to(
        randomCells,
        {
          opacity: 1,
          duration: SLIDE_DURATION * 2,
          stagger: STAGGER,
          ease: 'power1.inOut',
        },
        0
      );


    },
    []
  );

  const goToNextSlide = useCallback(() => {
    const swiper = swiperRef.current;

    if (!swiper || isAnimating.current) {
      return;
    }

    const currentSlide = swiper.slides[
      swiper.activeIndex
    ] as HTMLElement | undefined;

    if (!currentSlide) {
      return;
    }

    const cells = Array.from(
      currentSlide.querySelectorAll<HTMLElement>(
        `.${styles.cell}`
      )
    );

    if (!cells.length) {
      swiper.slideNext();
      return;
    }

    isAnimating.current = true;

    const randomCells = shuffle(cells);

    /**
     * Старый слайд начинает закрываться.
     */

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
      },
    });

    tl.to(
      randomCells,
      {
        rotateY: -180,
        duration: SLIDE_DURATION,
        stagger: STAGGER,
        ease: 'none'
      },
      0
    );

    tl.to(
      randomCells,
      {
        opacity: 0,
        duration: SLIDE_DURATION / 2,
        stagger: STAGGER,
        ease: 'power1.out',
      },
      0
    );

    slideChangeTimeout.current?.kill();
    swiper.slideNext();

  }, []);

  const handleSlideChange = useCallback(
    (swiper: SwiperType) => {
      const activeSlide = swiper.slides[
        swiper.activeIndex
      ] as HTMLElement | undefined;

      if (!activeSlide) {
        isAnimating.current = false;
        return;
      }

      animateSlideIn(activeSlide);
    },
    [animateSlideIn]
  );

  const handleSwiper = useCallback(
    (swiper: SwiperType) => {
      swiperRef.current = swiper;

      /**
       * Начальное состояние первого слайда.
       */
      const activeSlide = swiper.slides[
        swiper.activeIndex
      ] as HTMLElement | undefined;

      if (activeSlide) {
        animateSlideIn(activeSlide);
      }
    },
    [animateSlideIn]
  );


  useEffect(() => {
    const interval = window.setInterval(() => {
      goToNextSlide();
    }, AUTOPLAY_DELAY);

    return () => {
      window.clearInterval(interval);
      slideChangeTimeout.current?.kill();
    };
  }, [goToNextSlide]);

  return (
    <section className={styles.hero}>
      <Swiper
        modules={[EffectFade]}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        slidesPerView={1}
        loop
        className={styles.swiper}
        onSwiper={handleSwiper}
        onSlideChange={handleSlideChange}
      >
        {slides.map((image) => (
          <SwiperSlide key={image}>
            <div
              className={styles.grid}
              style={
                {
                  '--columns': COLUMNS,
                  '--rows': ROWS,
                } as React.CSSProperties
              }
            >
              {Array.from({
                length: COLUMNS * ROWS,
              }).map((_, cellIndex) => {
                const column = cellIndex % COLUMNS;
                const row = Math.floor(
                  cellIndex / COLUMNS
                );

                /**
                 * Позиция фоновой картинки.
                 */
                const backgroundX = (column / (COLUMNS - 1)) * 100;

                const backgroundY =
                  ROWS === 1
                    ? 0
                    : (row / (ROWS - 1)) * 100;

                return (
                  <div
                    key={cellIndex}
                    className={styles.cell}
                    style={{
                      '--image': `url(${image})`,
                      '--column': column,
                      '--row': row,
                      '--background-x': `${backgroundX}%`,
                      '--background-y': `${backgroundY}%`,
                    } as React.CSSProperties}
                  />
                );
              })}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}