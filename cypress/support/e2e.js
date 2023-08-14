import './commands'
import '@shelex/cypress-allure-plugin'

const mongo = require('cypress-mongodb')
mongo.addCommands()