import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import Loader from '../components/Loader';
import { getMealById } from '../services/api';

function getIngredients(meal) {
  const list = [];

  for (let i = 1; i <= 20; i += 1) {
    const ingredient = meal[`strIngredient${i}`]?.trim();
    const measure = meal[`strMeasure${i}`]?.trim();

    if (ingredient) {
      list.push({ ingredient, measure: measure || '-' });
    }
  }

  return list;
}

function toYouTubeEmbed(url) {
  if (!url) {
    return null;
  }

  if (url.includes('embed/')) {
    return url;
  }

  try {
    const parsed = new URL(url);
    const videoId = parsed.searchParams.get('v');

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }

    return url;
  } catch {
    return null;
  }
}

export default function RecipeDetailsPage({ isFavorite, onToggleFavorite, onRecentlyViewed }) {
  const { id } = useParams();

  const [meal, setMeal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function fetchMeal() {
      setIsLoading(true);
      setError('');

      try {
        const fullMeal = await getMealById(id);

        if (isMounted) {
          if (!fullMeal) {
            setError('Meal not found.');
          }
          setMeal(fullMeal);

          if (fullMeal) {
            onRecentlyViewed(fullMeal);
          }
        }
      } catch {
        if (isMounted) {
          setError('Could not load recipe details.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    if (id) {
      fetchMeal();
    }

    return () => {
      isMounted = false;
    };
  }, [id, onRecentlyViewed]);

  const ingredients = useMemo(() => (meal ? getIngredients(meal) : []), [meal]);
  const videoUrl = toYouTubeEmbed(meal?.strYoutube);

  if (isLoading) {
    return <Loader />;
  }

  if (error || !meal) {
    return (
      <div className="space-y-4">
        <EmptyState title="Unable to open recipe" description={error || 'Meal not found.'} />
        <Link to="/" className="inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm text-amber-900 hover:bg-amber-200">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <article className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <div className="overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-card">
          <img src={meal.strMealThumb} alt={meal.strMeal} className="h-full w-full object-cover" />
        </div>

        <div className="space-y-4 rounded-3xl border border-amber-100 bg-white p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.2em] text-herb">Recipe Details</p>
          <h2 className="font-display text-4xl text-ink">{meal.strMeal}</h2>

          <div className="flex flex-wrap gap-2 text-xs text-stone-700">
            <span className="rounded-full bg-amber-100 px-3 py-1">Category: {meal.strCategory || 'N/A'}</span>
            <span className="rounded-full bg-amber-100 px-3 py-1">Cuisine: {meal.strArea || 'N/A'}</span>
            {meal.strTags && <span className="rounded-full bg-amber-100 px-3 py-1">Tags: {meal.strTags}</span>}
          </div>

          <button
            type="button"
            onClick={() => onToggleFavorite(meal)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              isFavorite(meal.idMeal)
                ? 'bg-coral text-white hover:bg-coral/90'
                : 'bg-herb text-white hover:bg-herb/90'
            }`}
          >
            {isFavorite(meal.idMeal) ? 'Remove from Favorites' : 'Save to Favorites'}
          </button>

          {videoUrl && (
            <div className="overflow-hidden rounded-2xl border border-amber-100">
              <iframe
                className="aspect-video w-full"
                src={videoUrl}
                title={`YouTube video for ${meal.strMeal}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-3xl border border-amber-100 bg-white p-6 shadow-card">
          <h3 className="font-display text-3xl text-ink">Ingredients</h3>
          <ul className="mt-4 space-y-2 text-sm text-stone-700">
            {ingredients.map((item) => (
              <li key={`${item.ingredient}-${item.measure}`} className="flex items-start justify-between gap-2 border-b border-amber-50 pb-2">
                <span>{item.ingredient}</span>
                <span className="rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-900">{item.measure}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl border border-amber-100 bg-white p-6 shadow-card">
          <h3 className="font-display text-3xl text-ink">Instructions</h3>
          <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-stone-700">{meal.strInstructions}</p>
        </section>
      </div>
    </article>
  );
}
