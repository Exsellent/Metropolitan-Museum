import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface IAuthState {
  loggedIn: boolean;
  user: IUser | null;
}

const authSlice = createSlice({
  name: "auth",
  initialState: { loggedIn: false, user: null } as IAuthState,
  reducers: {
    login: (state, action: PayloadAction<IUser>) => {
      state.loggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
