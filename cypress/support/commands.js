Cypress.Commands.add('queryOne', (query) => {
    cy.wrap(query).as('queryResult')
})

Cypress.Commands.add('queryMany', (query) => {
    cy.findMany(query).as('queryResult')
})