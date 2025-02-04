import { Results } from '@/app/lib/hooks/useData';

export interface MappedResults extends Results {
    answers?: string[]
}

export const mapQuizzApiResponse = (response: MappedResults[]): MappedResults[] => {
    if(!response) return [];

    return response.map(question => ({
        ...question,
        answers: [...question.incorrect_answers, question.correct_answer]
    }));
};