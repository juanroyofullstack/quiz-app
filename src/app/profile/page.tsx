'use client';

import React from 'react';

import { useLocalStorage } from '@/app/lib/hooks/useLocalStorage';
import type { userState } from '@/lib/features/userSlice';

export default function Page() {
    const [cookie]: [userState, (value: userState) => void] =
        useLocalStorage<userState>(
            'game',
            { name: '', isLoggedIn: false },
            'cookie',
            7,
        );
    return (
        <div style={{ padding: '20px' }}>
            <h1>Profile Page</h1>
            <p>Welcome to your profile page!</p>
            {/* Add more profile-related content here */}
            <div>{cookie.name}</div>
        </div>
    );
}
