'use client';

import React from 'react';
import { Button } from '@mui/material';

import { useCount } from '@/app/lib/context/countContext';
import type { MappedResults } from '@/app/lib/utils/mapQuizzApiResponse';

export const Question = ({
    question,
}: {
    key: string;
    question: MappedResults;
}): JSX.Element => {
    const { dispatch } = useCount();

    const isCorrectAnswer = (answer: string) => {
        return question.correct_answer === answer
            ? dispatch({
                type: 'correct',
                payload: {
                    question: question.question,
                    answer: answer,
                },
            })
            : dispatch({ type: 'increment' });
    };

    return (
        <div className="Question">
            <div className="QuestionTitle">{question.question}</div>
            <div className="Answers flex flex-col justify-center items-center">
                {question?.answers &&
                    question.answers.map((answer) => {
                        return (
                            <Button
                                key={answer}
                                onClick={() => {
                                    isCorrectAnswer(answer);
                                }}
                                className="p-2 hover:bg-[#b2b2b2] rounded-md"
                            >
                                {answer}
                            </Button>
                        );
                    })}
            </div>
        </div>
    );
};
