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

// Sign up
export const selectFormattedUsers = (state: RootState) => state.signup.items;

// Product
export const selectProducts = (state: RootState) => state.product.items;

// Cart
export const selectCarts = (state: RootState) => state.cart.items;

// User Cart
export const selectUserCart = (state: RootState) => state.usercart.items;
