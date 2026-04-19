function PlantDetailSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 animate-pulse">

      <div className="grid md:grid-cols-2 gap-10">

        <div className="bg-gray-300 h-72 rounded-xl" />

        <div>

          <div className="h-8 bg-gray-300 rounded w-3/4 mb-4" />

          <div className="h-4 bg-gray-300 rounded w-1/2 mb-6" />

          <div className="space-y-3">

            <div className="h-4 bg-gray-300 rounded" />

            <div className="h-4 bg-gray-300 rounded" />

            <div className="h-4 bg-gray-300 rounded w-5/6" />

          </div>

        </div>

      </div>

    </div>
  );
}

export default PlantDetailSkeleton;