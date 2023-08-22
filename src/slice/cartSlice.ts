import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';

interface CartItem {
    productId: number;
    quantity: number;
}

interface CartState {
    items: CartItem[];
}

const userToken = localStorage.getItem('userToken');
const decodedToken: any = userToken ? jwt_decode(userToken) : '';
const userId: number = decodedToken.sub;

export const fetchUserCart = createAsyncThunk('cart/fetchUserCart', async (userId: number) => {
    const response = await fetch(`https://fakestoreapi.com/carts/user/${userId}`);
    const data = await response.json();
    return data;
});

export const clearUserCart = createAction('cart/clearUserCart');

export const addToCart = createAsyncThunk('cart/addToCart', async (payload: CartItem, thunkAPI) => {
    const { productId, quantity } = payload;
    const state = thunkAPI.getState() as { cart: CartState };
    const existingItem = state.cart.items.find((item) => item.productId === productId);

    if (existingItem) {
        const updatedQuantity = existingItem.quantity + quantity;

        const response = await fetch(`https://fakestoreapi.com/carts/${existingItem.productId}`, {
            method: 'PUT',
            body: JSON.stringify({
                userId: userId,
                date: new Date().toISOString(),
                products: [
                    {
                        productId: existingItem.productId,
                        quantity: updatedQuantity,
                    },
                ],
            }),
        });

        const data = await response.json();
        return data;
    } else {
        const response = await fetch('https://fakestoreapi.com/carts', {
            method: 'POST',
            body: JSON.stringify({
                userId: userId,
                date: new Date().toISOString(),
                products: [
                    {
                        productId: payload.productId,
                        quantity: payload.quantity,
                    },
                ],
            }),
        });
        const data = await response.json();
        return data;
    }
});

export const updateCartItem = createAsyncThunk('cart/update', async (payload: CartItem) => {
    const response = await fetch(`https://fakestoreapi.com/carts/${payload.productId}`, {
        method: 'PUT',
        body: JSON.stringify({
            userId: userId,
            date: new Date().toISOString(),
            products: [
                {
                    productId: payload.productId,
                    quantity: payload.quantity,
                },
            ],
        }),
    });
    const data = await response.json();
    return data;
});

export const deleteCartItem = createAsyncThunk('cart/delete', async (payload: CartItem) => {
    const respone = await fetch(`https://fakestoreapi.com/carts/${payload.productId}`, {
        method: 'DELETE',
    });
    const data = await respone.json();
    return data;
});

const initialState: CartState = {
    items: [],
};

const cartReducer = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserCart.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(clearUserCart, (state) => {
                state.items = [];
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateCartItem.fulfilled, (state, action) => {
                const { productId, quantity } = action.payload;
                const existingItem = state.items.find((item) => item.productId === productId);
                if (existingItem) {
                    existingItem.quantity = quantity;
                }
            })
            .addCase(deleteCartItem.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item.productId !== action.payload.productId);
            });
    },
});

export default cartReducer.reducer;
