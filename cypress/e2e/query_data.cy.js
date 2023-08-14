const number = Math.floor(Math.random() * 1000)

const options = { collection: Cypress.env('mongodb').collection, database: Cypress.env('mongodb').database }

describe('Consultando dados do DB', () => {
  
  it('[query] consulta pelo "name"', () => {
    cy.findMany({ index: '3' }, options).then(res => {
      const data = JSON.stringify(res)
      cy.task('log', data)

      expect(res[0].name).to.contain('Venusaur')
    })
  })

  it('[query] consulta pelo type "water"', () => {
    cy.findMany({ pokemon_type1: 'water' }, options).then(res => {
      const data = JSON.stringify(res)
      cy.task('log', data)

      expect(res[0].pokemon_type1).to.contain('water')
    })
  })

  it('[query] consulta um dado e exclui pelo "index", depois realiza consulta e valida se foi excluído', () => {
    const indexNumber = number.toString()

    cy.findOneAndDelete({ index: indexNumber }, options).then(res => {
      cy.task('log', 'Deletado pelo index: ' + res.index)
    })
    
    cy.findOne({ index: indexNumber }, options).then(res => {
      const data = JSON.stringify(res)
      cy.task('log', data)

      expect(res).to.not.exist
    })
  })

  it('[query] consulta a quantidade de dados "nulos" na coluna "pokemon_type2"', () => {
    cy.findMany({$or: [{ pokemon_type2: { $exists: false } }, { pokemon_type2: '' }]}, options).then(res => {
      const data = JSON.stringify(res)
      cy.task('log', data)

      expect(res[15].pokemon_type2).to.contain('')
      cy.task('log', 'Quantidade de dados da query: ' + res.length)
    })
  })

  it('[query] consulta a quantidade de dados "unknown" na coluna "pokemon_type1"', () => {
    cy.findMany({$or: [{ pokemon_type1: { $exists: false } }, { pokemon_type1: 'unknown' }]}, options).then(res => {
      const data = JSON.stringify(res)
      cy.task('log', data)

      expect(res[1].pokemon_type1).to.contain('unknown')
      expect(res).to.have.length(5)
      cy.task('log', 'Quantidade de dados da query: ' + res.length)
    })
  })

  it('[query] consulta a quantidade de dados "nulos" na coluna "index"', () => {
    cy.findMany({$or: [{ index: { $exists: false } }, { index: '' }]}, options).then(res => {
      const data = JSON.stringify(res)
      cy.task('log', data)

      expect(res[1].index).to.contain('')
      expect(res).to.have.length(5)
    })
  })

})