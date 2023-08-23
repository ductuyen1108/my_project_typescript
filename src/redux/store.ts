import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from '../slice/filtersSlice';
import authSlice from '../slice/authSlice';
import cartSlice from '../slice/cartSlice';

const store = configureStore({
    reducer: {
        filters: filtersReducer,
        auth: authSlice,
        cart: cartSlice,
    },
});

export default store;

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
