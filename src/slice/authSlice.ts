import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface AuthState {
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    token: null,
    loading: true,
    error: null,
};

export const loginUser = createAsyncThunk('auth/login', async (credentials: { username: string; password: string }) => {
    const request = await axios.post('https://fakestoreapi.com/auth/login', credentials);
    const response = await request.data;
    return response.token;
});

export const logoutUser = createAction('auth/Logout');

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.token = null;
            state.error = null;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.token = action.payload;
            state.error = null;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.token = null;
            if (typeof action.error.message === 'string') {
                if (action.error.message === 'Request failed with status code 401') {
                    state.error = 'Login failed, check your account or password!';
                } else {
                    state.error = action.error.message;
                }
            } else {
                state.error = null;
            }
        });
        builder.addCase(logoutUser, (state) => {
            state.token = null;
        });
    },
});

export default authSlice.reducer;
