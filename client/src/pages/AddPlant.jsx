import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPlant } from "../services/plantService";
import toast from "react-hot-toast";

function AddPlant() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    latin: "",
    category: "",
    description: "",
    slug: "",
    watering: "",
    sunlight: "",
    temperature: "",
    difficulty: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];

      setForm((prev) => ({
        ...prev,
        image: file,
      }));

      if (file) {
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    try {
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      await createPlant(formData);

      toast.success("Plant created successfully!");

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create plant.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Add Plant</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="name"
          placeholder="Plant Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />

        <input
          type="text"
          name="latin"
          placeholder="Latin Name"
          value={form.latin}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />

        <input
          type="text"
          name="slug"
          placeholder="Slug"
          value={form.slug}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option value="">Choose Category</option>
          <option value="Indoor">Indoor</option>
          <option value="Herbal">Herbal</option>
        </select>

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />

        <input
          type="text"
          name="watering"
          placeholder="Watering"
          value={form.watering}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />

        <input
          type="text"
          name="sunlight"
          placeholder="Sunlight"
          value={form.sunlight}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />

        <input
          type="text"
          name="temperature"
          placeholder="Temperature"
          value={form.temperature}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />

        <input
          type="text"
          name="difficulty"
          placeholder="Difficulty"
          value={form.difficulty}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />

        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="w-full"
        />

        {preview && (
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-2">
              Image Preview
            </p>

            <img
              src={preview}
              alt="Preview"
              className="w-56 h-56 object-cover rounded-xl border shadow"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`
            w-full
            bg-green-600
            text-white
            py-3
            rounded-xl
            transition
            ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-green-700"
            }
          `}
        >
          {loading ? "Saving..." : "Save Plant"}
        </button>

      </form>
    </div>
  );
}

export default AddPlant;