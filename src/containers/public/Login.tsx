import { useState } from 'react';
import React from 'react';
import { Avatar, Box, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from '@mui/material';
import { Lock } from '@mui/icons-material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../../apis/auth.api';
import { Auth } from '../../types/auth.type';
import jwtDecode from 'jwt-decode';

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const history = useNavigate();

    const queryClient = useQueryClient();

    const loginMutation = useMutation((credentials: Auth) => login(credentials.username, credentials.password), {
        onSuccess: (data) => {
            localStorage.setItem('token', data);
            queryClient.invalidateQueries(['userData']);
            const decodeToken = jwtDecode(data);
            console.log(decodeToken);
        },
    });

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const credentials = {
            username,
            password,
        };
        loginMutation.mutate(credentials);
        history('/');
    };

    const paperStyle = { padding: 20, height: '70vh', width: 400, margin: '20px auto' };
    return (
        <Box sx={{ py: '40px' }}>
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <form onSubmit={handleLogin}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Avatar sx={{ backgroundColor: 'green', display: 'flex', alignItems: 'center' }}>
                                <Lock />
                            </Avatar>
                            <Typography sx={{ fontSize: '25px', fontWeight: '400' }}>Log in</Typography>
                        </Box>
                        <Box sx={{ marginBottom: '15px' }}>
                            <TextField
                                label="Username"
                                variant="standard"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                fullWidth
                                required
                                sx={{ marginBottom: '25px' }}
                            />
                            <TextField
                                label="Password"
                                variant="standard"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                fullWidth
                                required
                            />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingBottom: '20px',
                            }}
                        >
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />
                        </Box>
                        <Button variant="contained" fullWidth type="submit">
                            Log in
                        </Button>
                        <Grid container py={'15px'}>
                            <Grid item xs>
                                <NavLink to="#" color="blue">
                                    Forgot password?
                                </NavLink>
                            </Grid>
                            <Grid item>
                                <NavLink to="/signup">
                                    <Typography color="blue">Don't have an account? Sign Up</Typography>
                                </NavLink>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Grid>
        </Box>
    );
};

export default Login;
