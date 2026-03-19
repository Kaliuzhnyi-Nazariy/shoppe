import type { RootState } from "../../src/app/store";

export const userRole = (state: RootState) => state.user.user.role;
export const userLoggedIn = (state: RootState) => state.user.isLoggedIn;
export const userLoading = (state: RootState) => state.user.isLoading;
