import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { Box, CircularProgress, Grid, Paper, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectToken } from '../../redux/selectors';

interface UserData {
    name: {
        firstname: string;
        lastname: string;
    };
    email: string;
    phone: string;
    address: {
        city: string;
        street: string;
        number: string;
        zipcode: string;
    };
}

interface DecodeUser {
    sub: number;
    user: string;
}

const User: React.FC = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const userToken = useSelector(selectToken);

    useEffect(() => {
        let decodedUser: DecodeUser | undefined;
        if (userToken) {
            decodedUser = jwt_decode<DecodeUser>(userToken);
            const userId = decodedUser.sub;
            fetch(`https://fakestoreapi.com/users/${userId}`)
                .then((res) => res.json())
                .then((data: UserData) => {
                    setUserData(data);
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [userToken]);

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
            {userData ? (
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
                                    {userData.name.firstname}
                                </Typography>
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontSize: '30px',
                                        textTransform: 'capitalize',
                                    }}
                                >
                                    {userData.name.lastname}
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
                                            {userData.email}
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
                                            {userData.phone}
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
                                            }}
                                        >
                                            {userData.address.city}
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
                                            {userData.address.street}
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
                                            {userData.address.number}
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
                                            {userData.address.zipcode}
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
