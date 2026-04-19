import plantHero from "../assets/plant.png";

function Hero() {
  return (
    <section className="bg-green-900 text-white w-full">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          <div>

            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Bring Nature Closer
              to Your Life
            </h1>

            <p className="text-base md:text-lg mb-8">
              Ciptakan suasana yang asri dan menenangkan melalui berbagai
              tumbuhan pajangan dan tanaman herbal untuk rumah yang
              lebih sehat dan segar.
            </p>

            <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg">
              Explore More
            </button>

          </div>

          <div className="flex justify-center">

            <img
              src={plantHero}
              alt="Plant"
              className="w-full max-w-md"
            />

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;