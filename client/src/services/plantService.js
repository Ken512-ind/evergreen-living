import axios from "axios";

/*
================================
BASE API
================================
*/

const API =
  "http://localhost:5000/api/plants";

/*
================================
GET TOKEN
================================
*/

const getToken = () => {
  return localStorage.getItem(
    "token"
  );
};

/*
================================
GET ALL PLANTS
+ FILTER CATEGORY
================================
*/

export const getPlants =
  async (category) => {
    try {
      let url = API;

      if (category) {
        url =
          `${API}?category=${category}`;
      }

      const response =
        await axios.get(url);

      return response.data;

    } catch (error) {
      console.error(
        "Error fetching plants:",
        error
      );

      throw error;
    }
  };

/*
================================
GET PLANT BY SLUG
================================
*/

export const getPlantBySlug =
  async (slug) => {
    try {
      const response =
        await axios.get(
          `${API}/${slug}`
        );

      return response.data;

    } catch (error) {
      console.error(
        "Error get plant:",
        error
      );

      throw error;
    }
  };

/*
================================
ADD PLANT
UPLOAD IMAGE
================================
*/

export const addPlant =
  async (formData) => {
    try {
      const response =
        await axios.post(
          API,
          formData,
          {
            headers: {
              Authorization:
                `Bearer ${getToken()}`,
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      return response.data;

    } catch (error) {
      console.error(
        "Error add plant:",
        error
      );

      throw error;
    }
  };

/*
================================
UPDATE PLANT
================================
*/

export const updatePlant =
  async (id, formData) => {
    try {
      const response =
        await axios.put(
          `${API}/${id}`,
          formData,
          {
            headers: {
              Authorization:
                `Bearer ${getToken()}`,
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      return response.data;

    } catch (error) {
      console.error(
        "Error update plant:",
        error
      );

      throw error;
    }
  };

/*
================================
DELETE PLANT
================================
*/

export const deletePlant =
  async (id) => {
    try {
      const response =
        await axios.delete(
          `${API}/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${getToken()}`,
            },
          }
        );

      return response.data;

    } catch (error) {
      console.error(
        "Error delete plant:",
        error
      );

      throw error;
    }
  };