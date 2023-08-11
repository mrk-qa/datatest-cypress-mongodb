require('dotenv').config()
const collection = process.env.MONGO_COLLECTION
const database = process.env.MONGO_DB

Cypress.Commands.add('queryOne', (query, options) => {
    options = options || { collection: collection, database: database}
    cy.wrap(query, options)
})

Cypress.Commands.add('queryMany', (query, options) => {
    options = options || { collection: collection, database: database}
    cy.findMany(query, options)
})