import api from "./api";

// ==========================
// GET ALL PLANTS
// ==========================
export const getPlants = async () => {
  try {
    const response = await api.get("/plants");
    return response.data;
  } catch (error) {
    console.error("Error fetching plants:", error);
    throw error;
  }
};

// ==========================
// GET PLANT BY SLUG
// ==========================
export const getPlantBySlug = async (slug) => {
  try {
    const response = await api.get(`/plants/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching plant:", error);
    throw error;
  }
};

// ==========================
// GET PLANTS BY CATEGORY
// ==========================
export const getPlantsByCategory = async (category) => {
  try {
    const response = await api.get(`/plants/category/${category}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error;
  }
};

// ==========================
// CREATE PLANT
// ==========================
export const createPlant = async (formData) => {
  try {
    const response = await api.post("/plants", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating plant:", error);
    throw error;
  }
};

// ==========================
// UPDATE PLANT
// ==========================
export const updatePlant = async (id, formData) => {
  try {
    const response = await api.put(`/plants/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating plant:", error);
    throw error;
  }
};

// ==========================
// DELETE PLANT
// ==========================
export const deletePlant = async (id) => {
  try {
    const response = await api.delete(`/plants/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting plant:", error);
    throw error;
  }
};