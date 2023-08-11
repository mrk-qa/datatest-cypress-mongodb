Cypress.Commands.add('queryOne', (query) => {
    cy.wrap(query)
})

Cypress.Commands.add('queryMany', (query) => {
    cy.findMany(query)
})