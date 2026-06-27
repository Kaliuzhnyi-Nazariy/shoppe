export interface ICartProduct {
  id: string;
  title: string;
  description: string;
  photos: { link: string }[];
  rate: number;
  reviewCount: number;
  amount: number;
  isArchived: boolean;
}

export interface ICartItem {
  id: string;
  quantity: number;
  userId: string | null;
  price: number;
  product: ICartProduct;
}

export interface ICart {
  id: string;
  items: ICartItem[];
}
