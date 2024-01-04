describe('Login user and redirect to portfolio', () => {
  context('invalid', () => {
    it('should fetch the correct data', () => {
      cy.visit('/');

      cy.dataCy('login-form-email-field').type('test@test.cz');
      cy.dataCy('login-form-submit-button').click();

      cy.dataCy('login-form-success-alert').should('not.exist')
    });
  })

  context('correct login', () => {
    it('login', () => {
      cy.visit('/');

      cy.dataCy('login-form-email-field').type('test@test.cz');
      cy.dataCy('login-form-password-field').type('password123.');
      cy.dataCy('login-form-submit-button').click();

      cy.intercept('GET', 'https://jsonplaceholder.typicode.com/todos/1', {
        body: { userId: 1 },
      });

      cy.dataCy('login-form-success-alert').should('be.visible')
    });
  })
});
