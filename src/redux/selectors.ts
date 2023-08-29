import { RootState } from './store';

// Filters
export const filterSelectedCategory = (state: RootState) => state.filters.selectedCategory;
export const filterSelectUser = (state: RootState) => state.filters.user;
export const filtersSelectProducts = (state: RootState) => state.filters.products;
export const filterSelectedProduct = (state: RootState) => state.filters.selectedProduct;

// Todo List
export const todoListSelector = (state: RootState) => state.todolist.todos;
