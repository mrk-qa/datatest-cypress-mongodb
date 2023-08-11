const assert = require('assert')
const number = Math.floor(Math.random() * 1000)

describe('consultando dados do DB', () => {
  
  it('[query] consulta pelo "name"', () => {
    cy.section('consultar')
    cy.findOne({ index: '3' }).then(res => {
      const data = JSON.stringify(res)
      cy.task('log', data)
      expect(res.name).to.eq('Venusaur')
    })
  })

  it('[query] consulta pelo type "water"', () => {
    cy.section('consultar')
    cy.findOne({ pokemon_type1: 'water' }).then(res => {
      const data = JSON.stringify(res)
      cy.task('log', res.pokemon_type1)

      assert.strictEqual(res.pokemon_type1, 'water')
    })
  })

  it('[query] consulta um dado e exclui pelo "index", depois realiza consulta e valida se foi excluído', () => {
    cy.section('encontrar um e deletar')
    cy.findOneAndDelete({ index: number })

    cy.section('consultar')
    cy.findOne({ index: number }).then(res => {
      expect(res).to.not.exist
    })
  })

  it('[query] consulta um dado e atualiza o "index", depois realiza consulta e valida se foi atualizado', () => {
    cy.section('encontrar um e atualizar')
    cy.findOneAndUpdate({ index: '348' }, { $set: { pokemon_type2: '' } })

    cy.section('consultar')
    cy.findOne({ index: '348' }).then(res => {
      const data = JSON.stringify(res)
      cy.task('log', data)
      expect(res.pokemon_type2).to.eq('')
    })
  })

  it('[query] consulta muitos dados de acordo com o "pokemon_type1"', () => {
    cy.section('encontra muitos')
    cy.findMany({ pokemon_type1: 'bug' }).then(res => {
      const data = JSON.stringify(res)
      cy.task('log', data)
    })
  })

})