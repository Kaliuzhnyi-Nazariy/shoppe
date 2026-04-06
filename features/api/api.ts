import axios from "axios";

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
