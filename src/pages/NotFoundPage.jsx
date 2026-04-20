import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="rounded-3xl border border-amber-100 bg-white p-10 text-center shadow-card">
      <p className="text-sm uppercase tracking-widest text-herb">404</p>
      <h2 className="mt-2 font-display text-4xl text-ink">Page not found</h2>
      <p className="mt-2 text-sm text-stone-600">The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="mt-6 inline-flex rounded-full bg-herb px-5 py-2 text-sm font-semibold text-white transition hover:bg-herb/90"
      >
        Return Home
      </Link>
    </div>
  );
}
