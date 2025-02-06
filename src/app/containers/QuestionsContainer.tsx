import React from 'react';

import { Question } from '@/app/components/Question';
import { useCount } from '@/app/lib/context/countContext';
import type { MappedResults } from '@/app/lib/utils/mapQuizzApiResponse';
import { GameStatus, reloadGame } from '@/lib/features/gameStatusSlice';
import { useAppDispatch } from '@/lib/hooks';

export const QuestionsContainer = ({ questions }: { questions: MappedResults[] }): JSX.Element => {
    const {
        state: {count, correctAnswers}
    } = useCount();
    const dispatch = useAppDispatch();

    if(count === 9) {
        return (
            <div className='flex items-center justify-center h-full'>
                <div>End of game, you had {correctAnswers} correct answers
                    <button onClick={() => dispatch(reloadGame({ status: GameStatus.IDLE}))}>
                        try again?
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