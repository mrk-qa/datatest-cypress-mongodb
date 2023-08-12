import './commands'
import 'cypress-plugin-steps'
import '@shelex/cypress-allure-plugin'

const mongo = require('cypress-mongodb')
mongo.addCommands()