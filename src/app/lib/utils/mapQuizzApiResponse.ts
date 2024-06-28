import { Results } from '@/app/lib/hooks/useData';

export interface MappedResults extends Results {
    answers?: string[]
}

export const mapQuizzApiResponse = (response: MappedResults[] | []): MappedResults[] | [] => {
    const returnValue = response;

    returnValue.map(question => {
        question.answers = [];
        return question.answers.push(...question.incorrect_answers, question.correct_answer);
    });

    return returnValue;
};