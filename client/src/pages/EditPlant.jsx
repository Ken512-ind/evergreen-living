import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getPlants,
  updatePlant,
} from "../services/plantService";

function EditPlant() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    latin: "",
    slug: "",
    category: "",
    description: "",
    watering: "",
    sunlight: "",
    temperature: "",
    difficulty: "",
    image: null,
  });

  useEffect(() => {
    loadPlant();
  }, []);

  const loadPlant = async () => {
    try {

      const plants = await getPlants();

      const plant = plants.find(
        (p) => p.id === Number(id)
      );

      if (!plant) {
        alert("Plant not found");
        navigate("/dashboard");
        return;
      }

      setForm({
        ...plant,
        image: null,
      });

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {

    const { name, value, files } = e.target;

    if (name === "image") {

      setForm({
        ...form,
        image: files[0],
      });

      return;
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const formData = new FormData();

      Object.entries(form).forEach(
        ([key, value]) => {

          if (value !== null) {
            formData.append(key, value);
          }

        }
      );

      await updatePlant(id, formData);

      toast.success("Plant updated successfully!");

      navigate("/dashboard");

    } catch (err) {
      console.error(err);

      toast.error("Update failed.");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Edit Plant
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded p-2"
          placeholder="Name"
        />

        <input
          name="latin"
          value={form.latin}
          onChange={handleChange}
          className="w-full border rounded p-2"
          placeholder="Latin"
        />

        <input
          name="slug"
          value={form.slug}
          onChange={handleChange}
          className="w-full border rounded p-2"
          placeholder="Slug"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option value="Indoor">
            Indoor
          </option>

          <option value="Herbal">
            Herbal
          </option>
        </select>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />

        <input
          name="watering"
          value={form.watering || ""}
          onChange={handleChange}
          className="w-full border rounded p-2"
          placeholder="Watering"
        />

        <input
          name="sunlight"
          value={form.sunlight || ""}
          onChange={handleChange}
          className="w-full border rounded p-2"
          placeholder="Sunlight"
        />

        <input
          name="temperature"
          value={form.temperature || ""}
          onChange={handleChange}
          className="w-full border rounded p-2"
          placeholder="Temperature"
        />

        <select
          name="difficulty"
          value={form.difficulty || ""}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option value="">
            Select Difficulty
          </option>

          <option value="Easy">
            Easy
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="Hard">
            Hard
          </option>
        </select>

        <input
          type="file"
          name="image"
          onChange={handleChange}
        />

        <button
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          Update Plant
        </button>

      </form>

    </div>
  );
}

export default EditPlant;