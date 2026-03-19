export interface UserState {
  //   user: {
  //     name: string;
  //     email: string;
  //     role: "customer" | "admin" | null;
  //     id: string;
  //   };
  user: IUser;
  isLoading: boolean;
  error: string | null;
  isLoggedIn: boolean;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  role: "admin" | "customer" | null;
  password: string;
  email: string;

  orders: [];
  addresses: [];
  cart: [];
}
