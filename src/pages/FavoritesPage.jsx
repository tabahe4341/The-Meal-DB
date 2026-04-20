import EmptyState from '../components/EmptyState';
import RecipeCard from '../components/RecipeCard';

export default function FavoritesPage({ favorites, isFavorite, onToggleFavorite }) {
  return (
    <section className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-widest text-coral">Saved Collection</p>
        <h2 className="font-display text-4xl text-ink">Your Favorite Recipes</h2>
      </div>

      {favorites.length === 0 ? (
        <EmptyState
          title="No favorites yet"
          description="Save meals from the home, category, or details pages to build your collection."
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favorites.map((meal) => (
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
