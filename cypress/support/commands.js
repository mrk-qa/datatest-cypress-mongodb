Cypress.Commands.add('queryOne', (query) => {
    cy.wrap(query).as('queryResult')
})