'use client';

import React, { FormEvent, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';

import { useLocalStorage } from '@/app/lib/hooks/useLocalStorage';
import type { userState } from '@/lib/features/userSlice';
import { login } from '@/lib/features/userSlice';
import { useAppDispatch } from '@/lib/hooks';

export default function Page() {
    const [name, setName] = useState<string>('');
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [, setValue]: [userState, (value: userState) => void] =
        useLocalStorage<userState>(
            'game',
            { name: '', isLoggedIn: false },
            'cookie',
            7,
        );

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        dispatch(login({ name: name, isLoggedIn: true }));
        await setValue({ name: name, isLoggedIn: true });
        return router.push(`/game?name=${encodeURIComponent(name)}`);
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div
                className="
                    relative flex flex-col rounded-xl bg-transparent
                    bg-clip-border text-gray-700 shadow-none"
            >
                <h4
                    className="
                        block font-sans text-2xl font-semibold
                        leading-snug tracking-normal text-blue-gray-900
                        antialiased
                    "
                >
                    Welcome to Quizzzy
                </h4>
                <p
                    className="
                        mt-1 block font-sans text-base font-normal
                        leading-relaxed text-gray-700 antialiased
                    "
                >
                    Enter your details to register.
                </p>
                <p
                    className="mt-1 block font-sans text-base
                font-normal leading-relaxed text-gray-700 antialiased"
                >
                    After you enter your details the game will start.
                </p>
                <form
                    className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
                    onSubmit={onSubmit}
                >
                    <div className="mb-4 flex flex-col gap-6">
                        <div className="relative h-11 w-full min-w-[200px]">
                            <TextField
                                id="standard-basic"
                                label="Name"
                                variant="outlined"
                                fullWidth
                                onChange={(e) =>
                                    setName(
                                        (e.target as HTMLInputElement).value,
                                    )
                                }
                            />
                        </div>
                    </div>
                    <Button
                        variant="contained"
                        fullWidth
                        disabled={name.length === 0}
                        type="submit"
                    >
                        Login
                    </Button>
                </form>
            </div>
        </div>
    );
}
