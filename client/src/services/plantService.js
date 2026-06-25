import axios from 'axios';

const API_URL = 'http://localhost:5000/api/plants';

const plantService = {
  // Get all plants
  getPlants: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch plants' };
    }
  },

  // Get plants by category
  getPlantsByCategory: async (category) => {
    try {
      const response = await axios.get(`${API_URL}/category/${category}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch plants' };
    }
  },

  // Get plant by slug
  getPlantBySlug: async (slug) => {
    try {
      const response = await axios.get(`${API_URL}/${slug}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch plant' };
    }
  },

  // Add plant (admin only)
  addPlant: async (formData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(API_URL, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to add plant' };
    }
  },

  // Update plant (admin only)
  updatePlant: async (id, formData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to update plant' };
    }
  },

  // Delete plant (admin only)
  deletePlant: async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${API_URL}/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to delete plant' };
    }
  },
};

export default plantService;

// Named exports untuk compatibility
export const getPlants = plantService.getPlants;
export const getPlantsByCategory = plantService.getPlantsByCategory;
export const getPlantBySlug = plantService.getPlantBySlug;
export const addPlant = plantService.addPlant;
export const updatePlant = plantService.updatePlant;
export const deletePlant = plantService.deletePlant;