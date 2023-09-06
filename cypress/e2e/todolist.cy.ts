describe('TodoList Component', () => {
    const todoItems = ['Todo 1', 'Todo 2', 'Todo 3'];

    beforeEach(() => {
        cy.visit('todolist');
        todoItems.forEach((todoText) => {
            cy.get('input[placeholder="Enter todo"]').type(todoText);
            cy.get('button').contains('Add').click();
        });
    });

    it('Add to do.', () => {
        todoItems.forEach((todoText) => {
            cy.contains(todoText).should('be.visible');
        });
    });

    it('Edit to do.', () => {
        const editedTodoText = 'Edited Todo';
        const todoIndex = 0;

        cy.get('li').eq(todoIndex).contains('Edit').click();
        cy.get('li').eq(todoIndex).find('input').should('be.visible').clear().type(editedTodoText);
        cy.get('button').contains('Save').click();

        cy.contains(editedTodoText).should('be.visible');
    });

    it('Delete to do.', () => {
        const todoIndex = 0;

        cy.get('li').eq(todoIndex).contains('Delete').click();

        cy.contains(todoItems[todoIndex]).should('not.exist');
    });
});
