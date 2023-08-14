const options = { collection: 'backup-pokemon-types', database: 'local' }

describe('Migração de dados DB pokemon para DB admin', () => {

  it('[migration] valida a migração com sucesso dos dados do DB pokemon para DB admin com nome "backup-types"', () => {
    cy.allure().severity('critical')

    const startTime = Date.now()

    cy.wrap(new Promise((resolve) => {
      cy.findMany({}, options).then(res => {
        const data = JSON.stringify(res)
        const migratedData = res
        let assertCount = 0

        cy.task('log', 'Iniciando validação dos dados migrados...')

        migratedData.forEach(migratedItem => {
          assertCount++

          expect(migratedItem.name).to.be.a('string')
          expect(migratedItem.index).to.be.a('string')
          expect(migratedItem.pokemon_type1).to.be.a('string')
        })

        expect(assertCount).to.equal(1015)
        cy.task('log', 'Dados migrados foram validados com sucesso!')

        const endTime = Date.now()

        const elapsedTime = endTime - startTime

        cy.task('log', `Tempo de validação: ${elapsedTime} ms`)
        resolve()
      })
    }))
  })
})