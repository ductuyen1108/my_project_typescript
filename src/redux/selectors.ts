import { RootState } from './store';

export const filterSelectedCategory = (state: RootState) => state.filters.selectedCategory;
export const filterSelectUser = (state: RootState) => state.filters.user;
export const filtersSelectProducts = (state: RootState) => state.filters.products;
export const filterSelectedProduct = (state: RootState) => state.filters.selectedProduct;
