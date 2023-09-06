describe('ProductList Component', () => {
    beforeEach(() => {
        cy.intercept('GET', 'https://fakestoreapi.com/products', { fixture: 'products.json' }).as('getAllProducts');

        cy.visit('/dashboard/productlist');

        cy.wait('@getAllProducts');
    });

    it('should display the list of products', () => {
        cy.fixture('products.json').then((products) => {
            products.forEach((product) => {
                cy.contains(product.title).should('be.visible');
                cy.contains(product.category).should('be.visible');
                cy.contains(`$ ${product.price}`).should('be.visible');
            });
        });
    });

    it('should delete a product when Delete button is clicked', () => {
        cy.fixture('products.json').then((products) => {
            products.forEach((product) => {
                cy.get('button.show-dialog')
                    .eq(product.id - 1)
                    .click();

                cy.get('div.dialog').should('be.visible');

                cy.get('div.dialog').find('button').contains('Delete').click({ force: true });

                cy.contains('Delete product successfully').should('be.visible');

                cy.get('.MuiDialog-container').should('not.exist');
            });

            cy.get('.MuiButton-root svg.MuiSvgIcon-root.DeleteIcon').should('have.length', 0);
        });
    });
});
