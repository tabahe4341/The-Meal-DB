import { Link } from 'react-router-dom';

export default function CategoryCard({ category }) {
  return (
    <Link
      to={`/category/${encodeURIComponent(category.strCategory)}`}
      className="group block overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="overflow-hidden bg-amber-50">
        <img
          src={category.strCategoryThumb}
          alt={category.strCategory}
          className="h-36 w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="font-display text-xl text-ink group-hover:text-herb">{category.strCategory}</h3>
      </div>
    </Link>
  );
}
