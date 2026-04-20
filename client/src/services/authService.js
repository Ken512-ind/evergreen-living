const API_URL =
  "http://localhost:5000/api";

export const loginUser =
  async (form) => {

    const response =
      await fetch(
        `${API_URL}/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(form),
        }
      );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
        "Login failed"
      );
    }

    return data;
};