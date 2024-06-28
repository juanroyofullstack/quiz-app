'use client';

import React from 'react';

import { Question } from '@/app/components/Question';
import { useData } from '@/app/lib/hooks/useData';

export default function Page () {
    const { data, error, loading } = useData();
    return (
        <div className='GameContainer'>
            {!loading && data.length > 0 && data.map(question => { return <Question key={question.question} questions={question} />;})}
        </div>
    );
}
