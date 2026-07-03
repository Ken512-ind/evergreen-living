import api from "./api";

// ==========================
// LOGIN
// ==========================
export const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return response.data;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

// ==========================
// REGISTER
// ==========================
export const register = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);

    return response.data;
  } catch (error) {
    console.error("Register Error:", error);
    throw error;
  }
};

// ==========================
// PROFILE
// ==========================
export const getProfile = async () => {
  try {
    const response = await api.get("/auth/profile");

    return response.data;
  } catch (error) {
    console.error("Profile Error:", error);
    throw error;
  }
};

// ==========================
// LOGOUT
// ==========================
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// ==========================
// GET USER
// ==========================
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");

  if (!user) return null;

  return JSON.parse(user);
};

// ==========================
// CHECK LOGIN
// ==========================
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};