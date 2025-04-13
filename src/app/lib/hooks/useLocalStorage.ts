import { useState } from 'react';

const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie =
        `${name}=${encodeURIComponent(value)}; ` + `expires=${expires}; path=/`;
};

const getCookie = (name: string): string | null => {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? decodeURIComponent(match[2]) : null;
};

export const useLocalStorage = <T>(
    key: string,
    defaultValue: T,
    storageType: 'localStorage' | 'cookie' = 'localStorage',
    cookieDays: number = 7,
): [T, (x: T) => void] => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            if (storageType === 'localStorage') {
                const item = window.localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            }
            if (storageType === 'cookie') {
                const item = getCookie(key);
                return item ? JSON.parse(item) : defaultValue;
            }
            return defaultValue;
        } catch (error) {
            return defaultValue;
        }
    });

    const setValue = (value: T) => {
        try {
            setStoredValue(value);
            if (storageType === 'localStorage') {
                return window.localStorage.setItem(key, JSON.stringify(value));
            }
            if (storageType === 'cookie') {
                return setCookie(key, JSON.stringify(value), cookieDays);
            }
            return value;
        } catch (error) {
            return value;
        }
    };

    return [storedValue, setValue];
};
