'use client';

import React from 'react';

import { QuestionsContainer } from '@/app/containers/QuestionsContainer';
import { CountProvider } from '@/app/lib/context/countContext';
import { useData } from '@/app/lib/hooks/useData';

export default function Page () {
    const { data, error, loading } = useData();

    return (
        <div className='GameContainer'>
            <CountProvider>
                {!loading && data.length > 0 && <QuestionsContainer questions={data}/>}
            </CountProvider>
        </div>
    );
}
