'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { CountDownComponent } from '@/app/components/CountDownComponent';
import { Fallback } from '@/app/components/FallbackComponent';
import { QuestionsContainer } from '@/app/containers/QuestionsContainer';
import { CountProvider } from '@/app/lib/context/countContext';
import { useData } from '@/app/lib/hooks/useData';
import { useLocalStorage } from '@/app/lib/hooks/useLocalStorage';
import { loadingGame, reloadGame } from '@/lib/features/gameStatusSlice';
import type { userState } from '@/lib/features/userSlice';
import { logout } from '@/lib/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

export default function Page() {
    const { data, error, loading } = useData();
    const isUserLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
    const countStatus = useAppSelector((state) => state.game.countDownStatus);

    const isNotLoadingAndHasData = !loading && data.length > 0;
    const isNotLoadingHasDataAndCountIsOver =
        !loading && data.length > 0 && !countStatus;
    const isNotLoadingAndHasError = !loading && error;

    const dispatch = useAppDispatch();
    const router = useRouter();
    const [, setValue]: [userState, (value: userState) => void] =
        useLocalStorage<userState>(
            'game',
            { name: '', isLoggedIn: false },
            'cookie',
            -1,
        );

    useEffect(() => {
        dispatch(loadingGame());
    }, [dispatch]);

    const logOut = () => {
        setValue({ name: '', isLoggedIn: false });
        dispatch(reloadGame());
        dispatch(logout());
        return router.push('/');
    };

    if (isNotLoadingAndHasError) {
        return (
            <Fallback
                errorMessage={'test'}
                refreshOnClick={() => dispatch(loadingGame())}
            />
        );
    }

    return (
        <div className="GameContainer h-full">
            {isUserLoggedIn && isNotLoadingAndHasData && (
                <button onClick={() => logOut()}>Log Out</button>
            )}
            <CountProvider>
                {loading && <div>Loading...</div>}
                {!loading && data.length > 0 && (
                    <CountDownComponent count={3} />
                )}
                {isNotLoadingHasDataAndCountIsOver && (
                    <QuestionsContainer questions={data} />
                )}
            </CountProvider>
        </div>
    );
}
