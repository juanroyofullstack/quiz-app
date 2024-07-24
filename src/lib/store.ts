import { configureStore } from '@reduxjs/toolkit';

import gameStatusSlice from "./features/gameStatusSlice";
import userSlice from "./features/userSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        game: gameStatusSlice
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch