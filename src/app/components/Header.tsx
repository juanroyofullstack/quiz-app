import React from 'react';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <AppBar position="fixed" className="bg-blue-500 flex">
            <Toolbar className="flex justify-between">
                <Link href="/">
                    <Typography variant="h6" className="text-white">
                        Quiz App
                    </Typography>
                </Link>
                <Link href="/profile">
                    <Typography variant="h6" className="text-white">
                        Profile
                    </Typography>
                </Link>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
