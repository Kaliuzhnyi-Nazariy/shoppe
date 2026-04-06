import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { setToken } from "../api/api";
import type { IUser } from "./interface";
import axios from "axios";
import type { RootState } from "../../src/app/store";

export const getUser = createAsyncThunk<
  IUser,
  void,
  { rejectValue: { message: string } }
>("/users/me", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get("/users/me");

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue({
        message: error.response?.data?.message || "User is not found!",
      });
    }
  }
});

export const refreshUser = createAsyncThunk<
  IUser,
  void,
  { rejectValue: { message: string } }
>("user/refresh", async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const persistedToken = state.user.token;

  if (!persistedToken)
    return thunkAPI.rejectWithValue({ message: "Unable to fetch user" });

  try {
    setToken(persistedToken);
    const res = await api.get("/users/me");
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || "User is not found!",
      });
    }
  }
});
