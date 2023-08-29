describe('TodoList Component', () => {
    beforeEach(() => {
        cy.visit('todolist');
    });

    it('should add a todo', () => {
        const todoText = 'Quét nhà';

        cy.get('input[placeholder="Enter todo"]').type(todoText);
        cy.get('button').contains('Add').click();

        cy.contains(todoText).should('be.visible');
    });

    it('should edit a todo', () => {
        const editedTodoText = 'Quét sân';
        const todoText = 'Quét nhà';

        cy.get('input[placeholder="Enter todo"]').type(todoText);
        cy.get('button').contains('Add').click();

        cy.contains(todoText).should('be.visible');

        cy.get('li').eq(0).contains('Edit').click();
        cy.get('li').eq(0).find('input').should('be.visible').clear().type(editedTodoText);
        cy.get('button').contains('Save').click();

        cy.contains(editedTodoText).should('be.visible');
    });

    it('should delete a todo', () => {
        const todoText = 'Quét nhà';
        const todoIndex = 0;

        cy.get('input[placeholder="Enter todo"]').type(todoText);
        cy.get('button').contains('Add').click();

        cy.contains(todoText).should('be.visible');

        cy.get('li').eq(todoIndex).contains('Delete').click();

        cy.contains(todoText).should('not.exist');
    });
});
