import { createSlice, createAction, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
    cartId: number;
}

export interface CartProduct {
    productId: number;
    quantity: number;
}

export interface UpdatedCartItem {
    id: number;
    userId: number;
    date: string;
    products: CartProduct[];
}

interface CartState {
    items: UpdatedCartItem[];
}

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
    const response = await fetch('https://fakestoreapi.com/carts');
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
            products: newCartItem.products,
        }),
    });
    const data = await response.json();
    return data;
});

export const updateCart = createAsyncThunk('cart/updateCart', async (updatedCartItem: UpdatedCartItem) => {
    const response = await fetch(`https://fakestoreapi.com/carts/${updatedCartItem.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
            userId: updatedCartItem.userId,
            date: updatedCartItem.date,
            products: {
                productId: updatedCartItem.products,
                quantity: updatedCartItem.products,
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
            .addCase(fetchCart.fulfilled, (state, action: PayloadAction<UpdatedCartItem[]>) => {
                state.items = action.payload;
            })
            .addCase(clearUserCart, (state) => {
                state.items = [];
            })
            .addCase(addToCart.fulfilled, (state, action: PayloadAction<UpdatedCartItem>) => {
                state.items.push(action.payload);
            })
            .addCase(updateCart.fulfilled, (state, action: PayloadAction<UpdatedCartItem[]>) => {
                state.items = action.payload;
            })
            .addCase(deleteCartItem.fulfilled, (state, action: PayloadAction<{ id: number }>) => {
                if (Array.isArray(state.items)) {
                    const deletedCartId = action.payload.id;
                    state.items = state.items.filter((cartItem) => cartItem.id !== deletedCartId);
                } else {
                    console.error('state.items is not an array');
                }
            });
    },
});

export default cartReducer.reducer;
