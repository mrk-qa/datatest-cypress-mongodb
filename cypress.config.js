const { defineConfig } = require('cypress')
const allureWriter = require('@shelex/cypress-allure-plugin/writer')
const mongo = require('cypress-mongodb')
const { uri, dbName, collectionName } = require('./cypress/mongodb/import.js')

module.exports = defineConfig({
  projectId: 'eamhmz',
  e2e: {
    env: {
      mongodb: {
        uri: uri,
        collection: dbName,
        database: collectionName,
      },
      allure: true,
      allureResultsPath: 'cypress/reports/allure-results',
      allureAttachRequests: true,
      allureAddVideoOnPass: true,
    },
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
