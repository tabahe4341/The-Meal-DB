import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import { useFavorites } from './hooks/useFavorites';
import { useRecentlyViewed } from './hooks/useRecentlyViewed';
import CategoryMealsPage from './pages/CategoryMealsPage';
import FavoritesPage from './pages/FavoritesPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import RecipeDetailsPage from './pages/RecipeDetailsPage';

export default function App() {
  const { favorites, favoritesCount, isFavorite, toggleFavorite } = useFavorites();
  const { recentlyViewed, addRecentlyViewed } = useRecentlyViewed();

  return (
    <div className="min-h-screen bg-cream font-body text-ink">
      <Navbar favoritesCount={favoritesCount} />
      <ScrollToTop />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                recentlyViewed={recentlyViewed}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
              />
            }
          />
          <Route
            path="/category/:categoryName"
            element={<CategoryMealsPage isFavorite={isFavorite} onToggleFavorite={toggleFavorite} />}
          />
          <Route
            path="/recipe/:id"
            element={
              <RecipeDetailsPage
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
                onRecentlyViewed={addRecentlyViewed}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <FavoritesPage
                favorites={favorites}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
              />
            }
          />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}
