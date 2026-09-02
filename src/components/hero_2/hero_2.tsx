'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/effect-fade';

import styles from './hero_2.module.css';

const slides = [
  'https://placehold.co/600x400/D54848/000000/png',
  'https://placehold.co/600x400/AAAAAA/000000/png',
  'https://placehold.co/600x400/000000/FFFFFF/png',
];

const COLUMNS = 3;
const ROWS = 2;

export default function Hero_2() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
  };

  return (
    <section className={styles.hero}>
      <Swiper
        modules={[EffectFade]}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        slidesPerView={1}
        speed={700}
        className={styles.swiper}
        onSlideChange={handleSlideChange}
      >
        {slides.map((image, slideIndex) => (
          <SwiperSlide key={image}>
            <div className={styles.grid}>
              {Array.from({ length: COLUMNS * ROWS }).map(
                (_, cellIndex) => {
                  const column = cellIndex % COLUMNS;
                  const row = Math.floor(cellIndex / COLUMNS);

                  return (
                    <div
                      key={cellIndex}
                      className={`${styles.cell} ${
                        activeIndex === slideIndex
                          ? styles.flip
                          : ''
                      }`}
                      style={
                        {
                          '--image': `url(${image})`,
                          '--column': column,
                          '--row': row,
                          '--delay': `${cellIndex * 60}ms`,
                        } as React.CSSProperties
                      }
                    />
                  );
                }
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}