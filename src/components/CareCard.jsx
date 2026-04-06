function CareCard({ title, description }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition">

      {/* Icon Placeholder */}
      <div className="w-14 h-14 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
        🌿
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        {title}
      </h3>

      <p className="text-gray-600 text-sm">
        {description}
      </p>

    </div>
  );
}

export default CareCard;