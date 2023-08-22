import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserCredentials {
    usernam: string;
    password: string;
}

interface UserState {
    loading: boolean;
    user: { token: string } | null;
    error: string | null;
}

export const loginUser = createAsyncThunk('user/loginUser', async (userCredentials: UserCredentials) => {
    const request = await axios.post('https://fakestoreapi.com/auth/login', userCredentials);
    const resqonse = await request.data;
    localStorage.setItem('userToken', resqonse.token);
    return resqonse;
});

export const userLogOut = createAsyncThunk('user/userLogOut', async () => {
    localStorage.removeItem('userToken');
    return null;
});

const userReducer = createSlice({
    name: 'user',
    initialState: {
        loading: true,
        user: null,
        error: null,
    } as UserState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.user = null;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ token: string }>) => {
                state.loading = false;
                state.user = {
                    token: action.payload.token,
                };
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                if (typeof action.error.message === 'string') {
                    if (action.error.message === 'Request failed with status code 401') {
                        state.error = 'Access denied! Invalid Credentials';
                    } else {
                        state.error = action.error.message;
                    }
                } else {
                    state.error = null;
                }
            })
            .addCase(userLogOut.fulfilled, (state) => {
                state.user = null;
            });
    },
});

export default userReducer.reducer;
