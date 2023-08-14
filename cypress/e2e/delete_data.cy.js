const { fakerPT_BR: faker } = require('@faker-js/faker')
const options = { collection: 'types', database: 'pokemon'}

const name = faker.internet.userName().toLowerCase()
const number = Math.floor(Math.random() * 1000)

describe('Excluindo dados do DB', () => {

  it('[delete] derruba uma collection', () => {
    cy.createCollection(name, { database: 'test' }).then(res => {
      const data = JSON.stringify(res)
      cy.task('log', data)
    })

    cy.dropCollection(name, { database: 'test' }).then(res => {
      const data = JSON.stringify(res)
      cy.task('log', data)
    })
  })

  it('[delete] exclui um dado dentro da collection e do DB', () => {
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