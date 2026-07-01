export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      {/* Hero skeleton */}
      <div className="flex flex-col items-center gap-5 py-16">
        <div className="h-8 w-64 animate-pulse rounded-full bg-card/60" />
        <div className="h-14 w-full max-w-2xl animate-pulse rounded-2xl bg-card/60" />
        <div className="h-5 w-full max-w-lg animate-pulse rounded-lg bg-card/40" />
        <div className="mt-4 flex gap-4">
          <div className="h-12 w-40 animate-pulse rounded-xl bg-card/60" />
          <div className="h-12 w-40 animate-pulse rounded-xl bg-card/40" />
        </div>
      </div>

      {/* Cards skeleton */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-56 animate-pulse rounded-2xl border border-border-soft/50 bg-card/40"
          />
        ))}
      </div>
    </div>
  );
}
