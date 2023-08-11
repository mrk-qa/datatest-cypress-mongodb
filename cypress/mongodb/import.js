const fs = require('fs')
const MongoClient = require('mongodb').MongoClient
const csv = require('csv-parser')
require('dotenv').config()

const uri = process.env.MONGO_URI
const dbName = process.env.MONGO_DB
const collectionName = process.env.MONGO_COLLECTION

const filePath = 'cypress/fixtures/pokemon.csv'

async function importCSVToMongoDB() {
  try {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    await client.connect()

    console.log('Conectado ao MongoDB')

    const db = client.db(dbName)
    const collection = db.collection(collectionName)

    const stream = fs.createReadStream(filePath)
      .pipe(csv())

    const documents = []

    stream.on('data', (data) => {
      documents.push(data)
    })

    stream.on('end', async () => {
      const result = await collection.insertMany(documents)
      console.log(`${result.insertedCount} documentos foram inseridos na coleção ${collectionName}`)

      client.close()
    })
  } catch (error) {
    console.error('Ocorreu um erro:', error)
  }
}

importCSVToMongoDB()
