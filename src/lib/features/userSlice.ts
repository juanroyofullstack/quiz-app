"use client"; //this is a client side component

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppStore } from "../../lib/store"

interface userState {
  name: string,
  isLoggedIn: boolean
}

const initialState: userState = {
  name: "",
  isLoggedIn: false
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<userState>) => {
      state = action.payload;
    },
    logout: (state) => {
      state = {
        name: "",
        isLoggedIn: false
      };
    },
  },
});

export const { login, logout } = userSlice.actions

export default userSlice.reducer;