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
}

export interface ICreateProduct {
  photos: FileList;
  // photos: File[];
  title: string;
  description: string;
  additionalInformation?: string;
  price: number;
  amount?: number;
}

export interface ICreateProductForm {
  photos: FileList;
  // photos: File[];
  title: string;
  description: string;
  additionalInformation?: string;
  price: number;
  amount?: number;
}

export interface IProductFull extends IProduct {
  reviewCount: number;
}
