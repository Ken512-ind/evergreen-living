import { motion } from "framer-motion";

import heroImage from "../assets/hero-plant.png";

function Hero() {
  return (
    <section className="bg-gradient-to-r from-green-700 to-green-500 text-white">

      <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center">

        {/* TEXT */}

        <motion.div
          initial={{
            opacity: 0,
            x: -40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="flex-1"
        >
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Bring Nature Closer
            <br />
            to Your Life
          </h1>

          <p className="text-lg mb-8 text-green-100">
            Ciptakan suasana yang asri dan menenangkan
            melalui berbagai tanaman hias dan herbal
            untuk rumah yang lebih sehat dan segar.
          </p>

          <button className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Explore More
          </button>

        </motion.div>

        {/* IMAGE */}

        <motion.div
          initial={{
            opacity: 0,
            x: 40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="flex-1 mt-10 md:mt-0 flex justify-center"
        >
          <img
            src={heroImage}
            alt="Plant"
            className="w-80 md:w-96 drop-shadow-xl"
          />
        </motion.div>

      </div>

    </section>
  );
}

export default Hero;