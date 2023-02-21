/// <reference types="cypress" />

/*
Exercício 2
BugBank(https://bugbank.netlify.app/)
Realizar o registro de um cliente selecionando a opção de criar um conta com saldo e validar que o número da conta criada foi exibido com sucesso
Acessar o BugBak com o cliente criado e verificar que o acesso foi feito com sucesso
Obter um extrato da movimentação da conta
*/

describe('Registro Bug Bank', () => {

  beforeEach(() => {
    cy.visit('https://bugbank.netlify.app/')
  })

  it('registrar uma conta com saldo', () => {
    cy.contains('Registrar').should('be.visible').click()
    cy.get('.card__register input[type=email]').type('caue1_brito@saopaulo10hotmail.com', { force: true })
    cy.get('.card__register input[name=name]').type('Cauê Isaac Brito', { force: true })
    cy.get('.card__register input[name=password]').type('1234', { force: true })
    cy.get('.card__register input[name=passwordConfirmation]').type('1234', { force: true })
    cy.get('.card__register #toggleAddBalance').click({ force: true })
    cy.contains('Cadastrar').click({ force: true })
    cy.get('#modalText').then(($) => {
      const indiceIncial = ($[0].innerText).indexOf("A conta") + 7;
      const indiceFinal = ($[0].innerText).indexOf("foi criada com sucesso") - 1
      const numeroConta = ($[0].innerText).slice(indiceIncial, indiceFinal)
      expect($[0].innerText).to.eq('A conta' + `${numeroConta}` + ' foi criada com sucesso')
      cy.get('#btnCloseModal').click()
      cy.get('.card__login input[type=email]').type('caue1_brito@saopaulo10hotmail.com')
      cy.get('.card__login input[name=password]').type('1234')
      cy.contains('Acessar').click({ force: true })
      cy.contains('Olá Cauê Isaac Brito,bem vindo ao BugBank :)')
      cy.get('#textAccountNumber').should('have.text', 'Conta digital:' + `${numeroConta}`)
      cy.get('#btn-EXTRATO').should('be.visible').click()
      cy.url().should('eq', 'https://bugbank.netlify.app/bank-statement')
      cy.get('#textDescription').should('be.visible').should('have.text', 'Saldo adicionado ao abrir conta')
    })
  })
})