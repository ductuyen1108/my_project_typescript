import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slice/userSlice';
import filtersReducer from '../slice/filtersSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        filters: filtersReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
