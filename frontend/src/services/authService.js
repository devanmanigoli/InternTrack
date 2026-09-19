import api from "./api";

export const registerUser = async (data) => {
  try {
    const response = await api.post("/auth/register", data);

    localStorage.setItem("token", response.data.token);

    localStorage.setItem(
      "user",
      JSON.stringify({
        name: response.data.name,
        email: response.data.email
      })
    );

    return response.data;
  } catch (error) {
    console.error("Registration error:", error);

    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    if (typeof error.response?.data === "string") {
      throw new Error(error.response.data);
    }

    if (error.response?.status === 409) {
      throw new Error("Email is already registered.");
    }

    if (error.response?.status === 400) {
      throw new Error("Please check your registration details.");
    }

    if (error.response?.status === 500) {
      throw new Error(
        "Registration failed. The email may already be registered."
      );
    }

    if (error.request) {
      throw new Error(
        "Cannot connect to the InternTrack server."
      );
    }

    throw new Error("Unable to create account.");
  }
};

export const loginUser = async (data) => {
  try {
    const response = await api.post("/auth/login", data);

    localStorage.setItem("token", response.data.token);

    localStorage.setItem(
      "user",
      JSON.stringify({
        name: response.data.name,
        email: response.data.email
      })
    );

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};