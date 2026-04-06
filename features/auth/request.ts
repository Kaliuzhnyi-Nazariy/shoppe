import api, { clearToken, setToken } from "../api/api";
import type { SigninInterface, SignupInterface } from "./interface";

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
