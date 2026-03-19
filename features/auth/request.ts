import api from "../api/api";
import type { SigninInterface, SignupInterface } from "./interface";

export const signin = async (data: SigninInterface) => {
  return (await api.post("/auth/signin", data)).data;
};

export const signup = async (data: SignupInterface) => {
  return (await api.post("/auth/signup", data)).data;
};

export const signout = async () => {
  return await api.post("/auth/signout");
};
