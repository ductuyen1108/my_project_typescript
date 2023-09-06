describe('Login page', () => {
    beforeEach(() => {
        cy.fixture('urls').then((urls) => {
            cy.visit(urls.login);
        });
    });

    it('Show Login interface.', () => {
        cy.get('input[placeholder="username"]').should('exist');
        cy.get('input[placeholder="password"]').should('exist');
        cy.get('button[type="submit"]').should('exist');
    });

    const login = (username, password) => {
        cy.get('input[placeholder="username"]').type(username);
        cy.get('input[placeholder="password"]').type(password);
        cy.get('button[type="submit"]').click();
    };

    it('User login with valid username and password information.', () => {
        login('johnd', 'm38rmF$');

        cy.fixture('urls').then((urls) => {
            cy.visit(urls.home);
        });
    });

    it('User login with invalid username and password information.', () => {
        try {
            login('invalidUsername', 'invalidPassword');
        } catch (error) {
            // Get the error message from the `login()` function
            const errorMessage = error.message;

            // Check for the error message
            cy.contains(errorMessage).should('be.visible');
        }
    });
});
