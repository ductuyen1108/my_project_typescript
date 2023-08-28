import React from 'react';
import { Box, CircularProgress, Grid, Paper, Typography } from '@mui/material';
import { getUserById, getUserLoggedIn } from '../../apis/users.api';
import { useQuery } from '@tanstack/react-query';

const User: React.FC = () => {
    const loggedInfo = getUserLoggedIn();
    const userId = loggedInfo?.userId;

    const { data: user } = useQuery(['userData', userId], () => getUserById(userId || 0));

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                alignItems: 'center',
                py: '35px',
            }}
        >
            {user ? (
                <Paper
                    sx={{
                        display: 'flex',
                    }}
                >
                    <Box
                        sx={{
                            backgroundImage: 'linear-gradient(to right, #ec407a, #ffc107)',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                py: '20px',
                            }}
                        >
                            <Box
                                sx={{
                                    width: '300px',
                                    height: '300px',
                                }}
                            >
                                <img src="https://i.imgur.com/6tF0Tik.png" alt="" className="w-[300px]" />
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: '3',
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontSize: '30px',
                                        textTransform: 'capitalize',
                                        pr: '10px',
                                    }}
                                >
                                    {user.data.name.firstname}
                                </Typography>
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontSize: '30px',
                                        textTransform: 'capitalize',
                                    }}
                                >
                                    {user.data.name.lastname}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box>
                        <Box
                            sx={{
                                px: '30px',
                                py: '20px',
                            }}
                        >
                            <Box>
                                <Typography
                                    sx={{
                                        fontSize: '32px',
                                    }}
                                >
                                    Information
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap: '30px',
                                        py: '30px',
                                        borderTop: '1px solid #e0e0e0',
                                    }}
                                >
                                    <Box>
                                        <Typography
                                            sx={{
                                                fontSize: '25px',
                                                fontWeight: '500',
                                            }}
                                        >
                                            Email
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: 'gray',
                                                fontSize: '20px',
                                                fontWeight: '400',
                                            }}
                                        >
                                            {user.data.email}
                                        </Typography>
                                    </Box>
                                    <Box className="">
                                        <Typography
                                            sx={{
                                                fontSize: '25px',
                                                fontWeight: '500',
                                            }}
                                        >
                                            Phone
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: 'gray',
                                                fontSize: '20px',
                                                fontWeight: '400',
                                            }}
                                        >
                                            {user.data.phone}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box className="">
                                <Typography
                                    sx={{
                                        fontSize: '32px',
                                    }}
                                >
                                    Address
                                </Typography>
                                <Grid
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(2, 1fr)',
                                        gap: 8,
                                        paddingTop: '30px',
                                        borderTop: '1px solid #e0e0e0',
                                    }}
                                >
                                    <Box className="">
                                        <Typography
                                            sx={{
                                                fontSize: '25px',
                                                fontWeight: '500',
                                            }}
                                        >
                                            City
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: 'gray',
                                                fontSize: '20px',
                                                fontWeight: '400',
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            {user.data.address.city}
                                        </Typography>
                                    </Box>
                                    <Box className="">
                                        <Typography
                                            sx={{
                                                fontSize: '25px',
                                                fontWeight: '500',
                                            }}
                                        >
                                            Street
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: 'gray',
                                                fontSize: '20px',
                                                fontWeight: '400',
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            {user.data.address.street}
                                        </Typography>
                                    </Box>
                                    <Box className="">
                                        <Typography
                                            sx={{
                                                fontSize: '25px',
                                                fontWeight: '500',
                                            }}
                                        >
                                            Number
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: 'gray',
                                                fontSize: '20px',
                                                fontWeight: '400',
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            {user.data.address.number}
                                        </Typography>
                                    </Box>
                                    <Box className="">
                                        <Typography
                                            sx={{
                                                fontSize: '25px',
                                                fontWeight: '500',
                                            }}
                                        >
                                            Zipcode
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: 'gray',
                                                fontSize: '20px',
                                                fontWeight: '400',
                                            }}
                                        >
                                            {user.data.address.zipcode}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            ) : (
                <CircularProgress />
            )}
        </Box>
    );
};

export default User;
