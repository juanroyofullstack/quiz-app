'use client';

import React, { useEffect, useState } from 'react';

import { useLocalStorage } from '@/app/lib/hooks/useLocalStorage';
import type { userState } from '@/lib/features/userSlice';

export default function Page() {
    const [isMounted, setIsMounted] = useState(false);
    const [cookie]: [userState, (value: userState) => void] =
        useLocalStorage<userState>(
            'game',
            { name: '', isLoggedIn: false },
            'cookie',
            7,
        );

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div
            className="flex flex-col
            pt-16 h-screen
            items-center justify-center"
        >
            <h1>Profile Page</h1>
            <p>Welcome to your profile page!</p>
            {/* Add more profile-related content here */}
            {isMounted &&
                (cookie.isLoggedIn ? (
                    <p>{cookie.name}</p>
                ) : (
                    <p>Not logged in</p>
                ))}
        </div>
    );
}
