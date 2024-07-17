import React from 'react';

import { Question } from '@/app/components/Question';
import { useCount } from '@/app/lib/context/countContext';
import type { MappedResults } from '@/app/lib/utils/mapQuizzApiResponse';

export const QuestionsContainer = ({ questions }: { questions: MappedResults[] }): JSX.Element => {
    const {
        state: {count, correctAnswers}, dispatch
    } = useCount();

    if(count === 9) {
        return (<div><div>End of game, you had {correctAnswers} correct answers <button onClick={() => dispatch({type: 'reset'})}>try again?</button></div></div>);
    }

    return (
        <div className='QuestionContainer'>
            <Question key={questions[count].question} question={questions[count]} />
        </div>
    );
};