/// <reference types="cypress" />
/*
http://webdriveruniversity.com
Ajax-Loader
Aguardar o carregamento, clicar no Botão Click me! E clicar em Done na message box que abre
Iframe
Abrir a página, acessar o for me contact us, preencher e enviar
Date picker
Selecionar a data de ontem, gerada a data a ser selecionada no cypress
*/
describe('Testes Ajax-Loader iframe e Date picker', () => {

  beforeEach(() => {
    cy.visit('http://webdriveruniversity.com')
  })

  it('Aguardar o carregamento, clicar no Botão Click me! E clicar em Done na message box que abre Iframe', () => {
    cy.get('#ajax-loader')
      .should('be.visible')
      .invoke('removeAttr', 'target')
      .click({ force: true })
    cy.wait(6000)
    cy.get('#button1').should('have.text', 'CLICK ME!').click()
    cy.get('div .modal-footer button[type="button"]').should('have.text', 'Close').click()
  })
  it('Abrir a página, acessar o for me contact us, preencher e enviar', () => {
    cy.get('#contact-us')
      .invoke('removeAttr', 'target')
      .click()
    cy.get('input[name="first_name"]').type('Cauê')
    cy.get('input[name="last_name"]').type('Isaac Brito')
    cy.get('input[name="email"]').type('caue1_brito@saopaulo10hotmail.com')
    cy.get('textarea[name="message"]').type('Msg1')
    cy.get('input[value="SUBMIT"]').click()
  })
  it('Date picker selecionar a data de ontem, gerada a data a ser selecionada no cypress', () => {
    cy.get('#datepicker')
      .invoke('removeAttr', 'target')
      .click()
    cy.get('.input-group-addon').click()
    cy.get('.today').prev().click()
  })
})

