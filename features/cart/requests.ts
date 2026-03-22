import api from "../api/api";

export const getCart = async () => {
  const data = (await api.get("/cart")).data;
  // console.log("data in request: ", data);
  return data;
};

export const addMany = async (data: {
  productId: string;
  quantity: number;
}) => {
  return (await api.post("/cart/add/many", data)).data;
};
