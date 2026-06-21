export default function AdminLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="space-y-1">
        <div className="h-7 w-32 bg-gray-200 rounded" />
        <div className="h-4 w-56 bg-gray-200 rounded" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border p-4">
            <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
            <div className="h-7 w-16 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="border-b bg-gray-50 px-6 py-3">
          <div className="flex gap-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-4 w-20 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="px-6 py-4">
              <div className="flex gap-8">
                {Array.from({ length: 5 }).map((_, j) => (
                  <div key={j} className="h-4 w-20 bg-gray-200 rounded" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
