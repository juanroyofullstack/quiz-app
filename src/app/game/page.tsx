'use client';

import React from 'react';

import { QuestionsContainer } from '@/app/containers/QuestionsContainer';
import { CountProvider } from '@/app/lib/context/countContext';
import { useData } from '@/app/lib/hooks/useData';

function Fallback({ errorMessage }: { errorMessage: string }) {
    return (
        <div role="alert">
            <p>Something went wrong: {errorMessage}</p>
            <pre style={{ color: "red" }}></pre>
        </div>
    );
}

export default function Page () {
    const { data, error, loading } = useData();
    const isNotLoadingAndHasData = !loading && data.length > 0;

    if(!loading && error) {
        return <Fallback errorMessage={error} />;
    }

    return (
        <div className='GameContainer'>
            <CountProvider>
                {isNotLoadingAndHasData && <QuestionsContainer questions={data}/>}
            </CountProvider>
        </div>
    );
}
