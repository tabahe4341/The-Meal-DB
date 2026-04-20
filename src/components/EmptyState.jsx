export default function EmptyState({
  title = 'No meals found',
  description = 'Try a different keyword or explore categories.',
}) {
  return (
    <div className="rounded-3xl border border-dashed border-amber-300 bg-amber-50 p-10 text-center">
      <h3 className="font-display text-2xl text-ink">{title}</h3>
      <p className="mt-2 text-sm text-stone-600">{description}</p>
    </div>
  );
}
