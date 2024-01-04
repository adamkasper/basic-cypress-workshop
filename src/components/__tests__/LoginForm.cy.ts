import '../../tailwind.css'
import LoginForm from '../LoginForm.vue'

describe('LoginForm', () => {
  beforeEach(() => {
    cy.mount(LoginForm)
  })

  context('when form is submitted', () => {
    beforeEach(() => {
      cy.dataCy('login-form-submit-button').click()
    })

    it('displays error when email is empty', () => {
      cy.dataCy('login-form-email-error-message').should('contain', 'email is a required field')
    })

    it('displays error when password is empty', () => {
      cy.dataCy('login-form-email-field').type('test@example.com')
      cy.dataCy('login-form-password-error-message').should('contain', 'password is a required field')
    })
  })

  context('when email is provided', () => {
    beforeEach(() => {
      cy.dataCy('login-form-email-field').type('invalid email')
      cy.dataCy('login-form-submit-button').click()
    })

    it('displays error when email is not valid', () => {
      cy.dataCy('login-form-email-error-message').should('contain', 'email must be a valid email')
    })

    context('when password is provided', () => {
      beforeEach(() => {
        cy.dataCy('login-form-password-field').type('123')
      })

      it('displays error when password is too short', () => {
        cy.dataCy('login-form-password-error-message').should('contain', 'password must be at least 6 characters')
      })
    })
  })

  context('when form is successfully submitted', () => {
    it('displays success message', () => {
      cy.dataCy('login-form-email-field').type('test@example.com')
      cy.dataCy('login-form-password-field').type('1237689344')
      cy.dataCy('login-form-submit-button').click()
      cy.dataCy('login-form-success-alert').should('be.visible')
    })
  })
})
