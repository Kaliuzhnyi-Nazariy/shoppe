import type {
  // IOrderItem,
  PlaceOrder,
} from "../order/interface";
import api from "../api/api";

export const createCheckout = async (products: PlaceOrder) => {
  // export const createCheckout = async (products: IOrderItem[]) => {
  return (await api.post("/payments/checkout/session", products)).data;
};
