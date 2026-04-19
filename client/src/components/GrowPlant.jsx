import plantImg from "../assets/plant.png";

function GrowPlant() {
  return (
    <section className="py-20 bg-green-50">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center gap-10">

        {/* Image */}
        <div className="flex justify-center">
          <img
            src={plantImg}
            alt="Plant"
            className="w-72"
          />
        </div>

        {/* Text */}
        <div>

          <h2 className="text-3xl font-bold text-green-800 mb-4">
            Grow Plant for a Better Life
          </h2>

          <p className="text-gray-700 text-lg">
            Merawat tanaman dapat meningkatkan kesejahteraan dan
            menciptakan lingkungan yang lebih sehat.
          </p>

        </div>

      </div>

    </section>
  );
}

export default GrowPlant;