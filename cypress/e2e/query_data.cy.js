const number = Math.floor(Math.random() * 1000)

const options = { collection: 'types', database: 'pokemon' }

describe('consultando dados do DB', () => {
  
  it('[query] consulta pelo "name"', () => {
    cy.section('consultar e salvar a query')
    cy.findMany({ index: '3' }, options).then(res => {
      cy.writeFile('cypress/fixtures/query/query_many_name.json', res)
    })

    cy.section('dados esperados')
    cy.fixture('query/query_many_name.json').then(res => {
      const data = JSON.stringify(res)
      console.log(data)
      cy.wrap(res[0].name).should('contains', 'Venusaur')
    })
  })

  it('[query] consulta pelo type "water"', () => {
    cy.section('consultar e salvar query')
    cy.findMany({ pokemon_type1: 'water' }, options).then(res => {
      cy.writeFile('cypress/fixtures/query/query_many_type_water.json', res)
    })

    cy.section('dados esperados')
    cy.fixture('query/query_many_type_water.json').then(res => {
      cy.wrap(res[0].pokemon_type1).should('contains', 'water')
    })
  })

  it('[query] consulta um dado e exclui pelo "index", depois realiza consulta e valida se foi excluído', () => {
    const indexNumber = number.toString()

    cy.section('consultar um e deletar')
    cy.findOneAndDelete({ index: indexNumber }, options)

    cy.section('consultar')
    
    cy.findOne({ index: indexNumber }, options).then(res => {
      cy.wrap(res).should('not.exist')
    })
  })

  it('[query] consulta a quantidade de dados "vazios" na coluna "pokemon_type2"', () => {
    cy.section('consultar e salvar a query')
    cy.findMany({$or: [{ pokemon_type2: { $exists: false } }, { pokemon_type2: '' }]}, options).then(res => {
      cy.writeFile('cypress/fixtures/query/query_many_null_pokemon_type2.json', res)
    })

    cy.section('dados esperados')
    cy.fixture('query/query_many_null_pokemon_type2.json').then(res => {
      cy.wrap(res[15].pokemon_type2).should('contains', '')
      console.log('Quantidade de dados da query: ' + res.length)
    })
  })

  it('[query] consulta a quantidade de dados "unknown" na coluna "pokemon_type1"', () => {
    cy.section('consultar e salvar a query')
    cy.findMany({$or: [{ pokemon_type1: { $exists: false } }, { pokemon_type1: 'unknown' }]}, options).then(res => {
      cy.writeFile('cypress/fixtures/query/query_many_unknown_pokemon_type1.json', res)
    })

    cy.section('dados esperados')
    cy.fixture('query/query_many_unknown_pokemon_type1.json').then(res => {
      cy.wrap(res[1].pokemon_type1).should('contains', 'unknown')
      cy.wrap(res).should('have.length', 5)
      console.log('Quantidade de dados da query: ' + res.length)
    })
  })

  it('[query] consulta a quantidade de dados "vazios" na coluna "index"', () => {
    cy.section('consultar e salvar a query')
    cy.findMany({$or: [{ index: { $exists: false } }, { index: '' }]}, options).then(res => {
      cy.writeFile('cypress/fixtures/query/query_many_null_index.json', res)
    })

    cy.section('dados esperados')
    cy.fixture('query/query_many_null_index.json').then(res => {
      cy.wrap(res[1].index).should('contains', '')
      cy.wrap(res).should('have.length', 5)
    })
  })

})