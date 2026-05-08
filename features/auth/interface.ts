export interface SigninInterface {
  email: string;
  password: string;
}

export interface SignupInterface extends SigninInterface {
  firstName: string;
  lastName: string;
  displayName: string;
  confirmPassword: string;
}

export interface ISetPassword {
  token: string;
  password: string;
  confirmPassword: string;
}
