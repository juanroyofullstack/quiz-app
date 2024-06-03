"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
            state.name = "";
            state.isLoggedIn = false;
        }
    }
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;