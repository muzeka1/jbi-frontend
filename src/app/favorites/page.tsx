
"use client";

import Image from "next/image";
import Link from "next/link";

import { apartments } from "@/src/api/apartmemts";
import { useFavorites } from "@/src/hooks/useFavorites";

import styles from "@/src/components/apartments-list/apartments-list.module.css";
import FavoritesSection from "../../components/favorites-section/favorites-section";
import Header from "../../components/header/header";
import Footer from "../../components/Footer/Footer";

export default function FavoritesPage() {
  return (
    <>
      <Header />
      <main>
        <FavoritesSection apartments={apartments} />
      </main>
      <Footer />
    </>
  );
}