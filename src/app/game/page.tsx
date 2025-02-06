'use client';

import React, { useEffect } from 'react';
import { redirect } from 'next/navigation';

import { Fallback } from '@/app/components/FallbackComponent';
import { QuestionsContainer } from '@/app/containers/QuestionsContainer';
import { CountProvider } from '@/app/lib/context/countContext';
import { useData } from '@/app/lib/hooks/useData';
import { GameStatus, reloadGame } from '@/lib/features/gameStatusSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

export default function Page () {
    const { data, error, loading } = useData();
    const isUserLoggedIn = useAppSelector(state => state.user.isLoggedIn);
    const isNotLoadingAndHasData = !loading && data.length > 0;
    const isNotLoadingAndHasError = !loading && error;
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(!isUserLoggedIn) {
            redirect('/');
        }
    }, [isUserLoggedIn]);

    if(isNotLoadingAndHasError) {
        return <Fallback errorMessage={'test'} refreshOnClick={dispatch(reloadGame({ status: GameStatus.IDLE}))}/>;
    }

    return (
        <div className='GameContainer h-full'>
            <CountProvider>
                {isNotLoadingAndHasData && <QuestionsContainer questions={data}/>}
            </CountProvider>
        </div>
    );
}
