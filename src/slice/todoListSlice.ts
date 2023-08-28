import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
    id: string;
    job: string;
}

interface TodoState {
    todos: Todo[];
}

const initialState: TodoState = {
    todos: [],
};

const todoListReducer = createSlice({
    name: 'todolist',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<Todo>) => {
            state.todos.push(action.payload);
        },
        editTodo: (state, action: PayloadAction<Todo>) => {
            const { id, job } = action.payload;
            const todo = state.todos.find((todo) => todo.id === id);
            if (todo) {
                todo.job = job;
            }
        },
        deleteTodo: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        },
    },
});

export const { addTodo, editTodo, deleteTodo } = todoListReducer.actions;

export default todoListReducer.reducer;
