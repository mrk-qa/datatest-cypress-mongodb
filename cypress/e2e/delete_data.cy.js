const { fakerPT_BR: faker } = require('@faker-js/faker')

const name = faker.internet.userName().toLowerCase()
const number = Math.floor(Math.random() * 1000)

const options = { collection: 'types', database: 'pokemon' }

describe('excluindo dados do DB', () => {

    it('[delete] derruba uma collection', () => {

        cy.section('setup')
        cy.createCollection(name, { database: 'test' }).then(res => {
            const data = JSON.stringify(res)
            cy.task('log', data)
        })

        cy.section('derrubar collection')
        cy.dropCollection(name, { database: 'test' }).then(res => {
            const data = JSON.stringify(res)
            cy.task('log', data)
        })
    })

    it('[delete] exclui um dado dentro da collection e do DB', () => {
        cy.section('deletar um')
        const indexNumber = number.toString()
        cy.deleteOne({ index: indexNumber }, options).then(res => {
            if (res) {
                const data = JSON.stringify(res)
                cy.task('log', data)
            } else {
                throw new Error('Não há dados para excluir')
            }
        })
    })
})