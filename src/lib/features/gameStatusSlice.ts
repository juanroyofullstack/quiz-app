import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum GameStatus {
    IDLE = 'IDLE',
    IN_PROGRESS = 'IN_PROGRESS',
    FINISHED = 'FINISHED'
}

interface gameState {
  status: GameStatus,
}

const initialState: gameState = {
    status: GameStatus.IDLE
};

export const gameStatusSlice = createSlice({
    name: "gameStatus",
    initialState,
    reducers: {
        startGame: (state, action: PayloadAction<gameState>) => {
            return { ...state, status: action.payload.status };
        },
        reloadGame: (state, action: PayloadAction<gameState>) => {
            return { ...state, status: action.payload.status };
        },
        finishGame: (state, action: PayloadAction<gameState>) => {
            return { ...state, status: action.payload.status };
        }
    }
});

export const { startGame, reloadGame, finishGame } = gameStatusSlice.actions;

export default gameStatusSlice.reducer;