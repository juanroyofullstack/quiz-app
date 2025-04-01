import type { Results } from '@/app/lib/hooks/useData';

export interface MappedResults extends Results {
    answers?: string[]
}

const deleteXHTMLcharacters = (str: string): string => {
    const characterMap: { [key: string]: string } = {
        '&quot;': '"',
        '&#039;': "'",
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&euro;': '€',
        '&copy;': '©',
        '&reg;': '®',
        '&trade;': '™',
        '&nbsp;': ' ',
        '&mdash;': '—',
        '&ndash;': '–',
        '&bull;': '•',
        '&hellip;': '…',
        '&lsquo;': '‘',
        '&rsquo;': '’',
        '&laquo;': '«',
        '&raquo;': '»'
    };
    return str.replace(/&quot;|&#039;|&amp;|&lt;|&gt;|&euro;|&copy;|&reg;|&trade;|&nbsp;|&mdash;|&ndash;|&bull;|&hellip;|&lsquo;|&rsquo;|&laquo;|&raquo;/g, match => characterMap[match] || match);
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
        answers: [...question.incorrect_answers, question.correct_answer].sort(() => 0.5 - Math.random()).map(answer => deleteXHTMLcharacters(answer))
    }));
};
