export default function OrdersLoading() {
  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="h-4 w-28 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-7 w-36 bg-gray-200 rounded animate-pulse mb-1" />
            <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border p-6 animate-pulse">
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-2">
                  <div className="h-4 w-40 bg-gray-200 rounded" />
                  <div className="h-3 w-32 bg-gray-200 rounded" />
                </div>
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-gray-200 rounded-full" />
                  <div className="h-6 w-16 bg-gray-200 rounded-full" />
                  <div className="h-6 w-20 bg-gray-200 rounded-full" />
                </div>
              </div>
              <div className="border-t pt-4 space-y-3">
                {Array.from({ length: 2 }).map((_, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-gray-200 rounded-lg" />
                    <div className="flex-1 space-y-1.5">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-1/3" />
                    </div>
                    <div className="h-4 w-16 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
              <div className="border-t mt-4 pt-4 flex items-center justify-between">
                <div className="h-4 w-32 bg-gray-200 rounded" />
                <div className="flex items-center gap-4">
                  <div className="h-5 w-20 bg-gray-200 rounded" />
                  <div className="h-8 w-20 bg-gray-200 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
