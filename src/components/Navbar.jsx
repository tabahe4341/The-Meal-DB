import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { useDebouncedValue } from '../hooks/useDebouncedValue';

export default function Navbar({ favoritesCount = 0 }) {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [searchType, setSearchType] = useState(searchParams.get('type') ?? 'name');

  useDebouncedValue(query, 300);

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();

    if (query.trim()) {
      params.set('q', query.trim());
      params.set('type', searchType);
    }

    navigate({ pathname: '/', search: params.toString() ? `?${params.toString()}` : '' });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-amber-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="group inline-flex items-center gap-2">
            <span className="rounded-xl bg-herb px-2 py-1 text-xs font-bold uppercase tracking-widest text-white">
              MealDB
            </span>
            <h1 className="font-display text-2xl text-ink transition group-hover:text-herb">Recipe Finder</h1>
          </Link>

          <nav className="flex items-center gap-2 text-sm">
            <Link
              to="/"
              className={`rounded-full px-3 py-1.5 transition ${
                location.pathname === '/' ? 'bg-amber-100 text-amber-900' : 'text-stone-600 hover:bg-amber-50'
              }`}
            >
              Home
            </Link>
            <Link
              to="/favorites"
              className={`rounded-full px-3 py-1.5 transition ${
                location.pathname === '/favorites'
                  ? 'bg-coral text-white'
                  : 'bg-coral/10 text-coral hover:bg-coral/20'
              }`}
            >
              Favorites ({favoritesCount})
            </Link>
          </nav>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search meals..."
            className="w-full rounded-xl border border-amber-200 bg-white px-4 py-2 text-sm text-ink outline-none transition focus:border-herb"
          />
          <select
            value={searchType}
            onChange={(event) => setSearchType(event.target.value)}
            className="rounded-xl border border-amber-200 bg-white px-4 py-2 text-sm text-ink outline-none transition focus:border-herb"
          >
            <option value="name">By Name</option>
            <option value="ingredient">By Ingredient</option>
          </select>
          <button
            type="submit"
            className="rounded-xl bg-herb px-5 py-2 text-sm font-semibold text-white transition hover:bg-herb/90"
          >
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
