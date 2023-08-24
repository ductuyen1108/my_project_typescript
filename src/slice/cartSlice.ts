import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';

export interface CartItem {
    cartId: number;
}

export interface UpdatedCartItem {
    cartId: number;
    userId: number;
    date: string;
    products: {
        productId: number;
        quantity: number;
    };
}

interface CartState {
    items: CartItem[];
}

export const fetchUserCart = createAsyncThunk('cart/fetchUserCart', async (userId: number) => {
    const response = await fetch(`https://fakestoreapi.com/carts/user/${userId}`);
    const data = await response.json();
    return data;
});

export const fetchCart = createAsyncThunk('cart/fetchCart', async (cartId: number) => {
    const response = await fetch(`https://fakestoreapi.com/carts/${cartId}`);
    const data = await response.json();
    return data;
});

export const clearUserCart = createAction('cart/clearUserCart');

export const addToCart = createAsyncThunk('cart/addToCart', async (newCartItem: UpdatedCartItem) => {
    const response = await fetch('https://fakestoreapi.com/carts', {
        method: 'POST',
        body: JSON.stringify({
            userId: newCartItem.userId,
            date: newCartItem.date,
            products: {
                productId: newCartItem.products.productId,
                quantity: newCartItem.products.quantity,
            },
        }),
    });
    const data = await response.json();
    return data;
});

export const updateCart = createAsyncThunk('cart/updateCart', async (updatedCartItem: UpdatedCartItem) => {
    const response = await fetch(`https://fakestoreapi.com/carts/${updatedCartItem.cartId}`, {
        method: 'PATCH',
        body: JSON.stringify({
            userId: updatedCartItem.userId,
            date: updatedCartItem.date,
            products: {
                productId: updatedCartItem.products.productId,
                quantity: updatedCartItem.products.quantity,
            },
        }),
    });
    const data = await response.json();
    return data;
});

export const deleteCartItem = createAsyncThunk('cart/delete', async (payload: CartItem) => {
    const response = await fetch(`https://fakestoreapi.com/carts/${payload.cartId}`, {
        method: 'DELETE',
    });
    const data = await response.json();
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
                state.items = action.payload;
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(deleteCartItem.fulfilled, (state, action) => {
                if (Array.isArray(state.items)) {
                    const deletedCartId = action.payload.id;
                    state.items = state.items.filter((cartItem) => cartItem.cartId !== deletedCartId);
                } else {
                    console.error('state.items is not an array');
                }
            });
    },
});

export default cartReducer.reducer;
