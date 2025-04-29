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
                <Button
                    href="/profile"
                    variant="text"
                    className="text-white hover:bg-blue-700"
                >
                    Profile
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
