export interface UserState {
  user: IUser;
  isLoading: boolean;
  error: string | null;
  isLoggedIn: boolean;
  token: string | null;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  role: "admin" | "customer" | null;
  password: string;
  email: string;
  isPasswordSet: boolean;

  orders: [];
  addresses: [];
  cart: [];
}
