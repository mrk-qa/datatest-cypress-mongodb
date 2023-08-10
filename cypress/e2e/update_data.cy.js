describe('atualizando dados do DB', () => {

    it('[update] atualiza o "Score", depois realiza consulta e valida se foi atualizado', () => {
        cy.section('atualizar um')
        cy.updateOne({ ProductId: 'B006K2ZZ7K' }, { $set: { Score: 11 } })

        cy.section('consultar')
        cy.findOne({ ProductId: 'B006K2ZZ7K' }).then(res => {
            expect(res.ProductId).to.eq('B006K2ZZ7K')
            expect(res.Score).to.eq(11)
            expect(res).to.be.an('object')
        })
    })

    it('[update] atualiza um dado, depois realiza consulta e valida se foi atualizado', () => {
        cy.section('atualizar um')
        cy.updateOne({ Id: 8 }, { $set: { Text: 'Rosas são vermelhas violetas são azuis' } })

        cy.section('consultar')
        cy.findOne({ Id: 8 }).then(res => {
            expect(res.Text).to.eq('Rosas são vermelhas violetas são azuis')
        })
    })
})