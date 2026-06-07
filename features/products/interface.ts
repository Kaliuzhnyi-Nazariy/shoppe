export type Categories =
  | "ELECTRONICS"
  | "GAMING"
  | "HOME"
  | "OTHER"
  | "JEWELRY"
  | "BOOKS"
  | "FOOD";

export interface IProduct {
  id: string;
  photos: { id: string; link: string }[];
  // photos: string[];
  title: string;
  description: string;
  additionalInformation: string;
  price: number;
  amount: number;
  isArchived: boolean;
  rate: number;
  categories: Categories[];
}

export interface ICreateProduct {
  photos: FileList;
  // photos: File[];
  title: string;
  description: string;
  additionalInformation?: string;
  price: number;
  amount?: number;
  categories: Categories[];
}

export interface ICreateProductForm {
  photos: FileList;
  // photos: File[];
  title: string;
  description: string;
  additionalInformation?: string;
  price: number;
  amount?: number;
  categories: Categories[];
}

// export interface IProductFull extends IProduct {
//   reviewCount: number;
// }

export interface IProductFull extends IProduct {
  reviewCount: number;
  // reviews: [];
}
