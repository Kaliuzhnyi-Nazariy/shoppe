import type { RootState } from "../../src/app/store";

export const userRole = (state: RootState) => state.user.user.role;
export const userDisplayName = (state: RootState) =>
  state.user.user.displayName;
export const userFirstName = (state: RootState) => state.user.user.firstName;
export const userLastName = (state: RootState) => state.user.user.lastName;
export const userLoggedIn = (state: RootState) => state.user.isLoggedIn;
export const userLoading = (state: RootState) => state.user.isLoading;
