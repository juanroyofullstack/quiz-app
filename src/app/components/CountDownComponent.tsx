import React, { useCallback, useEffect,useState } from 'react';

// import { useData } from '@/app/lib/hooks/useData';
import { countStatusFinished, countStatusStart } from '@/lib/features/gameStatusSlice';
import { useAppDispatch } from '@/lib/hooks';

export const CountDownComponent = ({ count }: { count: number }) => {
    const [countDown, setCountDown] = useState<number>(count);

    const dispatch = useAppDispatch();

    const startCountDown = useCallback(() => {
        const interval = setInterval(() => {
            setCountDown((value) => {
                if (value <= 1) {
                    clearInterval(interval);
                    dispatch(countStatusFinished());

                    return 0;
                }
                return value - 1;
            });
        }, 1000);}, [dispatch]);

    useEffect(() => {
        dispatch(countStatusStart());
        startCountDown();
    }, [dispatch, startCountDown]);

    return (
        <>
            {countDown > 0 ? (
                <div className="countdown">
                    <div className="countdown__item">
                        <div className="countdown__number">{countDown}</div>
                    </div>
                </div>
            ) : null }
        </>
    );
};