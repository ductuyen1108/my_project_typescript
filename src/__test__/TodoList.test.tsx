/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoList from '../containers/public/TodoList';

describe('TodoList', () => {
    it('should match snapshot', () => {
        const { asFragment } = render(<TodoList />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('should add a todo when clicking the Add button', () => {
        const { getByLabelText, getByText } = render(<TodoList />);
        const input = getByLabelText('Enter todo');
        const addButton = getByText('Add');

        fireEvent.change(input, { target: { value: 'New todo' } });
        fireEvent.click(addButton);

        const todoItem = getByText('New todo');
        expect(todoItem).toBeInTheDocument();
    });

    it('should edit a todo', () => {
        const { getByText, getByLabelText } = render(<TodoList />);
        const editButton = getByText('Edit');
        fireEvent.click(editButton);

        const editInput = getByLabelText('Enter todo');
        fireEvent.change(editInput, { target: { value: 'Edited todo' } });

        const saveButton = getByText('Save');
        fireEvent.click(saveButton);

        const editedTodo = getByText('Edited todo');
        expect(editedTodo).toBeInTheDocument();
    });

    it('should delete a todo', () => {
        const { getByText } = render(<TodoList />);
        const deleteButton = getByText('Delete');
        fireEvent.click(deleteButton);

        expect(deleteButton).not.toBeInTheDocument();
    });
});
