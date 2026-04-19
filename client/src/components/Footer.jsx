function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-14">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h3 className="text-xl font-bold mb-4">
            Evergreen Living
          </h3>

          <p className="text-gray-400 text-sm">
            Platform informasi lengkap tentang tanaman hias untuk
            rumah yang lebih hijau dan sehat.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-semibold mb-4">
            Navigation
          </h4>

          <ul className="space-y-2 text-gray-400 text-sm">
            <li>Home</li>
            <li>Collection</li>
            <li>Care Tips</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Information */}
        <div>
          <h4 className="font-semibold mb-4">
            Information
          </h4>

          <ul className="space-y-2 text-gray-400 text-sm">
            <li>About Us</li>
            <li>Article</li>
            <li>Tips</li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-semibold mb-4">
            Categories
          </h4>

          <ul className="space-y-2 text-gray-400 text-sm">
            <li>Indoor Plants</li>
            <li>Herbal Plants</li>
            <li>Privacy & Policy</li>
          </ul>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
        © EvergreenLiving 2025. All right reserved.
      </div>

    </footer>
  );
}

export default Footer;