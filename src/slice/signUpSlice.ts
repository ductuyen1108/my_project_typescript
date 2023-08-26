import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface NewUser {
    id?: number | null;
    email: string | null;
    username: string | null;
    password: string | null;
    name: {
        firstname: string | null;
        lastname: string | null;
    };
    address: {
        city: string | null;
        street: string | null;
        number: number | null;
        zipcode: string | null;
        geolocation: {
            lat: string | null;
            long: string | null;
        };
    };
    phone: string | null;
}

interface UserState {
    items: NewUser[];
}

const initialState: UserState = {
    items: [],
};

export const signUpUser = createAsyncThunk('signup/SignupUser', async (userInfo: NewUser) => {
    const response = await fetch('https://fakestoreapi.com/users', {
        method: 'POST',
        body: JSON.stringify({
            email: userInfo.email,
            username: userInfo.username,
            password: userInfo.password,
            name: {
                firstname: userInfo.name.firstname,
                lastname: userInfo.name.lastname,
            },
            address: {
                city: userInfo.address.city,
                street: userInfo.address.street,
                number: userInfo.address.number,
                zipcode: userInfo.address.zipcode,
                geolocation: {
                    lat: userInfo.address.geolocation.lat,
                    long: userInfo.address.geolocation.long,
                },
            },
            phone: userInfo.phone,
        }),
    });
    const data = await response.json();
    console.log('data', data);
    return data;
});

export const fetchInitialUsers = createAsyncThunk('signup/FetchInitialUsers', async () => {
    const response = await fetch('https://fakestoreapi.com/users');
    const data = await response.json();
    return data;
});

const signupReducer = createSlice({
    name: 'signup',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signUpUser.fulfilled, (state, action) => {
            state.items.push(action.payload);
        });
        builder.addCase(fetchInitialUsers.fulfilled, (state, action) => {
            state.items = action.payload;
        });
    },
});

export default signupReducer.reducer;
