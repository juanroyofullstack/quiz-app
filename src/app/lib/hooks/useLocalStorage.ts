import { useState } from 'react';

export const useLocalStorage = <T>(key: string, defaultValue: T) => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch(error) {
            console.log(error);
            return defaultValue;
        }
    });

    const setValue = (value: T) => {
        try {
            setStoredValue(value);
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch(error) {
            console.log(error);
        }
    };

    return [storedValue, setValue];
};