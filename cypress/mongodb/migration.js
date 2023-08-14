const { MongoClient } = require('mongodb')

const sourceUri = 'mongodb://mrk-qa:admin@localhost:27017/?authMechanism=DEFAULT'
const destUri = 'mongodb://mrk-qa:admin@localhost:27017/?authMechanism=DEFAULT'

async function migrateData() {
  const sourceClient = new MongoClient(sourceUri, { useUnifiedTopology: true })
  const destClient = new MongoClient(destUri, { useUnifiedTopology: true })

  try {
    await sourceClient.connect()
    await destClient.connect()

    const sourceDB = sourceClient.db('pokemon')
    const destDB = destClient.db('local')

    const sourceCollection = sourceDB.collection('types')
    const destCollection = destDB.collection('backup-pokemon-types')

    const documentsToMigrate = await sourceCollection.find().toArray()

    if (documentsToMigrate.length > 0) {
      await destCollection.insertMany(documentsToMigrate)

      console.log(`Migrou ${documentsToMigrate.length} documentos da coleção '${sourceCollection.collectionName}' no banco de dados '${sourceDB.databaseName}' para a coleção '${destCollection.collectionName}' no banco de dados '${destDB.databaseName}'.`)
    } else {
      console.log('Nenhum documento para migrar.')
    }
  } finally {
    await sourceClient.close()
    await destClient.close()
  }
}

migrateData()
