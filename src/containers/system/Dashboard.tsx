import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Admin } from '../../components';

const Dashboard: React.FC = () => {
    return (
        <Box>
            <Box display={'flex'}>
                <Admin />
                <Box sx={{ flexGrow: 1, p: 3, backgroundColor: '#f5f5f5', height: '100vh' }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;
