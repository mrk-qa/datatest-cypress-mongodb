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

        cy.section('clean')
        cy.dropCollection(name, { database: 'test' }).then(res => {
            const data = JSON.stringify(res)
            cy.task('log', data)
        })
    })

    it('[create] inserir um dado do tipo email', () => {
        cy.insertOne({email: email}, { collection: 'temproles', database: 'admin'}).then(res => {
            cy.task('log', res)
        })

        cy.findOne({email: email}, { collection: 'temproles', database: 'admin'}).then(res => {
            const data = JSON.stringify(res)
            cy.task('log', data)
            expect(res.email).to.eq(email)
        })
    })

    it('[create] inserir muitos dados separadamente', () => {
        cy.insertMany([{nome: name }, {telefone: '(11) 99999-9999'}, { email: email }], { collection: 'temproles', database: 'admin'}).then(res => {
            const data = JSON.stringify(res)
            cy.task('log', data)
        })

        cy.findOne({nome: name }, { collection: 'temproles', database: 'admin'}).then(res => {
            const data = JSON.stringify(res)
            cy.task('log', data)
            expect(res.nome).to.eq(name)
        })

        cy.findOne({telefone: '(11) 99999-9999'}, { collection: 'temproles', database: 'admin'}).then(res => {
            const data = JSON.stringify(res)
            cy.task('log', data)
            expect(res.telefone).to.eq('(11) 99999-9999')
        })

        cy.findOne({ email: email }, { collection: 'temproles', database: 'admin'}).then(res => {
            const data = JSON.stringify(res)
            cy.task('log', data)
            expect(res.email).to.eq(email)
        })
    })

    it('[create] inserir muitos dados em conjunto', () => {
        cy.insertMany([{nome: name, endereco: { logradouro: 'Rua Fradique Coutinho, 987', bairro: 'Jardim Eliza Maria', cidade: 'São Paulo', estado: 'SP', cep: '02874-000' }, telefone: '(11) 99999-9999', email: email }], { collection: 'temproles', database: 'admin'}).then(res => {
            const data = JSON.stringify(res)
            cy.task('log', data)
        })

        cy.findOne({ email: email }, { collection: 'temproles', database: 'admin'}).then(res => {
            const data = JSON.stringify(res)
            cy.task('log', data)
            expect(res.email).to.eq(email)
        })
    })
})