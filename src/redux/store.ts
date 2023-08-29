import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from '../slice/filtersSlice';
import todoListSlice from '../slice/todoListSlice';

const store = configureStore({
    reducer: {
        todolist: todoListSlice,
        filters: filtersReducer,
    },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
