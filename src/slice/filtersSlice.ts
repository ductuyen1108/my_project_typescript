import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
    selectedCategory: string | null;
    user: any | null;
    products: any[];
    selectedProduct: any | null;
}

const initialState: FilterState = {
    selectedCategory: null,
    user: null,
    products: [],
    selectedProduct: null,
};

const filterReducer = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategory: (state, action: PayloadAction<string | null>) => {
            state.selectedCategory = action.payload;
        },
        clearCategory: (state) => {
            state.selectedCategory = null;
        },
        setUser: (state, action: PayloadAction<any | null>) => {
            state.user = action.payload;
        },
        setProducts: (state, action: PayloadAction<any[]>) => {
            state.products = action.payload;
        },
        setSelectedProduct: (state, action: PayloadAction<any | null>) => {
            state.selectedProduct = action.payload;
        },
    },
});

export const { setCategory, clearCategory, setUser, setProducts, setSelectedProduct } = filterReducer.actions;

export default filterReducer.reducer;
