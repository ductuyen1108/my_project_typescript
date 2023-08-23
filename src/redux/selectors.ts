import { RootState } from './store';

// Filters
export const filterSelectedCategory = (state: RootState) => state.filters.selectedCategory;
export const filterSelectUser = (state: RootState) => state.filters.user;
export const filtersSelectProducts = (state: RootState) => state.filters.products;
export const filterSelectedProduct = (state: RootState) => state.filters.selectedProduct;

// Authentication
export const selectToken = (state: RootState) => state.auth.token;
export const loadingLogin = (state: RootState) => state.auth.loading;
export const errorLogin = (state: RootState) => state.auth.error;
