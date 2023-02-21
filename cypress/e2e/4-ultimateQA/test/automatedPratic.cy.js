/// <reference types="cypress" />
/*
Automation Practice - Ultimate QA (https://ultimateqa.com/simple-html-elements-for-automation/)
Localize o componente Clickable Icon e validar o redirecionamento para a próxima página e voltar para a home
Preencher o contato e validar a mensagem de Thanks for contacting us
Selecionar um radio button (male, female, other)
Selecionar os checkbox I have a bike e I have a car
Selecionar dropdown Volvo depois selecionar Audi
Selecionar Tab 2 Validar seu conteúdo
Selecionar tab 1 validar seu conteúdo
*/

describe('login usuarios', () => {

  beforeEach(() => {
    cy.visit('https://ultimateqa.com/simple-html-elements-for-automation/')
  })

  afterEach(() => {
    cy.visit('https://ultimateqa.com/')
  })

  it('Localize o componente Clickable Icon e validar o redirecionamento para a próxima página e voltar para a home', () => {
    cy.get('h4 a[href="/link-success/"]').should('be.visible').should('have.text', 'Clickable Icon').click()
    cy.url().should('eq', 'https://ultimateqa.com/link-success/')
  })

  it('Preencher o contato e validar a mensagem de Thanks for contacting us', () => {
    cy.get('#menu-item-216842 a').should('be.visible').should('have.text', 'Contact Us').click()
    cy.url().should('eq', 'https://ultimateqa.com/contact/')
    cy.get('#et_pb_contact_first_0').should('be.visible').type('firstName', { force: true })
    cy.get('#et_pb_contact_last_0').type('lastName', { force: true })
    cy.get('#et_pb_contact_email_0').should('be.visible').type('teste@email.com', { force: true })
    cy.get('#et_pb_contact_message_0').type('Message teste', { force: true })
    cy.get('.et_pb_contact_submit').should('have.text', 'Send Message').click({ force: true })
    cy.get('.et-pb-contact-message').should('have.text', 'Thanks for contacting us')
  })

  it('Selecionar um radio button (male, female, other)', () => {
    cy.get('input[value="female"]').should('be.visible').check({ force: true }).should('be.checked')
  })

  it('Selecionar os checkbox I have a bike e I have a car', () => {
    cy.get('input[value="Bike"]').should('be.visible').check({ force: true }).should('be.checked')
    cy.get('input[value="Car"]').should('be.visible').check({ force: true }).should('be.checked')
  })

  it('Selecionar dropdown Volvo depois selecionar Audi', () => {
    cy.get('select').select('volvo').should('have.value', 'volvo')
    cy.get('select').select('audi').should('have.value', 'audi')
  })

  it('Selecionar Tab 2 Validar seu conteúdo', () => {
    cy.get('.et-pb-active-slide div').should('be.visible').should('have.text', 'tab 1 content')
    cy.get('.et_pb_tab_1 a').click({ force: true })
    cy.get('.et-pb-active-slide div').should('be.visible').should('have.text', 'Tab 2 content')
  })

  it('Selecionar tab 1 validar seu conteúdo', () => {
    cy.get('.et_pb_tab_0 a').contains('Tab 1').click()
    cy.get('.et-pb-active-slide div').should('be.visible').should('have.text', 'tab 1 content')
  })
})

