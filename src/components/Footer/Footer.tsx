"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Footer.module.css";

gsap.registerPlugin(ScrollTrigger);

const navigation = [
  {
    title: "Компания",
    links: [
      ["О компании", "/about"],
      ["Проекты", "/projects"],
    ],
  },
  {
    title: "Услуги",
    links: [
      ["Строительство", "/services/construction"],
      ["Проектирование", "/services/design"],
    ],
  },
];

export default function Footer() {
  const footerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          once: true,
        },
      });

      tl.from(".footer-eyebrow", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      })
        .from(
          ".footer-title",
          {
            y: 80,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.45"
        )
        .from(
          ".footer-link-group",
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          ".footer-bottom",
          {
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.25"
        );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={`${styles.eyebrow} footer-eyebrow`}>
              Строим будущее
            </span>

            <h2 className={`${styles.title} footer-title`}>
              Строим дома,
              <br />
              <span>которые становятся частью вашей жизни.</span>
            </h2>

            <Link href="/request" className={styles.cta}>
              <span>Оставить заявку</span>

              <span className={styles.arrow}>↗</span>
            </Link>
          </div>

          <div className={styles.navigation}>
            {navigation.map((group) => (
              <div
                key={group.title}
                className={`${styles.linkGroup} footer-link-group`}
              >
                <span className={styles.groupTitle}>{group.title}</span>

                <nav>
                  {group.links.map(([label, href]) => (
                    <Link
                      key={href}
                      href={href}
                      className={styles.link}
                    >
                      {label}
                    </Link>
                  ))}
                </nav>
              </div>
            ))}

            <div className={`${styles.linkGroup} footer-link-group`}>
              <span className={styles.groupTitle}>Контакты</span>

              <a
                href=""
                className={styles.link}
              >
                mail@mail.ru
              </a>

              <a
                href="tel:+77777777777"
                className={styles.link}
              >
                +7 777 777-77-77
              </a>

              <span className={styles.address}>
                Махачкала, Дагестан
              </span>
            </div>
          </div>
        </div>

        <div className={`${styles.bottom} footer-bottom`}>
          <div className={styles.logo}>
            <span className={styles.logoMark}>С</span>
            <span>JBI</span>
          </div>

          <div className={styles.meta}>
            <span>© JBI</span>
            <Link href="/privacy">Политика конфиденциальности</Link>
          </div>

          <div className={styles.socials}>
            <a href="#" aria-label="Telegram">TG</a>
          </div>
        </div>
      </div>
    </footer>
  );
}