import api from "../api/api";
import type { IPostAddress } from "./interface";

export const getAddresses = async () => {
  return (await api.get("/address/all")).data;
};

export const getAddressById = async (addressId: string) => {
  return (await api.get("/address/" + addressId)).data;
};

export const addAddress = async (data: IPostAddress) => {
  return (await api.post("/address/add", data)).data;
};

export const updateAddress = async ({
  data,
  addressId,
}: {
  data: IPostAddress;
  addressId: string;
}) => {
  return (await api.put("/address/update/" + addressId, data)).data;
};

export const deleteAddress = async (addressId: string) => {
  return (await api.delete("/address/" + addressId)).data;
};
