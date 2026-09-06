"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getLenis } from "@/src/lib/lenis";

import styles from "./Modal.module.css";

type ModalProps = {
  children: ReactNode;
};

export function Modal({ children }: ModalProps) {
  const router = useRouter();
  const lenis = getLenis();

  const closeModal = () => {
    const scrollY = lenis?.scroll ?? window.scrollY;

    router.back();

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (lenis) {
          lenis.scrollTo(scrollY, {
            immediate: true,
          });
        } else {
          window.scrollTo({
            top: scrollY,
            left: 0,
            behavior: "instant",
          });
        }
      });
    });
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [lenis]);


  return (
    <div
      className={styles.overlay}
      onClick={closeModal}
    >
      <div
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className={styles.close}
          onClick={closeModal}
          aria-label="Закрыть"
        >
          ×
        </button>

        {children}
      </div>
    </div>
  );
}
