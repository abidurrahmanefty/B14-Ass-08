export function ProductCardSkeleton() {
  return (
    <div className="card border border-base-300 bg-base-100">
      <div className="card-body gap-3 p-4">
        <div className="flex gap-3">
          <div className="skeleton h-10 w-10 shrink-0 rounded-lg" />
          <div className="flex-1 space-y-2">
            <div className="skeleton h-4 w-3/4" />
            <div className="skeleton h-3 w-1/2" />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="space-y-2">
            <div className="skeleton h-3 w-16" />
            <div className="skeleton h-6 w-24" />
          </div>
          <div className="skeleton h-6 w-14 rounded-full" />
        </div>
      </div>
    </div>
  );
}
