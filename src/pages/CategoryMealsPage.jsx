import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import Loader from '../components/Loader';
import RecipeCard from '../components/RecipeCard';
import { getMealsByCategory } from '../services/api';

export default function CategoryMealsPage({ isFavorite, onToggleFavorite }) {
  const { categoryName } = useParams();
  const decodedCategory = decodeURIComponent(categoryName || '');

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function fetchCategoryMeals() {
      setIsLoading(true);
      setError('');

      try {
        const categoryMeals = await getMealsByCategory(decodedCategory);

        if (isMounted) {
          setMeals(categoryMeals);
        }
      } catch {
        if (isMounted) {
          setError('Unable to load meals for this category.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    if (decodedCategory) {
      fetchCategoryMeals();
    }

    return () => {
      isMounted = false;
    };
  }, [decodedCategory]);

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-widest text-herb">Category</p>
          <h2 className="font-display text-4xl text-ink">{decodedCategory}</h2>
        </div>
        <Link to="/" className="rounded-full bg-amber-100 px-4 py-2 text-sm text-amber-900 transition hover:bg-amber-200">
          Back to Home
        </Link>
      </div>

      {error && <EmptyState title="Error loading category" description={error} />}
      {isLoading && <Loader variant="cards" />}

      {!isLoading && !error && meals.length === 0 && (
        <EmptyState title="No meals in this category" description="Try another category from the home page." />
      )}

      {!isLoading && !error && meals.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {meals.map((meal) => (
            <RecipeCard
              key={meal.idMeal}
              meal={meal}
              isFavorite={isFavorite(meal.idMeal)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}
    </section>
  );
}
