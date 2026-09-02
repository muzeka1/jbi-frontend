"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import styles from "./header.module.css";
import { getLenis } from "@/src/lib/lenis";

const navigation = [
  {
    title: "Главная",
    href: "/",
  },
  {
    title: "Квартиры",
    href: "/apartments",
  },
  {
    title: "Контакты",
    href: "/contacts",
  },
  {
    title: "Избранное",
    href: "/favorites",
  },
  {
    title: "О нас",
    href: "/about",
  },
];

const menuItems = [
  {
    title: "Проекты",
    href: "/projects",
    number: "01",
  },
  {
    title: "О компании",
    href: "/about",
    number: "02",
  },
  {
    title: "Квартиры",
    href: "/apartments",
    number: "03",
  },
  {
    title: "Ипотека",
    href: "/mortgage",
    number: "04",
  },
  {
    title: "Контакты",
    href: "/contacts",
    number: "05",
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lenis = getLenis()
  const pathname = usePathname();

  const menuRef = useRef<HTMLDivElement | null>(null);

  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const menuInfoRef = useRef<HTMLDivElement | null>(null);

  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    if (!isMenuOpen || !menuRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(menuRef.current, {
        display: "flex",
        opacity: 1,
      });

      gsap.set(menuItemsRef.current, {
        y: 80,
        opacity: 0,
      });

      gsap.set(menuInfoRef.current, {
        y: 30,
        opacity: 0,
      });

      timelineRef.current = gsap.timeline();

      timelineRef.current
        .fromTo(
          menuRef.current,
          {
            clipPath: "inset(0 0 100% 0)",
          },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 0.8,
            ease: "power4.inOut",
          }
        )
        .to(
          menuItemsRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: "power4.out",
          },
          "-=0.35"
        )
        .to(
          menuInfoRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.45"
        );
    }, menuRef);

    return () => ctx.revert();
  }, [isMenuOpen]);

  const closeMenu = () => {
    if (!menuRef.current) {
      setIsMenuOpen(false);
      return;
    }

    gsap.to(menuRef.current, {
      clipPath: "inset(0 0 100% 0)",
      duration: 0.7,
      ease: "power4.inOut",
      onComplete: () => {
        setIsMenuOpen(false);
        timelineRef.current = null;
      },
    });
  };

  const toggleMenu = () => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      setIsMenuOpen(true);
    }
  };

  // Блокируем скролл при открытом меню
  useEffect(() => {
    if (!lenis) return

    if (isMenuOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }

    return () => {
      lenis.start();
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* HEADER */}

      {!isMenuOpen && (
        <header className={styles.header}>
          <div className={styles.container}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoMark}>С</span>

              <span className={styles.logoText}>
                JBI
              </span>
            </Link>

            <nav className={styles.center} aria-label="Основная навигация">
              {navigation.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`${styles.navLink} ${isActive ? styles.active : ""
                      }`}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </nav>

            <div className={styles.actions}>
              <a
                href="tel:+74951234567"
                className={styles.phone}
              >
                +7 495 123-45-67
              </a>

              <button
                type="button"
                className={styles.menuButton}
                onClick={toggleMenu}
                aria-label="Открыть меню"
              >
                <span>Меню</span>

                <span className={styles.menuIcon}>
                  <span />
                  <span />
                </span>
              </button>
            </div>
          </div>
        </header>
      )}

      {/* FULLSCREEN MENU */}

      <div
        ref={menuRef}
        className={styles.menu}
        style={{ display: "none" }}
      >
        <div className={styles.menuContainer}>
          <div className={styles.menuHeader}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoMark}>С</span>

              <span className={styles.logoText}>
                СТРОЙ
                <br />
                ГРУПП
              </span>
            </Link>

            <button
              type="button"
              className={`${styles.menuButton} ${styles.closeButton}`}
              onClick={closeMenu}
              aria-label="Закрыть меню"
            >
              <span>Закрыть</span>

              <span className={styles.closeIcon}>
                <span />
                <span />
              </span>
            </button>
          </div>

          <div className={styles.menuContent}>
            <nav className={styles.navigation}>
              {menuItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  ref={(el) => {
                    menuItemsRef.current[index] = el;
                  }}
                  className={styles.navLink}
                  onClick={closeMenu}
                >
                  <span className={styles.navNumber}>
                    {item.number}
                  </span>

                  <span className={styles.navTitle}>
                    {item.title}
                  </span>

                  <span className={styles.navArrow}>
                    ↗
                  </span>
                </Link>
              ))}
            </nav>

            <div
              ref={menuInfoRef}
              className={styles.menuInfo}
            >
              <div className={styles.infoBlock}>
                <span>Связаться</span>

                <a href="tel:+74951234567">
                  +7 495 123-45-67
                </a>

                <a href="mailto:hello@stroygroup.ru">
                  hello@stroygroup.ru
                </a>
              </div>

              <div className={styles.infoBlock}>
                <span>Офис</span>

                <p>
                  Москва,
                  <br />
                  ул. Строителей, 12
                </p>
              </div>

              <div className={styles.infoBlock}>
                <span>Социальные сети</span>

                <div className={styles.socials}>
                  <a href="#">Telegram</a>
                  <a href="#">VK</a>
                  <a href="#">YouTube</a>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.menuFooter}>
            <span>© 2026</span>

            <span>
              Надёжный девелопер
            </span>
          </div>
        </div>
      </div>
    </>
  );
}