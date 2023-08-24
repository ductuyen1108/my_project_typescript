import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface ProductItem {
    productId: number;
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
    rating?: {
        rate: number;
        count: number;
    };
}

interface ProductState {
    items: ProductItem[];
}

export const addNewProduct = createAsyncThunk('product/AddNewProduct', async (newProductItem: ProductItem) => {
    const response = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        body: JSON.stringify({
            title: newProductItem.title,
            price: newProductItem.price,
            description: newProductItem.description,
            image: newProductItem.image,
            category: newProductItem.category,
        }),
    });
    const data = await response.json();
    return data;
});

export const updateProduct = createAsyncThunk('product/updateProduct', async (updateProductItem: ProductItem) => {
    const respone = await fetch(`https://fakestoreapi.com/products/${updateProductItem.productId}`, {
        method: 'PUT',
        body: JSON.stringify({
            title: updateProductItem.title,
            price: updateProductItem.price,
            description: updateProductItem.description,
            image: updateProductItem.image,
            category: updateProductItem.category,
        }),
    });
    const data = await respone.json();
    return data;
});

export const daleteProductItem = createAsyncThunk('product/deleteProductItem', async (productId: number) => {
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`, {
        method: 'DELETE',
    });
    const data = await response.json();
    return data;
});

const initialState: ProductState = {
    items: [],
};

const productReducer = createSlice({
    name: 'product',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addNewProduct.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(daleteProductItem.fulfilled, (state, action) => {
                if (Array.isArray(state.items)) {
                    const deletedProductId = action.payload.productId;
                    state.items = state.items.filter((productItem) => productItem.productId !== deletedProductId);
                } else {
                    console.error('state.items is not an array');
                }
            });
    },
});

export default productReducer.reducer;
