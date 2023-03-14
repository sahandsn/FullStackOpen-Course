// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', ({ username, password }) => {
  cy.contains('username').find('input').type(username)
  cy.contains('password').find('input').type(password)
  cy.get('button').click()
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.contains('New Blog').click()
  cy.contains('title').find('input').type(title)
  cy.contains('author').find('input').type(author)
  cy.contains('url').find('input').type(url)
  cy.get('form').contains('Create').click()
})
