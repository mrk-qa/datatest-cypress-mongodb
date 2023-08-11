describe('atualizando dados do DB', () => {

    it('[update] atualiza o "nome", depois realiza consulta e valida se foi atualizado', () => {
        cy.section('atualizar um')
        cy.updateOne({ name: 'Kingdra' }, { $set: { name: 'Shiny Kingdra' } })

        cy.section('consultar')
        cy.findOne({ name: 'Shiny Kingdra' }).then(res => {
            expect(res.name).to.eq('Shiny Kingdra')
            expect(res.index).to.eq('230')
            expect(res.pokemon_type1).to.eq('water')
        })
    })

    it('[update] atualiza um dado, depois realiza consulta e valida se foi atualizado', () => {
        cy.section('atualizar um')
        cy.updateOne({ name: 'Walking Wake' }, { $set: { name: 'Shiny Blastoise' } })

        cy.section('consultar')
        cy.findOne({ name: 'Shiny Blastoise' }).then(res => {
            expect(res.name).to.eq('Shiny Blastoise')
        })
    })
})