import api from "../api/api";

export const getDownloads = async () => {
  return (await api.get("/downloads")).data;
};
