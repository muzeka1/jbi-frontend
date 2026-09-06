
"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getFavorites,
  toggleFavorite as toggleFavoriteStorage,
  setFavorites,
} from "@/src/lib/favorites";

export function useFavorites() {
  const [favorites, setFavoritesState] = useState<number[]>([]);

  useEffect(() => {
    setFavoritesState(getFavorites());

    const handleFavoritesChanged = () => {
      setFavoritesState(getFavorites());
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key === "favorite-apartments") {
        setFavoritesState(getFavorites());
      }
    };

    window.addEventListener(
      "favorites-changed",
      handleFavoritesChanged
    );

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(
        "favorites-changed",
        handleFavoritesChanged
      );

      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const toggleFavorite = useCallback((apartmentId: number) => {
    const next = toggleFavoriteStorage(apartmentId);
    setFavoritesState(next);
  }, []);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
    setFavoritesState([]);
  }, []);

  const isFavorite = useCallback(
    (apartmentId: number) => favorites.includes(apartmentId),
    [favorites]
  );

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    clearFavorites,
  };
}