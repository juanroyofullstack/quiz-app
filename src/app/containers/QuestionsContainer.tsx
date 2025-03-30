import React from 'react';

import { Question } from '@/app/components/Question';
import { useCount } from '@/app/lib/context/countContext';
import type { MappedResults } from '@/app/lib/utils/mapQuizzApiResponse';
import { loadingGame } from '@/lib/features/gameStatusSlice';
import { useAppDispatch } from '@/lib/hooks';

export const QuestionsContainer = ({ questions }: { questions: MappedResults[] }): JSX.Element => {
    const {
        state: {count, correctAnswers},
        dispatch: contextDispatch
    } = useCount();
    const dispatch = useAppDispatch();
    const correctAnswersCount = correctAnswers?.length || 0;
    if(count === 9) {
        return (
            <div className='flex items-center justify-center h-full'>
                <div className='flex flex-col items-center justify-center'>
                    <span className='py-4'>End of game, you had {correctAnswersCount} correct answers</span>
                    {correctAnswersCount > 0 ?
                        <> <span className='py-4'>Your correct answers are:</span>
                            <ul className='flex flex-col items-center justify-center'>
                                {correctAnswers?.map((answer, index) => {
                                    return (
                                        <li key={index} className='py-2'>
                                            <span>{answer.question}</span>
                                            <span>{answer.answer}</span>
                                        </li>);
                                })}
                            </ul>
                        </> : null}
                    <button onClick={() =>{
                        contextDispatch({ type: 'reset' });
                        dispatch(loadingGame());
                    }}>
                        <span className='py-4'>Do you want to play again?</span>
                    </button>
                </div>
            </div>);
    }

    return (
        <div className='QuestionContainer flex items-center justify-center h-full'>
            <Question key={questions[count].question} question={questions[count]} />
        </div>
    );
};