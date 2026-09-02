'use client';

import { useEffect, useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';

import styles from './projects.module.css';

const PROJECT_COUNT = 5;

const projects = [
    { id: 1, color: '#D54848' },
    { id: 2, color: '#4A6FA5' },
    { id: 3, color: '#5C8D6A' },
    { id: 4, color: '#B58B3A' },
    { id: 5, color: '#735A9E' },
];

export default function Projects() {
    const swiperRef = useRef<SwiperType | null>(null);
    const sectionRef = useRef<HTMLElement | null>(null)

    const currentIndex = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const swiper = swiperRef.current;
            const section = sectionRef.current

            if (!swiper || !section) return;

            const container =
                swiper.el.parentElement;

            if (!container) return;

            const rect =
                container.getBoundingClientRect();

            /*
             * ==================================
             * Границы sticky-контейнера
             * ==================================
             */

            const topReached = rect.top <= 0;

            const bottomReached =
                rect.bottom <= window.innerHeight;


            const top = section.getBoundingClientRect().top + window.screenY;
            console.log(top)

            /*
             * ==================================
             * Scroll progress
             * ==================================
             *
             * 0   → начало Projects
             * 1   → конец Projects
             */

            const sectionRect =
                section.getBoundingClientRect();

            const scrollableDistance =
                section.offsetHeight - window.innerHeight;

            const progress = Math.min(
                Math.max(
                    -sectionRect.top / scrollableDistance,
                    0,
                ),
                1,
            );

            /*
             * ==================================
             * Определяем слайд
             * ==================================
             */

            const index = Math.round(
                progress * (PROJECT_COUNT - 1),
            );

            /*
             * Не вызываем Swiper без необходимости.
             */

            if (index === currentIndex.current) {
                return;
            }

            /*
             * ==================================
             * DOWN
             * ==================================
             */

            if (index > currentIndex.current) {
                /*
                 * Следующий слайд можно показывать
                 * только после того, как sticky
                 * достиг верхней границы.
                 */

                if (!topReached) {
                    return;
                }
            }

            /*
             * ==================================
             * UP
             * ==================================
             */

            if (index < currentIndex.current) {
                /*
                 * Назад можно переключать только
                 * когда весь container дошёл до
                 * нижней границы viewport.
                 */

                if (!bottomReached) {
                    return;
                }
            }

            currentIndex.current = index;

            swiper.slideTo(index);
        };

        window.addEventListener('scroll', handleScroll, {
            passive: true,
        });

        handleScroll();

        return () => {
            window.removeEventListener(
                'scroll',
                handleScroll,
            );
        };
    }, []);

    return (
        <section
            className={styles.projects}
            style={{
                height: `${PROJECT_COUNT * 100}vh`,
            }}
            ref={sectionRef}
        >
            <div className={styles.sticky}>
                <Swiper
                    direction="vertical"
                    slidesPerView={1}
                    speed={1400}
                    allowTouchMove={false}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    className={styles.swiper}
                >
                    {projects.map((project) => (
                        <SwiperSlide key={project.id}>
                            <div
                                className={styles.card}
                                style={{
                                    backgroundColor:
                                        project.color,
                                }}
                            >
                                {project.id}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}