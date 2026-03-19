import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";
import type { IUser } from "./interface";
import axios from "axios";

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
