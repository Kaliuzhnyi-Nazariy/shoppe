import api, { clearToken, setToken } from "../api/api";
import type {
  ISetPassword,
  SigninInterface,
  SignupInterface,
} from "./interface";

export const signin = async (data: SigninInterface) => {
  const { token } = (await api.post("/auth/signin", data)).data;
  setToken(token);
  return token;
};

export const signup = async (data: SignupInterface) => {
  const { token } = (await api.post("/auth/signup", data)).data;

  setToken(token);
  return token;
};

export const signout = async () => {
  clearToken();
  return;
};

export const checkoutSignup = async (data: SignupInterface) => {
  const res = (await api.post("/auth/signup/checkout", data)).data;

  return res;
};

export const setPassword = async (data: ISetPassword) => {
  await api.post("/auth/set/password/" + data.token, {
    // await api.post("/auth/set/password/" + data.idToResetPassword, {
    password: data.password,
    confirmPassword: data.confirmPassword,
  });
};

export const resetPassword = async (data: ISetPassword) => {
  await api.patch("/auth/password/reset", data);
};

export const forgetPassword = async (data: { email: string }) => {
  const { token } = (await api.post("/auth/password/forget", data)).data;

  return token;
};

export const passwordRequest = async () => {
  await api.post("/auth/password/reset/request");
};
