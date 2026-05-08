import api from "../api/api";
import type { ICartItem } from "./interface";

export const getCart = async () => {
  const data = (await api.get("/cart")).data;
  // console.log("data in request: ", data);
  return data;
};

// export const addMany = async (data: {
//   productId: string;
//   quantity: number;
// }) => {
export const addMany = async (data: ICartItem) => {
  return (await api.post("/cart/add/many", data)).data;
};

export const addToCart = async (data: {
  productId: string;
  quantity: number;
}) => {
  return (await api.post("/cart/add", data)).data;
};

export const reduceQuantity = async ({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) => {
  return (await api.post("/cart/remove/" + productId, { quantity })).data;
};

export const removeFromCart = async (productId: string) => {
  return (await api.delete("/cart/item/" + productId)).data;
};

export const clearCart = async () => {
  return (await api.delete("/cart/clear")).data;
};
