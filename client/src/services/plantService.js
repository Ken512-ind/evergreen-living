const API_URL = "http://localhost:5000/api/plants";

export const getPlants = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch plants");
  }

  return response.json();
};

export const getPlantBySlug = async (slug) => {
  const response = await fetch(
    `${API_URL}/${slug}`
  );

  if (!response.ok) {
    throw new Error("Plant not found");
  }

  return response.json();
};

export const createPlant = async (plantData) => {
  const token = localStorage.getItem("token");

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(plantData),
  });

  if (!response.ok) {
    throw new Error("Failed to create plant");
  }

  return response.json();
};

export const updatePlant = async (
  id,
  plantData
) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(plantData),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update plant");
  }

  return response.json();
};

export const deletePlant = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete plant");
  }

  return response.json();
};