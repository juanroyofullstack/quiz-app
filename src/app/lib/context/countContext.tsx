import React, { createContext, useContext, useReducer } from 'react';

type Action = { type: 'increment' | 'decrement' | 'correct' | 'reset' }
type Dispatch = (action: Action) => void
type State = { count: number, correctAnswers: number }
type CountProviderProps = { children: React.ReactNode }

const CountStateContext = createContext<
	{ state: State; dispatch: Dispatch } | undefined
>(undefined);

function countReducer(state: State, action: Action) {
    switch (action.type) {
    case 'increment': {
        return { ...state, count: state.count + 1 };
    }
    case 'decrement': {
        return { ...state, count: state.count - 1 };
    }
    case 'correct': {
        return { count: state.count + 1, correctAnswers: state.correctAnswers + 1 };
    }
    case 'reset': {
        return { count: 0, correctAnswers: 0 };
    }
    default: {
        throw new Error(`Unhandled action type: ${action.type}`);
    }
    }
}

function CountProvider({ children }: CountProviderProps) {
    const [state, dispatch] = useReducer(countReducer, { count: 0, correctAnswers: 0 });

    const value = { state, dispatch };

    return <CountStateContext.Provider value={value}>{children}</CountStateContext.Provider>;
}

function useCount() {
    const context = useContext(CountStateContext);
    if (context === undefined) {
        throw new Error('useCount must be used within a CountProvider');
    }
    return context;
}

export { CountProvider, useCount };