import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from '../../components';

const Public: React.FC = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box>
                <Header />
            </Box>
            <Box sx={{ paddingTop: '68.5px' }}>
                <Outlet />
            </Box>
            <Box>
                <Footer />
            </Box>
        </Box>
    );
};

export default Public;
