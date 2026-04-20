export default function Loader({ variant = 'page' }) {
  if (variant === 'cards') {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-card">
            <div className="h-44 animate-pulse bg-amber-100" />
            <div className="space-y-2 p-4">
              <div className="h-4 w-3/4 animate-pulse rounded bg-amber-100" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-amber-100" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex min-h-[32vh] items-center justify-center">
      <div className="h-14 w-14 animate-spin rounded-full border-4 border-amber-200 border-t-herb" />
    </div>
  );
}
