import React, { useState } from 'react';

import { Question } from '@/app/components/Question';
import { useCount } from '@/app/lib/context/countContext';
import type { MappedResults } from '@/app/lib/utils/mapQuizzApiResponse';

export const QuestionsContainer = ({ questions }: { questions: MappedResults[] }): JSX.Element => {
    // const [questionState, setQuestionState] = useState(questions);
    const {
        state: {count}
    } = useCount();
    return (
        <div className='QuestionContainer'>
            <Question key={questions[count].question} question={questions[count]} />
        </div>
    );
};