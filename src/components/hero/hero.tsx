"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import AutoRevealSlider from "./image-slider/image-slider";
import Image from "next/image";
import gsap from "gsap";
import styles from "./hero.module.css";

const images = [
    '/images/renders/4.jpg',
    '/images/renders/5.jpg',
    '/images/renders/3.jpg',
];

export default function Hero() {
    const heroRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: {
                    ease: "power4.out",
                },
            });

            tl.from(".hero-image", {
                scale: 1.12,
                duration: 1,
            })
                .from(
                    ".hero-overlay",
                    {
                        opacity: 0,
                        duration: 1,
                    },
                    "-=0.3"
                )
                .from(
                    ".hero-eyebrow",
                    {
                        y: 30,
                        opacity: 0,
                        duration: 0.7,
                    },
                    "-=0.6"
                )
                .from(
                    ".hero-title-line",
                    {
                        yPercent: 110,
                        duration: 1,
                        stagger: 0.12,
                    },
                    "-=0.45"
                )
                .from(
                    ".hero-description",
                    {
                        y: 30,
                        opacity: 0,
                        duration: 0.7,
                    },
                    "-=2"
                )
                .from(
                    ".hero-actions",
                    {
                        y: 25,
                        opacity: 0,
                        duration: 0.6,
                    },
                    "-=1.7"
                )
                .from(
                    ".hero-bottom",
                    {
                        y: 20,
                        opacity: 0,
                        duration: 0.6,
                    },
                    "-=1.3"
                );
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className={styles.hero}>


            <div className={`${styles.image} hero-image`}>
                <AutoRevealSlider images={images} duration={2} interval={2100} />
            </div>

            <div className={`${styles.overlay} hero-overlay`} />

            <div className={styles.container}>
                <div className={styles.content}>

                    <h1 className={styles.title}>
                        <span className={styles.titleLine}>
                            <span className="hero-title-line">Строим</span>
                        </span>

                        <span className={styles.titleLine}>
                            <span className="hero-title-line">
                                пространство
                            </span>
                        </span>

                        <span className={styles.titleLine}>
                            <span className="hero-title-line">для будущего.</span>
                        </span>
                    </h1>

                    <div className={styles.bottomContent}>
                        <p className={`${styles.description} hero-description`}>
                            Проектируем и реализуем объекты, которые становятся
                            частью современной городской среды.
                        </p>

                        <div className={`${styles.actions} hero-actions`}>
                            <Link href="/apartments" className={styles.primaryButton}>
                                <span>Подобрать квартиру</span>
                                <span className={styles.buttonArrow}>↗</span>
                            </Link>

                            <Link href="/contacts" className={styles.secondaryButton}>
                                Обсудить проект
                            </Link>
                        </div>
                    </div>
                </div>

                <div className={`${styles.heroBottom} hero-bottom`}>
                    <div className={styles.scroll}>
                    </div>

                    <div className={styles.stats}>
                        <div>
                            <strong>99</strong>
                            <span>лет опыта</span>
                        </div>

                        <div>
                            <strong>99</strong>
                            <span>объектов</span>
                        </div>

                        <div>
                            <strong>99</strong>
                            <span>м² построено</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// import styles from "./hero.module.css";





// export default function Hero() {
//     return (
//         <section className={styles.hero}>
//             
//             <div className={styles.container}>
//                 <div className={styles.content}>
//                     <span className={styles.eyebrow}>Строим для жизни</span>

//                     <h1 className={styles.title}>
//                         Дома, в которые
//                         <br />
//                         хочется возвращаться
//                     </h1>

//                     <p className={styles.description}>
//                         Современные жилые комплексы с продуманной архитектурой,
//                         инфраструктурой и благоустроенной территорией.
//                     </p>

//                     <div className={styles.actions}>
//                         <a href="/apartments" className={styles.primaryButton}>
//                             Поиск квартир
//                         </a>

//                         <a href="tel:+77777777777" className={styles.phoneButton}>
//                             <span className={styles.phoneIcon}>↗</span>
//                             <span>
//                                 <small>Позвонить</small>
//                                 <strong>7 777 777-77-77</strong>
//                             </span>
//                         </a>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }