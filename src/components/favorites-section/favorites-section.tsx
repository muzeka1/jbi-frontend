"use client";

import { Apartment } from "@/src/types/apartments";
import { useFavorites } from "@/src/hooks/useFavorites";
import ApartmentCard from "@/src/components/apartments-section/apartment-card/apartment-card"
import styles from "./favorites-section.module.css";

type FavoritesSectionProps = {
  apartments: Apartment[];
};

export default function FavoritesSection({
  apartments,
}: FavoritesSectionProps) {
  const {
    favorites,
    isFavorite,
    toggleFavorite,
    clearFavorites,
  } = useFavorites();

  const favoriteApartments = apartments.filter((apartment) =>
    favorites.includes(apartment.id)
  );

  const handleToggleFavorite = (
    event: React.MouseEvent<HTMLButtonElement>,
    apartmentId: number
  ) => {
    event.preventDefault();
    event.stopPropagation();

    toggleFavorite(apartmentId);
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Избранное</h2>

        {favoriteApartments.length > 0 && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={clearFavorites}
          >
            Очистить все
          </button>
        )}
      </div>

      {favoriteApartments.length > 0 ? (
        <div className={styles.list}>
          {favoriteApartments.map((apartment) => (
            <ApartmentCard
              key={apartment.id}
              apartment={apartment}
              isFavorite={isFavorite(apartment.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          В избранном пока нет квартир
        </div>
      )}
    </section>
  );
}