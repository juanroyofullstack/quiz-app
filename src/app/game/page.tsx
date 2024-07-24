'use client';

import React from 'react';

import { Fallback } from '@/app/components/FallbackComponent';
import { QuestionsContainer } from '@/app/containers/QuestionsContainer';
import { CountProvider } from '@/app/lib/context/countContext';
import { useData } from '@/app/lib/hooks/useData';
import { GameStatus, reloadGame } from '@/lib/features/gameStatusSlice';
import { useAppDispatch } from '@/lib/hooks';

export default function Page () {
    const { data, error, loading } = useData();
    const isNotLoadingAndHasData = !loading && data.length > 0;
    const isNotLoadingAndHasError = !loading && error;
    const dispatch = useAppDispatch();

    if(isNotLoadingAndHasError) {
        return <Fallback errorMessage={'test'} refreshOnClick={dispatch(reloadGame({ status: GameStatus.IDLE}))}/>;
    }

    return (
        <div className='GameContainer'>
            <CountProvider>
                {isNotLoadingAndHasData && <QuestionsContainer questions={data}/>}
            </CountProvider>
        </div>
    );
}
