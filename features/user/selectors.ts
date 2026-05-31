import type { RootState } from "../../src/app/store";

export const userRole = (state: RootState) => state.user.user.role;
export const userDisplayName = (state: RootState) =>
  state.user.user.displayName;
export const userFirstName = (state: RootState) => state.user.user.firstName;
export const userLastName = (state: RootState) => state.user.user.lastName;
export const userLoggedIn = (state: RootState) => state.user.isLoggedIn;
export const userLoading = (state: RootState) => state.user.isLoading;
export const userEmail = (state: RootState) => state.user.user.email;
export const userPasswordSet = (state: RootState) =>
  state.user.user.isPasswordSet;

export const userId = (state: RootState) => state.user.user.id;
