import type { Results } from '@/app/lib/hooks/useData';

export interface MappedResults extends Results {
    answers?: string[]
}

const deleteXHTMLcharacters = (str: string): string => {
    return str.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#039;/g, "'").replace(/&euro;/g, '€').replace(/&copy;/g, '©').replace(/&reg;/g, '®').replace(/&trade;/g, '™').replace(/&nbsp;/g, ' ').replace(/&mdash;/g, '—').replace(/&ndash;/g, '–').replace(/&bull;/g, '•').replace(/&hellip;/g, '…').replace(/&lsquo;/g, '‘').replace(/&rsquo;/g, '’').replace(/&laquo;/g, '«').replace(/&raquo;/g, '»');
};

/**
 * Maps the API response to a more usable format.
 * @param {MappedResults[]} response - The API response to map.
 * @returns {MappedResults[]} - The mapped response.
 */

export const mapQuizzApiResponse = (response: MappedResults[]): MappedResults[] => {
    if(!response) return [];

    return response.map(question => ({
        ...question,
        question: deleteXHTMLcharacters(question.question),
        correct_answer: deleteXHTMLcharacters(question.correct_answer),
        incorrect_answers: question.incorrect_answers.map(answer => deleteXHTMLcharacters(answer)),
        answers: [...question.incorrect_answers, question.correct_answer].sort(() => 0.5 - Math.random())
    }));
};
