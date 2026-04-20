import { useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage('recipe-favorites', []);

  const favoriteIds = useMemo(() => new Set(favorites.map((meal) => meal.idMeal)), [favorites]);

  const isFavorite = useCallback((id) => favoriteIds.has(id), [favoriteIds]);

  const toggleFavorite = useCallback((meal) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.idMeal === meal.idMeal);

      if (exists) {
        return prev.filter((item) => item.idMeal !== meal.idMeal);
      }

      const favoriteMeal = {
        idMeal: meal.idMeal,
        strMeal: meal.strMeal,
        strMealThumb: meal.strMealThumb,
        strCategory: meal.strCategory,
        strArea: meal.strArea,
      };

      return [favoriteMeal, ...prev];
    });
  }, [setFavorites]);

  return {
    favorites,
    favoritesCount: favorites.length,
    isFavorite,
    toggleFavorite,
  };
}
