import { useEffect, useState } from 'react';

import {
    failedFethGame,
    GameStatus,
    startGame,
} from '@/lib/features/gameStatusSlice';
import { countStatusStart } from '@/lib/features/gameStatusSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

import type { MappedResults } from '../utils/mapQuizzApiResponse';
import { mapQuizzApiResponse } from '../utils/mapQuizzApiResponse';

export interface Results {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

export interface QuizzApiResponse {
    response_code: number;
    results: Results[];
}

export const useData = () => {
    const [data, setData] = useState<MappedResults[] | []>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useAppDispatch();

    const gameState = useAppSelector((state) => state.game.status);

    useEffect(() => {
        if (gameState === GameStatus.LOADING) {
            (async function () {
                try {
                    setError(null);
                    setLoading(true);
                    setData([]);
                    fetch('https://opentdb.com/api.php?amount=10')
                        .then((data: any) => {
                            return data.json();
                        })
                        .then((data) => {
                            if (data.response_code === 5) {
                                setError('No results');
                                setLoading(false);
                                return dispatch(failedFethGame());
                            }
                            dispatch(startGame());
                            dispatch(countStatusStart());
                            setLoading(false);
                            return setData(mapQuizzApiResponse(data.results));
                        });
                } catch (err: any) {
                    setError(err);
                    setLoading(false);
                    setData([]);
                    dispatch(failedFethGame());
                    console.log(err.message);
                    throw new Error('No results');
                }
            })();
        }
    }, [dispatch, gameState]);

    return { data, error, loading };
};
