const options = { collection: 'types', database: 'pokemon'}

describe('Performance dos dados ao DB', () => {

  it('[performance] tempo de resposta de uma query em ms', () => {
    cy.allure().severity('blocker')

    const startTime = Date.now()

    cy.wrap(new Promise((resolve) => {
      cy.findMany({$or: [{ pokemon_type2: { $exists: false } }, { pokemon_type2: '' }]}, options).then(res => {
        const data = JSON.stringify(res)
        cy.task('log', data)
        
        const endTime = Date.now()

        const elapsedTime = endTime - startTime

        cy.log(`Tempo da query: ${elapsedTime} ms`)
        expect(elapsedTime).to.be.lessThan(200)

        resolve()
      })
    }))
  })

})