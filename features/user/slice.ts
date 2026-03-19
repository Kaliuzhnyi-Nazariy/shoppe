import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUser, UserState } from "./interface";
import { getUser } from "./operations";

const initialState: UserState = {
  user: {
    // name: "",
    // email: "",
    // role: null,
    // id: "",
    id: "",
    firstName: "",
    lastName: "",
    displayName: "",
    role: null,
    password: "",
    email: "",

    orders: [],
    addresses: [],
    cart: [],
  },
  isLoading: false,
  error: null,
  isLoggedIn: false,
};

const pendingHandler = (state: UserState) => {
  state.isLoading = true;
  state.error = null;
};

// const rejectedHandler = (
//   state: UserState,
//   action: PayloadAction<{ message: string } | undefined>,
// ) => {
//   state.isLoading = false;
//   state.error = action.payload?.message || "Sth went wrong!";
// };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.user = initialState.user;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getUser.pending, pendingHandler)
      .addCase(
        getUser.fulfilled,
        (state: UserState, action: PayloadAction<IUser>) => {
          state.user = action.payload;
          state.isLoggedIn = true;
          state.isLoading = false;
        },
      )
      .addCase(
        getUser.rejected,
        (
          state: UserState,
          action: PayloadAction<{ message: string } | undefined>,
        ) => {
          state.isLoading = false;
          state.error = action.payload?.message || "Sth went wrong!";
          state.isLoggedIn = false;
        },
      ),
});

export const userReducer = userSlice.reducer;
export const { logout } = userSlice.actions;
