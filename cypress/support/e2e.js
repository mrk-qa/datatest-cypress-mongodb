import './commands'
import 'cypress-plugin-steps'

const mongo = require('cypress-mongodb')
mongo.addCommands()