import CategoryCard from "./CategoryCard";

import indoorImg from "../assets/indoor.png";
import herbalImg from "../assets/herbal.png";

function Collection() {
  return (
    <section className="py-20 bg-gray-100">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-3xl font-bold text-center text-green-800 mb-4">
          Our Collection
        </h2>

        <p className="text-center text-gray-600 mb-12">
          Jelajahi semua koleksi tanaman dengan mudah dan cepat.
        </p>

        <div className="grid md:grid-cols-2 gap-8">

          <CategoryCard
            title="Indoor Plants"
            image={indoorImg}
          />

          <CategoryCard
            title="Herbal Plants"
            image={herbalImg}
          />

        </div>

      </div>

    </section>
  );
}

export default Collection;