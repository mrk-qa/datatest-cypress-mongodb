const number = Math.floor(Math.random() * 1000)

describe('consultando dados do DB', () => {
  
  it('[query] consulta pelo "name"', () => {
    cy.section('consultar')
    cy.queryMany({ index: '3' }).as('queryResult')

    cy.section('salvar query')
    cy.get('@queryResult').then(result => {
      cy.log(result)
      // cy.writeFile('cypress/fixtures/query/query_many_name.json', res)
    })

    cy.section('dados esperados')
    // cy.fixture('query/query_many_name.json').then(result => {
    //   cy.log(result)
      // expect(res[0].name).to.eq('Venusaur')
    // })
  })

  it('[query] consulta pelo type "water"', () => {
    cy.section('consultar')
    cy.queryMany({ pokemon_type1: 'water' }).as('queryResult')

    cy.section('salvar query')
    cy.get('@queryResult').then(result => {
      cy.log(result)
      // cy.writeFile('cypress/fixtures/query/query_many_type_water.json', res)
    })

    cy.section('dados esperados')
    // cy.fixture('query/query_many_type_water.json').then(res => {
    //   const data = JSON.stringify(res[0].pokemon_type1)
    //   cy.task('log', data)
      // expect(res[0].pokemon_type1).to.equal('water')
    // })
  })

  it('[query] consulta um dado e exclui pelo "index", depois realiza consulta e valida se foi excluído', () => {
    cy.section('consultar um e deletar')
    cy.findOneAndDelete({ index: number })

    cy.section('consultar')
    cy.findOne({ index: number }).then(res => {
      expect(res).to.not.exist
    })
  })

  it('[query] consulta um dado e atualiza o "index", depois realiza consulta e valida se foi atualizado', () => {
    cy.section('consultar um e atualizar')
    cy.findOneAndUpdate({ index: '348' }, { $set: { pokemon_type2: '' } })

    cy.section('consultar')
    cy.queryMany({ index: '348' }).as('queryResult')

    cy.section('salvar query')
    cy.get('@queryResult').then(result => {
      cy.log(result)
      // cy.writeFile('cypress/fixtures/query/query_many_index_and_update_pokemon_type2.json', res)
    })

    cy.section('dados esperados')
    // cy.fixture('query/query_many_index_and_update_pokemon_type2.json').then(res => {
    //   const data = JSON.stringify(res[0].pokemon_type2)
    //   cy.task('log', data)
      // expect(res[0].pokemon_type2).to.equal('')
    // })
  })

  it('[query] consulta muitos dados de acordo com o "pokemon_type1"', () => {
    cy.section('consultar')
    cy.queryMany({ pokemon_type1: 'bug' }).as('queryResult')

    cy.section('salvar query')
    cy.get('@queryResult').then(result => {
      cy.log(result)
      // cy.writeFile('cypress/fixtures/query/query_many_pokemon_type1.json', res)
    })

    cy.section('dados esperados')
    // cy.fixture('query/query_many_pokemon_type1.json').then(result => {
    //   cy.log(result)
      // expect(res[0].pokemon_type1).to.equal('bug')
    // })
  })

})