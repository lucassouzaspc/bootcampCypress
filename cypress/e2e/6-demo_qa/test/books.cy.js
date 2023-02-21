/// <reference types="cypress" />

/*
  Exercício 6
  https://demoqa.com/books
  Crie um teste parametrizado para realizar as seguintes ações
  Logar na bookstore
  Adicionar um livro à sua lista
  Acessar o profile
  Validar o livro adicionado à sua lista
*/

Cypress.Commands.add('registro', (username, password) => {
  cy.visit('https://demoqa.com/register/')
  cy.get('#firstname').type("Caue")
  cy.get('#lastname').type("Dias")
  cy.get('#userName').type(username)
  cy.get('#password').type(password)
  cy.confirmCaptcha()
  cy.get('#register').click()
})

Cypress.Commands.add("confirmCaptcha", () => {
  cy.wait(500)
  cy.window().then(win => {
    win.document
      .querySelector("iframe[src*='recaptcha']")
      .contentDocument.getElementById("recaptcha-token")
      .click();
  });
});

Cypress.Commands.add('login', (rota, username, password) => {
  cy.visit('https://demoqa.com/' + rota)
  rota != 'login' ? cy.get('#login').should('be.visible').click() : true
  cy.get('#userName').type(username)
  cy.get('#password').type(password)
  cy.get('#login').click()
  cy.url().should('eq', 'https://demoqa.com/' + rota)
})

Cypress.Commands.add('logout', () => {
  cy.contains('Log out').should('be.visible').click({ force: true })
})

Cypress.Commands.add('addBook', (bookName) => {
  cy.get('#searchBox').type(bookName).click()
  cy.contains(bookName).click()
  cy.get('div[id="title-wrapper"] div label[id="userName-value"]').should('be.visible').should('have.text', bookName)
  cy.contains('Add To Your Collection').should('be.visible').click({ force: true })
  cy.on('window:alert', (str) => {
    expect(str).to.exist
    expect(str).to.equal("Book added to your collection.")
    cy.get('body').type('{esc}', { force: true })
  })
  cy.reload()
})

Cypress.Commands.add('removerAllBook', () => {
  cy.contains('Delete All Books').should('be.visible').click({ force: true })
  cy.get('#closeSmallModal-ok').should('be.visible').click({ force: true })
  cy.on('window:alert', (str) => {
    expect(str).to.exist
    // expect(str).to.equal("All Books deleted.")
    cy.get('body').type('{esc}', { force: true })
  })
  cy.reload()
})

Cypress.Commands.add('profile', (bookName) => {
  cy.contains('Profile').click({ force: true })
  cy.get('.action-buttons span a').should('be.visible').should('have.text', bookName)
})

describe('Registro book in bookStore', () => {
  const username = "caue1_brito@saopaulo10hotmail.com"
  const password = "Caue@123"

  beforeEach(() => {
    cy.login('login', username, password)
    cy.removerAllBook()
    cy.logout()
  })

  it('Logar e adicionar book na bookStore', () => {
    cy.login('books', username, password)
    cy.addBook('Speaking JavaScript')
    cy.profile('Speaking JavaScript')
  })
})
