const { fakerPT_BR: faker } = require('@faker-js/faker')

const name = faker.internet.userName().toLowerCase()
const number = Math.floor(Math.random() * 1000)

describe('excluindo dados do DB', () => {

    it('[delete] derruba uma collection', () => {

        cy.section('setup')
        cy.createCollection(name, { database: 'test' }).then(res => {
            const data = JSON.stringify(res)
            cy.task('log', data)
        })

        cy.section('derrubar')
        cy.dropCollection(name, { database: 'test' }).then(res => {
            const data = JSON.stringify(res)
            cy.task('log', data)
        })
    })

    it('[delete] exclui um dado dentro da collection e do DB', () => {
        cy.section('deletar um')
        const indexNumber = number.toString()
        cy.deleteOne({ index: indexNumber }).then(res => {
            if (res) {
                const data = JSON.stringify(res)
                cy.task('log', data)
            } else {
                throw new Error('Não há dados para excluir')
            }
        })
    })
})