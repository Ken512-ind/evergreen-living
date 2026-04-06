function ContactSection() {
  return (
    <section className="py-20 bg-green-800 text-white">

      <div className="max-w-7xl mx-auto px-6 text-center">

        <h2 className="text-3xl font-bold mb-4">
          Stay Connected with Us
        </h2>

        <p className="mb-10 text-lg">
          Tetap terhubung dengan penawaran khusus, tips merawat tanaman,
          dan lainnya.
        </p>

        <button className="bg-white text-green-900 px-6 py-3 rounded-lg font-semibold mb-10">
          Contact Us
        </button>

        <div className="space-y-3 text-sm">

          <p>
            📞 +62 1345 9876 0476
          </p>

          <p>
            ✉️ evergreenliving@gmail.com
          </p>

          <p>
            📍 Jl. Pangeran, Kec. Kuningan, Kab. Kuningan, Jawa Barat
          </p>

        </div>

      </div>

    </section>
  );
}

export default ContactSection;