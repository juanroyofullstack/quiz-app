'use client';

import React, { useState } from 'react';

import { Fallback } from '@/app/components/FallbackComponent';
import { QuestionsContainer } from '@/app/containers/QuestionsContainer';
import { CountProvider } from '@/app/lib/context/countContext';
import { useData } from '@/app/lib/hooks/useData';

export default function Page () {
    const [value, setValue] = useState<boolean>(false);
    const { data, error, loading } = useData();
    const isNotLoadingAndHasData = !loading && data.length > 0;
    const isNotLoadingAndHasError = !loading && error;

    const refresh = ()=>{
        // re-renders the component
        setValue(!value);
    };

    if(isNotLoadingAndHasError) {
        return <Fallback errorMessage={'test'} refreshOnClick={refresh}/>;
    }

    return (
        <div className='GameContainer'>
            <CountProvider>
                {isNotLoadingAndHasData && <QuestionsContainer questions={data}/>}
            </CountProvider>
        </div>
    );
}
