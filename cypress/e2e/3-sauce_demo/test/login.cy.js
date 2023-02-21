/// <reference types="cypress" />
/*
Exercício 3 - Swag Labs(https://www.saucedemo.com/)
Efetuar login com cada um dos tipos de usuário disponíveis
Efetuar login com standard_user e mudar a forma de ordenação dos produtos; realizar também a compra de um produto qualquer e validar
Adicionar 3 itens a sacola e verificar a soma do valor total
*/

import { LojaSauceDemo } from "../page_object/lojaPage";
const lojaSauceDemo = new LojaSauceDemo()

describe('login usuarios', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/ ')
  })
  describe('Login usuarios OK', () => {
    ;['standard_user', 'problem_user', 'performance_glitch_user'].forEach((user) => {
      it('Login user: ' + user, () => {
        lojaSauceDemo.login(user, 'secret_sauce')
        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
      })
    })
  })
  describe('Login usuarios NOK', () => {
    ;['locked_out_user'].forEach((user) => {
      it('Login user: ' + user, () => {
        lojaSauceDemo.login(user, 'secret_sauce')
        cy.get('.error-message-container').should('be.visible').should('have.text', 'Epic sadface: Sorry, this user has been locked out.')
      })
    })
  })
})

