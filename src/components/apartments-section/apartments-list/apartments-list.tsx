"use client";

import { Apartment } from "@/src/types/apartments";
import styles from "./apartments-list.module.css";
import { useFavorites } from "@/src/hooks/useFavorites";
import ApartmentCard from "../apartment-card/apartment-card";

type ApartmentListProps = {
  apartments: Apartment[];
};

export default function ApartmentList({
  apartments,
}: ApartmentListProps) {
  const {
    isFavorite,
    toggleFavorite,
  } = useFavorites();

  const handleToggleFavorite = (
    event: React.MouseEvent<HTMLButtonElement>,
    apartmentId: number
  ) => {
    event.preventDefault();
    event.stopPropagation();

    toggleFavorite(apartmentId);
  };

  if (!apartments.length) {
    return (
      <div className={styles.empty}>
        По выбранным параметрам квартир не найдено
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {apartments.map((apartment) => (
        <ApartmentCard
          key={apartment.id}
          apartment={apartment}
          isFavorite={isFavorite(apartment.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      ))}
    </div>
  );
}
