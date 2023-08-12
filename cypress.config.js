const { defineConfig } = require("cypress")
const allureWriter = require('@shelex/cypress-allure-plugin/writer')
const mongo = require('cypress-mongodb')

module.exports = defineConfig({
  projectId: 'eamhmz',
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
  e2e: {
    videosFolder: 'cypress/reports/videos',
    screenshotsFolder: 'cypress/reports/screenshots',
    responseTimeout: 10000,
    video: false,
    screenshotOnRunFailure: false,
    setupNodeEvents(on, config) {
      mongo.configurePlugin(on);
      allureWriter(on, config);
      on('task', {
        log(message) {
          console.log(message)
          return null
        },
      })
    },
  },
})
