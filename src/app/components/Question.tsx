import React from 'react';

import { Results } from '@/app/lib/hooks/useData';
export const Question = ({ key, questions }: { key: string, questions: Results }): JSX.Element => {

    return (
        <div>
            <div key={key}>{questions.question}</div>;
        </div>
    );
};