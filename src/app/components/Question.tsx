import React from 'react';

import { useCount } from '@/app/lib/context/countContext';
import type { MappedResults } from '@/app/lib/utils/mapQuizzApiResponse';

export const Question = ({ question }: { key: string, question: MappedResults }): JSX.Element => {
    const { dispatch } = useCount();
    const isCorrectAnswer = (answer: string) => {
        return question.correct_answer === answer ? dispatch({type: 'correct'}) : dispatch({type: 'increment'});
    };

    return (
        <div className='Question'>
            <div className='QuestionTitle'>{question.question}</div>
            <div className='Answers flex flex-col justify-center items-center'>
                {question?.answers && question.answers.map(
                    (answer) => {
                        return (
                            <div
                                key={answer}
                                onClick={() => { isCorrectAnswer(answer);}}
                                className="p-2 hover:bg-[#b2b2b2] rounded-md">
                                {answer}
                            </div>);
                    }
                )}
            </div>
        </div>
    );
};