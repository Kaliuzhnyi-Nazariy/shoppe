import api from "../api/api";
import type { PlaceOrder } from "./interface";

export const placeOrder = async (orderData: PlaceOrder) => {
  return (await api.post("/orders/place", orderData)).data;
};

export const getOrders = async (search?: string) => {
  return (await api.get("/orders", { params: { search } })).data;
};

export const getOrderById = async (id: string) => {
  return (await api.get("/orders/" + id)).data;
};

export const cancelOrder = async (id: string) => {
  return (await api.patch("/orders/cancel/" + id)).data;
};

export const updateOrderStatus = async (id: string) => {
  return (await api.patch("/orders/status/" + id)).data;
};

export const downloadOrder = async (orderId: string) => {
  const res = await api.get(`/orders/download/${orderId}`, {
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(res.data);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${orderId}.pdf`;
  a.click();

  window.URL.revokeObjectURL(url);
};
