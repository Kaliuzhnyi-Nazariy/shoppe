import api from "../api/api";

export const getProducts = async () => {
  return (await api.get("/products")).data;
};

export const getProductById = async (id: string) => {
  return (await api.get("/products/" + id)).data;
};
