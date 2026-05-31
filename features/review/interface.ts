export interface IReview {
  comment: string;
  createdAt: string;
  id: string;
  productId: string;
  rating: string;
  updatedAt: string;
  user: {
    displayName: string;
  };
  userId: string;
}

export interface IAddReview {
  email: string;
  name: string;
  comment: string;
  rating: number;
  productId: string;
}

export interface IUpdateReview {
  reviewId: string;
  rating: number;
  comment: string;
}
