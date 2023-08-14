const number = Math.floor(Math.random() * 1000)

const options = { collection: Cypress.env('mongodb').collection, database: Cypress.env('mongodb').database }

describe('Atualizando dados do DB', () => {

  it('[update] atualiza o "nome", depois realiza consulta e valida se foi atualizado', () => {
    cy.updateOne({ name: 'Kingdra' }, { $set: { name: 'Shiny Kingdra' } }, options).then(res => {
      const data = JSON.stringify(res)
      cy.task('log', data)
    })

    cy.findMany({ name: 'Shiny Kingdra' }, options).then(res => {
      const data = JSON.stringify(res)
      cy.task('log', data)

      expect(res[0].name).to.contain('Shiny Kingdra')
      expect(res[0].pokemon_type1).to.contain('water')
      expect(res[0].index).to.contain('230')
    })
  })

  it('[update] atualiza um dado de acordo com o "index", depois realiza consulta e valida se foi atualizado', () => {
    const indexNumber = number.toString()
    cy.updateOne({ index: indexNumber }, { $set: { name: 'Shiny Blastoise' } }, options).then(res => {
      const data = JSON.stringify(res)
      cy.task('log', data)
    })

    cy.findMany({ index: indexNumber }, options).then(res => {
      const data = JSON.stringify(res)
      cy.task('log', data)

      expect(res[0].name).to.contain('Shiny Blastoise')
      expect(res[0].index).to.contain(indexNumber)
    })
  })
})