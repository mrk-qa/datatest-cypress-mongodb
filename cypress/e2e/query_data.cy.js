const number = Math.floor(Math.random() * 50000)

describe('consultando dados do DB', () => {
  
  it('[query] consulta pelo "email"', () => {
    cy.section('consultar')
    cy.findOne({ email: 'vilamadalena@itau.com' }, { collection: 'temproles', database: 'admin' }).then(res => {
      expect(res.email).to.eq('vilamadalena@itau.com')
      expect(res).to.be.an('object')
      expect(Object.keys(res).length).to.equal(5)
    })
  })

  it('[query] consulta pelo "Summary"', () => {
    cy.section('consultar')
    cy.findOne({ Summary: 'Great taffy' }).then(res => {
      expect(res.Summary).to.eq('Great taffy')
      expect(res.ProfileName).to.eq('Michael D. Bigham "M. Wassir"')
    })
  })

  it('[query] consulta um dado e exclui pelo "userId", depois realiza consulta e valida se foi excluído', () => {
    cy.section('encontrar um e deletar')
    cy.findOneAndDelete({ UserId: 'A395BORC6FGVXV' })

    cy.section('consultar')
    cy.findOne({ UserId: 'A395BORC6FGVXV' }).then(res => {
      expect(res).to.not.exist
    })
  })

  it('[query] consulta um dado e atualiza o "ProfileName", depois realiza consulta e valida se foi atualizado', () => {
    cy.section('encontrar um e atualizar')
    cy.findOneAndUpdate({ ProfileName: 'Carol A. Reed' }, { $set: { ProfileName: 'Carol da Silva' } })

    cy.section('consultar')
    cy.findOne({ ProfileName: 'Carol da Silva' }).then(res => {
      expect(res.ProfileName).to.eq('Carol da Silva')
    })
  })

  it('[query] consulta muitos dados de acordo com o "Id"', () => {
    cy.section('encontra muitos')
    cy.log(number)
    cy.findMany({ Id: number }).then(res => {
      const data = JSON.stringify(res)
      cy.log(data)
    })
  })

})