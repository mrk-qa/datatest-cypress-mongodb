const { fakerPT_BR: faker } = require('@faker-js/faker')

const name = faker.internet.userName().toLowerCase()
const email = faker.internet.email().toLowerCase()

describe('Criando dados ao DB', () => {

  it('[create] cria uma collection', () => {
    cy.createCollection(name, { database: 'test' }).then(res => {
      const data = JSON.stringify(res)
      cy.task('log', data)
    })

    cy.dropCollection(name, { database: 'test' }).then(res => {
      const data = JSON.stringify(res)
      cy.task('log', data)
    })
  })

  it('[create] inserir um dado do tipo email', () => {
    cy.insertOne({ email: email }, { collection: 'temproles', database: 'admin' }).then(res => {
      cy.task('log', `Dado inserido com sucesso! ObjectId('${res}') `)
    })

    cy.findOne({ email: email }, { collection: 'temproles', database: 'admin' }).then(res => {
      const data = JSON.stringify(res)
      cy.task('log', data)

      expect(res.email).to.contain(email)
    })
  })

  it('[create] inserir muitos dados em conjunto', () => {
    cy.insertMany([{ nome: name, endereco: { logradouro: 'Rua Fradique Coutinho, 987', bairro: 'Jardim Eliza Maria', cidade: 'São Paulo', estado: 'SP', cep: '02874-000' }, telefone: '(11) 99999-9999', email: email }], { collection: 'temproles', database: 'admin' }).then(res => {
      const data = JSON.stringify(res)
      cy.task('log', data)
    })

    cy.findOne({ email: email }, { collection: 'temproles', database: 'admin' }).then(res => {
      const data = JSON.stringify(res)
      cy.task('log', data)
      
      cy.wrap(res.email).should('contains', email)
    })
  })
})