import React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Header: React.FC = () => {
    return (
        <AppBar position="static" className="bg-blue-500">
            <Toolbar className="flex justify-between">
                <Typography variant="h6" className="text-white">
                    Quiz App
                </Typography>
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
