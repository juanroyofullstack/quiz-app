import { useState } from 'react';

export const useLocalStorage = <T>(key: string, defaultValue: T): [T, (x: T) => void] => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch(error) {
            throw new Error('error');
        }
    });

    const setValue = (value: T) => {
        try {
            setStoredValue(value);
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch(error) {
            throw new Error('error');
        }
    };

    return [storedValue, setValue];
};