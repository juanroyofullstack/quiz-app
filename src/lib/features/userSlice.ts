import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export interface userState {
  name: string,
  isLoggedIn: boolean
}

const cookieObject: userState | undefined = JSON.parse(Cookies.get("game") || "{}");
const initialState: userState = {
    name: cookieObject?.name || "",
    isLoggedIn: cookieObject?.isLoggedIn || false
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<userState>) => {
            const { name, isLoggedIn } = action.payload;
            state.name = name;
            state.isLoggedIn = isLoggedIn;
        },
        logout: () => {
            return initialState;
        }
    }
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;