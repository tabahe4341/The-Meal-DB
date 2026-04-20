import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

const MAX_RECENT_ITEMS = 8;

export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage('recipe-recently-viewed', []);

  const addRecentlyViewed = useCallback((meal) => {
    const summary = {
      idMeal: meal.idMeal,
      strMeal: meal.strMeal,
      strMealThumb: meal.strMealThumb,
      strCategory: meal.strCategory,
      strArea: meal.strArea,
    };

    setRecentlyViewed((prev) => {
      const withoutCurrent = prev.filter((item) => item.idMeal !== summary.idMeal);
      return [summary, ...withoutCurrent].slice(0, MAX_RECENT_ITEMS);
    });
  }, [setRecentlyViewed]);

  return {
    recentlyViewed,
    addRecentlyViewed,
  };
}
