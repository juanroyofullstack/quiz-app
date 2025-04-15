import React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Header from '@/app/components/Header';

import StoreProvider from './StoreProvider';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Quizz App',
    description: 'Developing my skills',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <StoreProvider>
            <html lang="en">
                <AppRouterCacheProvider>
                    <body className={inter.className}>
                        <Header />
                        {children}
                    </body>
                </AppRouterCacheProvider>
            </html>
        </StoreProvider>
    );
}
