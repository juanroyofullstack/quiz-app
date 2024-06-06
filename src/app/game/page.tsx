'use client';

import React, { useEffect } from 'react';

import { data } from '@/app/lib/data';

export default function Page () {
    useEffect(() => {
        data();
    }, []);

    return (
        <div>test</div>
    );
}