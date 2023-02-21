/// <reference types="cypress" />
/*
Exercício 3 - Swag Labs(https://www.saucedemo.com/)
Efetuar login com cada um dos tipos de usuário disponíveis
Efetuar login com standard_user e mudar a forma de ordenação dos produtos; realizar também a compra de um produto qualquer e validar
Adicionar 3 itens a sacola e verificar a soma do valor total
*/
import { LojaSauceDemo } from "../page_object/lojaPage";
const lojaSauceDemo = new LojaSauceDemo()

describe('Fluxo de carrinho e compra', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
  })

  it('Login com usuario standard_user ordenação', () => {
    lojaSauceDemo.login('standard_user', 'secret_sauce')
    cy.get('[data-test="product_sort_container"]').select('Price (low to high)')
    //Validar a ordenacao
  })

  it('Login com usuario standard_user compra de um produto', () => {
    lojaSauceDemo.login('standard_user', 'secret_sauce')
    lojaSauceDemo.addToCard('Sauce Labs Bolt T-Shirt')
    cy.get('.shopping_cart_badge').should('be.visible').click()
    lojaSauceDemo.validateToCard('Sauce Labs Bolt T-Shirt', '15.99')
    cy.get('[data-test="checkout"]').should('be.visible').click()
    lojaSauceDemo.addAddres()
    cy.get('[data-test="finish"]').should('be.visible').click()
    cy.get('#checkout_complete_container').should('be.visible').contains('THANK YOU FOR YOUR ORDER')
  })

  it('Login com usuario standard_user adicionando três item ao carrinho', () => {
    lojaSauceDemo.login('standard_user', 'secret_sauce')
    lojaSauceDemo.addToCard('Sauce Labs Backpack')
    lojaSauceDemo.addToCard('Sauce Labs Fleece Jacket')
    lojaSauceDemo.addToCard('Test.allTheThings() T-Shirt (Red)')
    cy.get('.shopping_cart_badge').should('be.visible').click()
    lojaSauceDemo.validateToCard('Sauce Labs Backpack', '29.99')
    lojaSauceDemo.validateToCard('Sauce Labs Fleece Jacket', '49.99')
    lojaSauceDemo.validateToCard('Test.allTheThings() T-Shirt (Red)', '15.99')
    cy.get('[data-test="checkout"]').should('be.visible').click()
    lojaSauceDemo.addAddres()
    cy.get('.summary_subtotal_label').should('be.visible').should('have.text', 'Item total: $95.97')
  })
})

