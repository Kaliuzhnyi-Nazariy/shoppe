import api from "../api/api";
import type { IAddReview, IUpdateReview } from "./interface";

export const addReview = async ({
  email,
  name,
  rating,
  comment,
  productId,
}: IAddReview) => {
  return (
    await api.post("/reviews/post/" + productId, {
      email,
      name,
      rating,
      comment,
    })
  ).data;
};

export const getReviews = async (productId: string) => {
  return (await api.get("/reviews/" + productId)).data;
};

export const updateReview = async ({
  reviewId,
  rating,
  comment,
}: IUpdateReview) => {
  return (await api.put("/reviews/update/" + reviewId, { rating, comment }))
    .data;
};

export const deleteReview = async (reviewId: string) => {
  return (await api.delete("/reviews/delete/" + reviewId)).data;
};
