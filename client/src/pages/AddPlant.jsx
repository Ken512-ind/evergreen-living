import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  addPlant,
} from "../services/plantService";

function AddPlant() {
  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({
      name: "",
      latin: "",
      category: "",
      description: "",
      image: null,
    });

  const handleChange =
    (e) => {
      const {
        name,
        value,
        files,
      } = e.target;

      if (name === "image") {
        setForm({
          ...form,
          image:
            files[0],
        });
      } else {
        setForm({
          ...form,
          [name]:
            value,
        });
      }
    };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        const formData =
          new FormData();

        Object.keys(
          form
        ).forEach(
          (key) => {
            formData.append(
              key,
              form[key]
            );
          }
        );

        await addPlant(
          formData
        );

        alert(
          "Plant added"
        );

        navigate(
          "/dashboard"
        );

      } catch (error) {
        alert(
          "Error"
        );
      }
    };

  return (
    <div className="p-6 max-w-xl mx-auto">

      <h1 className="text-2xl font-bold mb-6">
        Add Plant
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
        className="space-y-4"
      >

        <input
          name="name"
          placeholder="Name"
          onChange={
            handleChange
          }
          className="w-full border p-2"
        />

        <input
          name="latin"
          placeholder="Latin Name"
          onChange={
            handleChange
          }
          className="w-full border p-2"
        />

        <select
          name="category"
          onChange={
            handleChange
          }
          className="w-full border p-2"
        >
          <option>
            Select Category
          </option>

          <option value="indoor">
            Indoor
          </option>

          <option value="herbal">
            Herbal
          </option>
        </select>

        <textarea
          name="description"
          placeholder="Description"
          onChange={
            handleChange
          }
          className="w-full border p-2"
        />

        <input
          type="file"
          name="image"
          onChange={
            handleChange
          }
          className="w-full"
        />

        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>

      </form>

    </div>
  );
}

export default AddPlant;