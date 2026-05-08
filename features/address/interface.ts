export interface IPostAddress {
  firstName: string;
  lastName: string;
  companyName: string;
  country: string;
  streetAddress: string;
  postcode: string;
  city: string;
  phone: string;
  email: string;
}

export interface IAddress extends IPostAddress {
  id: string;
}
