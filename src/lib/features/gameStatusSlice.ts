import { createSlice } from "@reduxjs/toolkit";

export enum GameStatus {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    IN_PROGRESS = 'IN_PROGRESS',
    FINISHED = 'FINISHED',
    FAILED_FETCH = 'FAILED_FETCH'
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
        reloadGame: (state) => {
            state.status = GameStatus.IDLE;
        },
        startGame: (state) => {
            state.status = GameStatus.IN_PROGRESS;
        },
        loadingGame: (state) => {
            state.status = GameStatus.LOADING;
        },
        finishGame: (state) => {
            state.status = GameStatus.FINISHED;
        },
        failedFethGame: (state) => {
            state.status = GameStatus.FAILED_FETCH;
        }
    }
});

export const { startGame, loadingGame, reloadGame, finishGame, failedFethGame } = gameStatusSlice.actions;

export default gameStatusSlice.reducer;