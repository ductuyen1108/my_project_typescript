describe('Login page', () => {
    beforeEach(() => {
        cy.visit('/login');
    });
    it('should display login form elements', () => {
        cy.get('input[placeholder="username"]').should('exist');
        cy.get('input[placeholder="password"]').should('exist');
        cy.get('button[type="submit"]').should('exist');
    });
    it('should allow user to log in with valid credentials', () => {
        const validUsername = 'johnd';
        const validPassword = 'm38rmF$';

        cy.get('input[placeholder="username"]').type(validUsername);
        cy.get('input[placeholder="password"]').type(validPassword);
        cy.get('button[type="submit"]').click();

        cy.url().should('eq', 'http://localhost:3000/');
    });

    it('should show error message for invalid credentials', () => {
        const invalidUsername = 'invalidUsername';
        const invalidPassword = 'invalidPassword';

        cy.get('input[placeholder="username"]').type(invalidUsername);
        cy.get('input[placeholder="password"]').type(invalidPassword);
        cy.get('button[type="submit"]').click();

        // Check for error message
        cy.contains('Invalid username or password!').should('be.visible');
    });
});
