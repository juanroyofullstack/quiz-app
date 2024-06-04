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
        login: (_, action: PayloadAction<userState>) => {
            return action.payload;
        },
        logout: () => {
            return initialState;
        }
    }
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;