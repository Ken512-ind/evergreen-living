function PlantCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden animate-pulse">

      <div className="w-full h-48 bg-gray-300" />

      <div className="p-4 space-y-2">

        <div className="h-4 bg-gray-300 rounded w-3/4" />

        <div className="h-3 bg-gray-300 rounded w-1/2" />

      </div>

    </div>
  );
}

export default PlantCardSkeleton;