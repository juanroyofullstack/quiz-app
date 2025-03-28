'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Fallback } from '@/app/components/FallbackComponent';
import { QuestionsContainer } from '@/app/containers/QuestionsContainer';
import { CountProvider } from '@/app/lib/context/countContext';
import { useData } from '@/app/lib/hooks/useData';
import { useLocalStorage } from '@/app/lib/hooks/useLocalStorage';
import { reloadGame } from '@/lib/features/gameStatusSlice';
import type { userState } from '@/lib/features/userSlice';
import {
    logout
} from '@/lib/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

export default function Page () {
    const { data, error, loading } = useData();
    const isUserLoggedIn = useAppSelector(state => state.user.isLoggedIn);
    const isNotLoadingAndHasData = !loading && data.length > 0;
    const isNotLoadingAndHasError = !loading && error;
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [, setValue]: [userState, (value: userState) => void] = useLocalStorage<userState>('game', { name: '', isLoggedIn: false }, 'cookie', -1);

    const logOut = async () => {
        await dispatch(logout());
        await setValue({ name: '', isLoggedIn: false });
        await dispatch(reloadGame());
        return router.push('/');
    };

    if(isNotLoadingAndHasError) {
        return <Fallback errorMessage={'test'} refreshOnClick={() => dispatch(reloadGame())}/>;
    }
    return (
        <div className='GameContainer h-full'>
            {isUserLoggedIn && isNotLoadingAndHasData && <button onClick={() => logOut()}>Log Out</button>}
            <CountProvider>
                {isNotLoadingAndHasData && <QuestionsContainer questions={data}/>}
            </CountProvider>
        </div>
    );
}
