import axios from "axios";
import { store } from "../../src/app/store";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
  // withCredentials: true,
});

export const setToken = (token: string) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  api.defaults.headers.common.Authorization = ``;
};

export default api;

api.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.user.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ask ChatGPT to explain new part of code api.inerceptors...
