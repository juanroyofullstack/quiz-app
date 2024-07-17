import { useEffect, useState } from "react";

import type { MappedResults } from '../utils/mapQuizzApiResponse';
import { mapQuizzApiResponse } from '../utils/mapQuizzApiResponse';

export interface Results {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers:  string[];
}

export interface QuizzApiResponse {
    response_code: number;
    results: Results[],
}

export const useData = () => {
    const [data, setData] = useState<MappedResults[] | []>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        (
            async function(){
                try {
                    setLoading(true);
                    fetch('https://opentdb.com/api.php?amount=10').then((data: any) => {
                        return data.json();
                    }).then(data => {
                        if(data.response_code === 5) {
                            setError('No results');
                            throw new Error ('No results');
                        }
                        return setData(mapQuizzApiResponse(data.results));
                    });
                } catch(err: any) {
                    setError(err);
                    throw new Error ('No results');
                } finally {
                    setLoading(false);
                }
            })();
    }, []);

    return { data, error, loading };
};
