import api from "../api/api";
// import type { ICreateProduct } from "./interface";

// export const getProducts = async () => {
//   return (await api.get("/products")).data;
// };

// export const getProducts = async (search?: string) => {
//   return (
//     await api.get("/products", {
//       params: { search: search },
//     })
//   ).data;
// };

export const getProducts = async (
  search?: string,
  lte?: string,
  gte?: string,
  stock?: string,
  sort?: string,
) => {
  return (
    await api.get("/products", {
      params: { search, lte, gte, stock, sort },
    })
  ).data;
};

export const getProductById = async (id: string) => {
  return (await api.get("/products/" + id)).data;
};

export const createProduct = async (data: FormData) => {
  return (await api.post("/products", data)).data;
};

export const updateProduct = async ({
  mutationData,
  productId,
}: {
  mutationData: FormData;
  productId: string;
}) => {
  return (await api.put("/products/" + productId, mutationData)).data;
};

export const deleteProduct = async (productId: string) => {
  return (await api.delete("/products/" + productId)).data;
};

export const archiveProduct = async (productId: string) => {
  return (await api.patch("/products/archive/" + productId)).data;
};

export const getProductsStats = async () => {
  return (await api.get("/products/stats")).data;
};
