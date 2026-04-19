import { useState } from "react";
import { useNavigate } from "react-router-dom";
import plantService from "../services/plantService";

function AddPlant() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    latin: "",
    category: "indoor",
    image: "",
    description: "",
  });

  /*
  HANDLE INPUT
  */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /*
  SUBMIT
  */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await plantService.createPlant(formData);

      /*
      REDIRECT
      */
      navigate("/dashboard");

    } catch (error) {
      console.error("Failed to create plant", error);
    }
  };

  return (
    <div className="p-6 max-w-xl">

      <h1 className="text-2xl font-bold mb-6">
        Add Plant
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="name"
          placeholder="Plant name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="latin"
          placeholder="Latin name"
          value={formData.latin}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="indoor">Indoor</option>
          <option value="herbal">Herbal</option>
        </select>

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Save Plant
        </button>

      </form>

    </div>
  );
}

export default AddPlant;