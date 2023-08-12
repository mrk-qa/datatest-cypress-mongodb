const fs = require('fs')
const MongoClient = require('mongodb').MongoClient
const csv = require('csv-parser')
require('dotenv').config({path: '.env'})

const uri = process.env.MONGO_URI
const dbName = 'pokemon'
const collectionName = 'types'

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

      console.log('------------------------------------------------------------------------------------')
      const query = { name: 'Seaking' }
      console.log('Realizando consulta de teste ao MongoDB com a query:', query)
      const resultQuery = await collection.findOne(query)
      console.log('Resultado da consulta:', resultQuery)

      client.close()
    })
  } catch (error) {
    console.error('Ocorreu um erro:', error)
  }
}

importCSVToMongoDB()
