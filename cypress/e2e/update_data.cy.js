const number = Math.floor(Math.random() * 1000)
const options = { collection: 'types', database: 'pokemon' }

describe('atualizando dados do DB', () => {

  it('[update] atualiza o "nome", depois realiza consulta e valida se foi atualizado', () => {
    cy.section('atualizar um')
    cy.updateOne({ name: 'Kingdra' }, { $set: { name: 'Shiny Kingdra' } })

    cy.section('consultar e salvar query')
    cy.findMany({ name: 'Shiny Kingdra' }, options).then(res => {
      cy.writeFile('cypress/fixtures/query/query_many_name_and_update_name.json', res)
    })

    cy.section('dados esperados')
    cy.fixture('query/query_many_name_and_update_name.json').then(res => {
      expect(res[0].name).to.eq('Shiny Kingdra')
      expect(res[0].index).to.eq('230')
      expect(res[0].pokemon_type1).to.eq('water')
    })
  })

  it('[update] atualiza um dado de acordo com o "index", depois realiza consulta e valida se foi atualizado', () => {
    cy.section('atualizar um')
    const indexNumber = number.toString()
    cy.updateOne({ index: indexNumber }, { $set: { name: 'Shiny Blastoise' } })

    cy.section('consultar e salvar query')
    cy.findMany({ index: indexNumber }, options).then(res => {
      cy.writeFile('cypress/fixtures/query/query_many_index_and_update_name.json', res)
    })

    cy.section('dados esperados')
    cy.fixture('query/query_many_index_and_update_name.json').then(res => {
      expect(res[0].name).to.eq('Shiny Blastoise')
    })
  })
})