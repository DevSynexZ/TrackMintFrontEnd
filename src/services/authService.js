// authService.js
import API from "./api";

export const signup = async (userData) => {
  const res = await API.post("/auth/register", userData);
  return res.data;
};

export const Login = async (credentials) => {
  const res = await API.post("/auth/login", credentials);
  return res.data;
};

// Add this for profile
export const getProfile = async () => {
  const res = await API.get("/auth/profile");
  return res.data;
};
