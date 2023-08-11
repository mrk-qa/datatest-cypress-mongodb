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
      expect(res[0].name).to.eq('Venusaur')
    })
  })

  it('[query] consulta pelo type "water"', () => {
    cy.section('consultar e salvar query')
    cy.findMany({ pokemon_type1: 'water' }, options).then(res => {
      cy.writeFile('cypress/fixtures/query/query_many_type_water.json', res)
    })

    cy.section('dados esperados')
    cy.fixture('query/query_many_type_water.json').then(res => {
      expect(res[0].pokemon_type1).to.equal('water')
    })
  })

  it('[query] consulta um dado e exclui pelo "index", depois realiza consulta e valida se foi excluído', () => {
    const indexNumber = number.toString()

    cy.section('consultar um e deletar')
    cy.findOneAndDelete({ index: indexNumber }, options)

    cy.section('consultar')
    
    cy.findOne({ index: indexNumber }, options).then(res => {
      expect(res).to.not.exist
    })
  })

  it('[query] consulta um dado e atualiza o "index", depois realiza consulta e valida se foi atualizado', () => {
    cy.section('consultar um e atualizar')
    cy.findOneAndUpdate({ index: '348' }, { $set: { pokemon_type2: '' } })

    cy.section('consultar e salvar query')
    cy.findMany({ index: '348' }, options).then(res => {
      cy.writeFile('cypress/fixtures/query/query_many_index_and_update_pokemon_type2.json', res)
    })

    cy.section('dados esperados')
    cy.fixture('query/query_many_index_and_update_pokemon_type2.json').then(res => {
      expect(res[0].pokemon_type2).to.equal('')
    })
  })

  it('[query] consulta muitos dados de acordo com o "pokemon_type1"', () => {
    cy.section('consultar e salvar query')
    cy.findMany({ pokemon_type1: 'bug' }, options).then(res => {
      cy.writeFile('cypress/fixtures/query/query_many_pokemon_type1.json', res)
    })

    cy.section('dados esperados')
    cy.fixture('query/query_many_pokemon_type1.json').then(res => {
      const data = JSON.stringify(res)
      cy.task('log', data)
      expect(res[0].pokemon_type1).to.equal('bug')
    })
  })

})