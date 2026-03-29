// import axios from "axios";

// const API = axios.create({
//   baseURL: "https://trackmint-nqey.onrender.com/api",
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem("authToken");
//   if (token) req.headers.Authorization = `Bearer ${token}`;
//   return req;
// });

// API.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     console.error("API error:", err.response?.data || err.message);
//     return Promise.reject(err);
//   },
// );

// export default API;





import axios from "axios";

// Use Render backend in production, fallback to localhost in development
const API_URL = import.meta.env.PROD 
  ? "https://trackmint-nqey.onrender.com/api" 
  : "http://localhost:5000/api";

const API = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token automatically to requests if present
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("authToken");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// Handle API responses and errors globally
API.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API error:", err.response?.data || err.message);
    return Promise.reject(err);
  }
);

export default API;