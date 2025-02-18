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