import React from 'react';

import { useCount } from '@/app/lib/context/countContext';
import type { MappedResults } from '@/app/lib/utils/mapQuizzApiResponse';

export const Question = ({ question }: { key: string, question: MappedResults }): JSX.Element => {
    const { dispatch } = useCount();
    const isCorrectAnswer = (answer: string) => {
        return question.correct_answer === answer ? dispatch({type: 'correct'}) : dispatch({type: 'increment'});
    };

    return (
        <div className='QuestionContainer'>
            <div className='Question'>{question.question}</div>
            <div className='Answers'>
                {question?.answers && question.answers.map((answer) => { return (<div key={answer} onClick={() => { isCorrectAnswer(answer);}}>{answer}</div>);} )}
            </div>
        </div>
    );
};