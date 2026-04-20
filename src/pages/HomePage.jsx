import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';
import EmptyState from '../components/EmptyState';
import Loader from '../components/Loader';
import RecipeCard from '../components/RecipeCard';
import {
  getCategories,
  getRandomMeal,
  searchMealsByIngredient,
  searchMealsByName,
} from '../services/api';

export default function HomePage({ recentlyViewed, isFavorite, onToggleFavorite }) {
  const [searchParams] = useSearchParams();

  const query = searchParams.get('q')?.trim() ?? '';
  const searchType = searchParams.get('type') === 'ingredient' ? 'ingredient' : 'name';

  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [randomMeal, setRandomMeal] = useState(null);
  const [isLoadingMeals, setIsLoadingMeals] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [mealsError, setMealsError] = useState('');
  const [categoryError, setCategoryError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function fetchHomeData() {
      setIsLoadingCategories(true);
      setCategoryError('');

      try {
        const [categoryList, spotlightMeal] = await Promise.all([getCategories(), getRandomMeal()]);

        if (isMounted) {
          setCategories(categoryList);
          setRandomMeal(spotlightMeal);
        }
      } catch {
        if (isMounted) {
          setCategoryError('Unable to load categories right now.');
        }
      } finally {
        if (isMounted) {
          setIsLoadingCategories(false);
        }
      }
    }

    fetchHomeData();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function fetchMeals() {
      setIsLoadingMeals(true);
      setMealsError('');

      try {
        let result = [];

        if (!query) {
          result = await searchMealsByName('');
        } else if (searchType === 'ingredient') {
          result = await searchMealsByIngredient(query);
        } else {
          result = await searchMealsByName(query);
        }

        if (isMounted) {
          setMeals(result);
        }
      } catch {
        if (isMounted) {
          setMealsError('Could not fetch meals. Please try again.');
        }
      } finally {
        if (isMounted) {
          setIsLoadingMeals(false);
        }
      }
    }

    fetchMeals();

    return () => {
      isMounted = false;
    };
  }, [query, searchType]);

  const searchTitle = useMemo(() => {
    if (!query) {
      return 'Explore Recipes';
    }

    return `Results for "${query}" (${searchType})`;
  }, [query, searchType]);

  return (
    <div className="space-y-12">
      <section className="overflow-hidden rounded-3xl border border-amber-100 bg-grain-glow p-6 shadow-card sm:p-10">
        <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="animate-floatIn space-y-4">
            <p className="inline-flex rounded-full bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-herb">
              Discover your next dish
            </p>
            <h2 className="font-display text-4xl leading-tight text-ink sm:text-5xl">
              Find recipes by name, ingredient, or category in seconds.
            </h2>
            <p className="max-w-xl text-sm text-stone-700 sm:text-base">
              Built on top of TheMealDB, this app helps you browse global meals, save favorites, and jump back
              into recently viewed dishes.
            </p>
            <div className="flex flex-wrap gap-3 text-xs text-stone-600">
              <span className="rounded-full border border-herb/20 bg-white/70 px-3 py-1">Name Search</span>
              <span className="rounded-full border border-herb/20 bg-white/70 px-3 py-1">Ingredient Search</span>
              <span className="rounded-full border border-herb/20 bg-white/70 px-3 py-1">Category Browse</span>
            </div>
          </div>

          {randomMeal && (
            <Link
              to={`/recipe/${randomMeal.idMeal}`}
              className="group overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-card"
            >
              <img
                src={randomMeal.strMealThumb}
                alt={randomMeal.strMeal}
                className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="space-y-1 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-herb">Trending Pick</p>
                <h3 className="font-display text-2xl text-ink group-hover:text-herb">{randomMeal.strMeal}</h3>
                <p className="text-xs text-stone-600">Tap to see full details</p>
              </div>
            </Link>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-display text-3xl text-ink">{searchTitle}</h2>
          {query && <p className="text-xs text-stone-500">Search type: {searchType}</p>}
        </div>

        {mealsError && <EmptyState title="Something went wrong" description={mealsError} />}
        {isLoadingMeals && <Loader variant="cards" />}

        {!isLoadingMeals && !mealsError && meals.length === 0 && (
          <EmptyState
            title="No matching recipes"
            description="Try a shorter keyword, switch search type, or browse categories below."
          />
        )}

        {!isLoadingMeals && !mealsError && meals.length > 0 && (
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

      {recentlyViewed.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-display text-3xl text-ink">Recently Viewed</h2>
            <p className="text-xs text-stone-500">Stored in local browser</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recentlyViewed.map((meal) => (
              <RecipeCard
                key={meal.idMeal}
                meal={meal}
                isFavorite={isFavorite(meal.idMeal)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        </section>
      )}

      <section className="space-y-4">
        <h2 className="font-display text-3xl text-ink">Browse by Category</h2>
        {categoryError && <EmptyState title="Cannot load categories" description={categoryError} />}
        {isLoadingCategories && <Loader variant="cards" />}

        {!isLoadingCategories && !categoryError && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard key={category.idCategory} category={category} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
