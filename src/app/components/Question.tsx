'use client';

import React from 'react';
import { Button, FormControlLabel, Radio, RadioGroup } from '@mui/material';

import { useCount } from '@/app/lib/context/countContext';
import type { MappedResults } from '@/app/lib/utils/mapQuizzApiResponse';

export const Question = ({
    question,
    count,
}: {
    key: string;
    question: MappedResults;
    count: number;
}): JSX.Element => {
    const [selecteQuestion, setSelectedQuestion] = React.useState<string>('');
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
                <RadioGroup name="use-radio-group" defaultValue="first">
                    {question?.answers &&
                        question.answers.map((answer) => {
                            return (
                                <FormControlLabel
                                    key={answer}
                                    control={<Radio />}
                                    onClick={() => {
                                        setSelectedQuestion(answer);
                                    }}
                                    value={answer}
                                    label={answer}
                                    className="p-2
                                    hover:bg-[#b2b2b2]
                                    rounded-md"
                                />
                            );
                        })}
                </RadioGroup>
                {count < 9 && (
                    <Button
                        variant="contained"
                        onClick={() => {
                            isCorrectAnswer(selecteQuestion);
                            setSelectedQuestion('');
                        }}
                        className="mt-4"
                    >
                        Next Question
                    </Button>
                )}
                {count !== 0 && (
                    <Button
                        variant="contained"
                        onClick={() => {
                            dispatch({ type: 'decrement' });
                        }}
                        className="mt-4"
                    >
                        Previous Question
                    </Button>
                )}
            </div>
        </div>
    );
};
