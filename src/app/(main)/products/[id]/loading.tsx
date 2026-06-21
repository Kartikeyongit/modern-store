export default function ProductLoading() {
  return (
    <main className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="animate-pulse">
            <div className="aspect-square bg-gray-200 rounded-2xl" />
          </div>
          <div className="space-y-6 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="flex gap-2">
              <div className="h-5 w-16 bg-gray-200 rounded-full" />
              <div className="h-5 w-20 bg-gray-200 rounded-full" />
            </div>
            <div className="h-7 bg-gray-200 rounded w-1/4" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
              <div className="h-4 bg-gray-200 rounded w-4/6" />
            </div>
            <div className="flex gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="size-10 bg-gray-200 rounded-full" />
              ))}
            </div>
            <div className="flex gap-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-10 w-12 bg-gray-200 rounded-lg" />
              ))}
            </div>
            <div className="h-12 bg-gray-200 rounded-lg w-full" />
            <div className="flex gap-4">
              <div className="h-5 w-28 bg-gray-200 rounded" />
              <div className="h-5 w-28 bg-gray-200 rounded" />
              <div className="h-5 w-28 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
