const { defineConfig } = require("cypress")
const mongo = require('cypress-mongodb')

module.exports = defineConfig({
  projectId: 'eamhmz',
  env: {
    mongodb: {
      uri: 'mongodb://mrk-qa:admin@localhost:27017/?authMechanism=DEFAULT',
      collection: 'types',
      database: 'pokemon',
    },
  },
  e2e: {
    responseTimeout: 10000,
    video: false,
    screenshotOnRunFailure: false,
    setupNodeEvents(on, config) {
      mongo.configurePlugin(on);
      on('task', {
        log(message) {
          console.log(message)
          return null
        },
      })
    },
  },
})
