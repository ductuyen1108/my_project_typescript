import { Box } from '@mui/material';
import React from 'react';

const Home: React.FC = () => {
    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                backgroundImage: 'url("https://i.imgur.com/kUEikoE.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        ></Box>
    );
};

export default Home;
