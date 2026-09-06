
"use client";

import { apartments } from "@/src/api/apartmemts";

import FavoritesSection from "../../components/favorites-section/favorites-section";
import Header from "@/src/components/header/header";
import Footer from "@/src/components/Footer/Footer";

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