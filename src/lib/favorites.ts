const FAVORITES_KEY = "favorite-apartments";

export function getFavorites(): number[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = localStorage.getItem(FAVORITES_KEY);

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);

    return Array.isArray(parsed)
      ? parsed.filter((id): id is number => typeof id === "number")
      : [];
  } catch {
    return [];
  }
}

export function setFavorites(ids: number[]) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));

  // Нужно для синхронизации компонентов в той же вкладке.
  window.dispatchEvent(new Event("favorites-changed"));
}

export function toggleFavorite(apartmentId: number): number[] {
  const current = getFavorites();

  const next = current.includes(apartmentId)
    ? current.filter((id) => id !== apartmentId)
    : [...current, apartmentId];

  setFavorites(next);

  return next;
}