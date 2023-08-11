const { fakerPT_BR: faker } = require('@faker-js/faker')

const name = faker.internet.userName().toLowerCase()
const email = faker.internet.email().toLowerCase()

describe('criando dados ao DB', () => {

    it('[create] cria uma collection', () => {
        cy.section('criar')
        cy.createCollection(name, { database: 'test' }).then(res => {
            const data = JSON.stringify(res)
            cy.task('log', data)
        })

        cy.section('excluir')
        cy.dropCollection(name, { database: 'test' }).then(res => {
            const data = JSON.stringify(res)
            cy.task('log', data)
        })
    })

    it('[create] inserir um dado do tipo email', () => {
        cy.section('inserir dado')
        cy.insertOne({email: email}, { collection: 'temproles', database: 'admin'})

        cy.section('consultar')
        cy.findOne({email: email}, { collection: 'temproles', database: 'admin'}).then(res => {
            const data = JSON.stringify(res.email)
            cy.task('log', data)
            expect(res.email).to.eq(email)
        })
    })

    it('[create] inserir muitos dados em conjunto', () => {
        cy.section('inserindo dados')
        cy.insertMany([{nome: name, endereco: { logradouro: 'Rua Fradique Coutinho, 987', bairro: 'Jardim Eliza Maria', cidade: 'São Paulo', estado: 'SP', cep: '02874-000' }, telefone: '(11) 99999-9999', email: email }], { collection: 'temproles', database: 'admin'})

        cy.section('consultando dados inseridos')
        cy.findOne({ email: email }, { collection: 'temproles', database: 'admin'}).then(res => {
            const data = JSON.stringify(res)
            cy.task('log', data)
            expect(res.email).to.eq(email)
        })
    })
})