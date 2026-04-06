import CareCard from "./CareCard";

function CareSteps() {
  return (
    <section className="py-20 bg-gray-100">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-3xl font-bold text-center text-green-800 mb-4">
          Step to Start Taking Care of Your Plants
        </h2>

        <p className="text-center text-gray-800 mb-12">
          Solusi tepat untuk perawatan tanaman hijau dan cerdas
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          <CareCard
            title="Humidity Control"
            description="Pengendalian kelembapan yang efektif sangat penting untuk perawatan tanaman yang tepat."
          />

          <CareCard
            title="Anticipate Pest"
            description="Menerapkan langkah-langkah antisipasi hama sangat penting untuk melindungi tanaman."
          />

          <CareCard
            title="Pruning Weeds"
            description="Merawat tanaman melibatkan pengelolaan pertumbuhan yang tidak diinginkan."
          />

        </div>

      </div>

    </section>
  );
}

export default CareSteps;