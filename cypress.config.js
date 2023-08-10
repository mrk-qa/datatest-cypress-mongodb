const { defineConfig } = require("cypress");
const mongo = require('cypress-mongodb');
require('dotenv').config()

module.exports = defineConfig({
  env: {
    mongodb: {
      uri: process.env.MONGO_URI,
      collection: process.env.MONGO_COLLECTION,
      database: process.env.MONGO_DB,
    },
  },
  e2e: {
    responseTimeout: 10000,
    video: false,
    screenshotOnRunFailure: false,
    setupNodeEvents(on, config) {
      mongo.configurePlugin(on);
    },
  },
})
