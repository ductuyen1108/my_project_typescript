import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface UserCart {
    id?: number;
    userId: number;
    date: string;
    products: {
        productId: number;
        quantity: number;
    };
}

interface UserCartState {
    items: UserCart[];
}

const initialState: UserCartState = {
    items: [],
};

export const fetchUserCart = createAsyncThunk('cart/fetchUserCart', async (userId: number) => {
    const response = await fetch(`https://fakestoreapi.com/carts/user/${userId}`);
    const data = await response.json();
    return data;
});

const userCartSlice = createSlice({
    name: 'usercart',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUserCart.fulfilled, (state, action) => {
            state.items = action.payload;
        });
    },
});

export default userCartSlice.reducer;
