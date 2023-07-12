/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  SliceCaseReducers,
  Draft,
} from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
}

interface IAuthState {
  loggedIn: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const login = createAsyncThunk<
  User,
  { username: string; password: string }
>("auth/login", async (credentials) => {
  const response = await axios.post("/api/login", credentials);
  return response.data.user;
});

type SliceStateWithAuthState = SliceCaseReducers<IAuthState>;

const authSlice = createSlice<IAuthState, SliceStateWithAuthState>({
  name: "auth",
  initialState: {
    loggedIn: false,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.loggedIn = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.loggedIn = true;
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
