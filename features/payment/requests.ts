import type { PlaceOrder } from "../order/interface";
import api from "../api/api";

export const createCheckout = async (products: PlaceOrder) => {
  return (await api.post("/payments/checkout/session", products)).data;
};
