import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from '../slice/filtersSlice';
import authSlice from '../slice/authSlice';
import cartSlice from '../slice/cartSlice';
import productSlice from '../slice/productSlice';
import signUpSlice from '../slice/signUpSlice';
import userCartSlice from '../slice/userCartSlice';
import todoListSlice from '../slice/todoListSlice';

const store = configureStore({
    reducer: {
        todolist: todoListSlice,
        filters: filtersReducer,
        auth: authSlice,
        cart: cartSlice,
        product: productSlice,
        signup: signUpSlice,
        usercart: userCartSlice,
    },
});

export default store;

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
