import dotenv from "dotenv"
import connectDB from "./config/db.js"
import Plant from "./models/Plant.js"

dotenv.config()

connectDB()

const plants = [
  {
    slug: "peace-lily",
    name: "Peace Lily",
    latin: "Spathiphyllum wallisii",
    image: "peace-lily.jpg",
    category: "indoor",
    description:
      "Tanaman hias indoor yang mudah dirawat."
  },

  {
    slug: "aglaonema",
    name: "Aglaonema",
    latin: "Aglaonema commutatum",
    image: "aglaonema.jpg",
    category: "indoor",
    description:
      "Tanaman hias dengan warna daun beragam."
  },

  {
    slug: "monstera-deliciosa",
    name: "Monstera Deliciosa",
    latin: "Monstera deliciosa",
    image: "monstera.jpg",
    category: "indoor",
    description:
      "Tanaman dengan daun berlubang unik."
  },

  {
    slug: "mint",
    name: "Mint",
    latin: "Mentha",
    image: "mint.jpg",
    category: "herbal",
    description:
      "Tanaman herbal dengan aroma segar."
  },

  {
    slug: "basil",
    name: "Basil",
    latin: "Ocimum basilicum",
    image: "basil.jpg",
    category: "herbal",
    description:
      "Tanaman herbal yang sering digunakan dalam masakan."
  },

  {
    slug: "rosemary",
    name: "Rosemary",
    latin: "Rosmarinus officinalis",
    image: "rosemary.jpg",
    category: "herbal",
    description:
      "Tanaman herbal dengan aroma khas."
  }
]

const importData = async () => {
  try {
    await Plant.deleteMany()

    await Plant.insertMany(plants)

    console.log("Plants imported successfully")

    process.exit()

  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

importData()