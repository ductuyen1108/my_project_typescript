import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from '../slice/filtersSlice';
import authSlice from '../slice/authSlice';
import cartSlice, { fetchCart } from '../slice/cartSlice';
import productSlice, { fetchInitialProduct } from '../slice/productSlice';
import signUpSlice, { fetchInitialUsers } from '../slice/signUpSlice';
import userCartSlice from '../slice/userCartSlice';

const store = configureStore({
    reducer: {
        filters: filtersReducer,
        auth: authSlice,
        cart: cartSlice,
        product: productSlice,
        signup: signUpSlice,
        usercart: userCartSlice,
    },
});

store.dispatch(fetchInitialUsers());
store.dispatch(fetchInitialProduct());
store.dispatch(fetchCart());

export default store;

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
