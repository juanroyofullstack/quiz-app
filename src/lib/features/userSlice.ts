"use client"; //this is a client side component

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  isLoggedIn: false
};

export const userSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action) => {
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