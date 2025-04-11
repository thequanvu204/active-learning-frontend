import axios, { AxiosInstance } from "axios";
import { getToken, setToken, removeToken } from "@/utils/token.util";

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL || "https://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Ungültiges Token. Benutzer wird abgemeldet.");
      removeToken();

      if (window.location.pathname !== "/") {
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
