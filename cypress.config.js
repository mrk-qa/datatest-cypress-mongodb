const { defineConfig } = require('cypress')
const allureWriter = require('@shelex/cypress-allure-plugin/writer')
const mongo = require('cypress-mongodb')

module.exports = defineConfig({
  projectId: 'hr8n51',
  e2e: {
    env: {
      mongodb: {
        uri: 'mongodb://mrk-qa:admin@localhost:27017/?authMechanism=DEFAULT',
        collection: 'types',
        database: 'pokemon',
      },
      allure: true,
      allureResultsPath: 'cypress/reports/allure-results',
      allureAttachRequests: true,
      allureAddVideoOnPass: true,
    },
    specPattern: [
      "cypress/e2e/create_*.cy.js",
      "cypress/e2e/delete_*.cy.js",
      "cypress/e2e/query_*.cy.js",
      "cypress/e2e/update_*.cy.js",
      "cypress/e2e/performance_*.cy.js",
      "cypress/e2e/migration_*.cy.js"
    ],
    videosFolder: 'cypress/reports/videos',
    screenshotsFolder: 'cypress/reports/screenshots',
    responseTimeout: 10000,
    setupNodeEvents(on, config) {
      mongo.configurePlugin(on)
      allureWriter(on, config)
      on('task', {
        log(message) {
          console.log(message)
          return null
        },
      })
      return config
    },
  },
})
