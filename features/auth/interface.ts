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
