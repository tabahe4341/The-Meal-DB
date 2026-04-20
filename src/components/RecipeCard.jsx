import { Link } from 'react-router-dom';

export default function RecipeCard({ meal, isFavorite, onToggleFavorite }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/recipe/${meal.idMeal}`} className="block">
        <div className="relative overflow-hidden">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
        </div>
      </Link>
      <div className="space-y-3 p-4">
        <Link to={`/recipe/${meal.idMeal}`} className="block">
          <h3 className="line-clamp-2 font-display text-xl text-ink transition group-hover:text-herb">
            {meal.strMeal}
          </h3>
        </Link>
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-stone-500">{meal.strCategory || 'Recipe'}</p>
          <button
            type="button"
            onClick={() => onToggleFavorite(meal)}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
              isFavorite
                ? 'bg-coral text-white hover:bg-coral/90'
                : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
            }`}
          >
            {isFavorite ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
    </article>
  );
}
