/// <reference types="cypress" />

/*
Exercício 1 - Buger - eats(https://buger-eats.vercel.app/)
Efetue uma tentativa de cadastro informando um CPF inválido e deixando de enviar a foto da CNH e valide que mensagens informando da necessidade de corrigir os campos são exibidas.
Efetue um cadastro completo, informando os dados necessários corretamente, selecionando o método de entrega “Bicicleta”(porque somos amigos da natureza 😀🚲).Valide que o cadastro foi concluído com sucesso.
*/

describe('Cadastro Buger Eats', () => {

  beforeEach(() => {
    cy.visit('https://buger-eats.vercel.app/')
    cy.contains('Cadastre-se para fazer entregas').should('be.visible').click()

  })

  it('cadastro com cpf invalido', () => {
    cy.get('input[name=name]').type('Cauê Isaac Brito')
    cy.get('input[name=cpf]').type('00000000000{enter}')
    cy.get('input[name=email]').type('caue_brito@saopaulo10hotmail.com')
    cy.get('input[name=whatsapp]').type('87919776732')
    cy.get('input[name=postalcode]').type('69093196')
    cy.intercept('GET', 'https://viacep.com.br/ws/69093196/json').as('viacep')
    cy.get('input[value="Buscar CEP"]').click()
    cy.wait('@viacep')
    cy.get('input[name="address"]').should('be.disabled').should('have.value', 'Rua Baré')
    cy.get('input[name=address-number]').type('11')
    cy.get('input[name=address-details]').type('Antiga rua 1')
    cy.get('input[name="district"]').should('be.disabled').should('have.value', 'Colônia Santo Antônio')
    cy.get('input[name="city-uf"]').should('be.disabled').should('have.value', 'Manaus/AM')
    cy.contains('Moto').click()
    cy.get('.button-success').click()
    cy.contains('Oops! CPF inválido')
  })

  it('cadastro sem envio da cnh', () => {
    cy.get('input[name=name]').type('Cauê Isaac Brito')
    cy.get('input[name=cpf]').type('87919776732{enter}')
    cy.get('input[name=email]').type('caue_brito@saopaulo10hotmail.com')
    cy.get('input[name=whatsapp]').type('87919776732')
    cy.get('input[name=postalcode]').type('69093196')
    cy.intercept('GET', 'https://viacep.com.br/ws/69093196/json').as('viacep')
    cy.get('input[value="Buscar CEP"]').click()
    cy.wait('@viacep')
    cy.get('input[name="address"]').should('be.disabled').should('have.value', 'Rua Baré')
    cy.get('input[name=address-number]').type('11')
    cy.get('input[name=address-details]').type('Antiga rua 1')
    cy.get('input[name="district"]').should('be.disabled').should('have.value', 'Colônia Santo Antônio')
    cy.get('input[name="city-uf"]').should('be.disabled').should('have.value', 'Manaus/AM')
    cy.contains('Moto').click()
    cy.get('.button-success').click()
    cy.contains('Adicione uma foto da sua CNH')

  })
  it('cadastro completo com sucesso', () => {
    cy.get('input[name=name]').type('Cauê Isaac Brito')
    cy.get('input[name=cpf]').type('87919776732')
    cy.get('input[name=email]').type('caue_brito@saopaulo10hotmail.com')
    cy.get('input[name=whatsapp]').type('87919776732')
    cy.get('input[name=postalcode]').type('69093196')
    cy.intercept('GET', 'https://viacep.com.br/ws/69093196/json').as('viacep')
    cy.get('input[value="Buscar CEP"]').click()
    cy.wait('@viacep')
    cy.get('input[name="address"]').should('be.disabled').should('have.value', 'Rua Baré')
    cy.get('input[name=address-number]').type('11')
    cy.get('input[name=address-details]').type('Antiga rua 1')
    cy.get('input[name="district"]').should('be.disabled').should('have.value', 'Colônia Santo Antônio')
    cy.get('input[name="city-uf"]').should('be.disabled').should('have.value', 'Manaus/AM')
    cy.contains('Bicicleta').click()
    cy.get('input[type=file]').selectFile('cypress/fixtures/cnh.png', { force: true })
    cy.get('.button-success').click()
    cy.get('#swal2-html-container').should('be.visible').should('have.text', 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.')
    cy.get('.swal2-confirm').click()
    cy.url().should('eq', 'https://buger-eats.vercel.app/')
  })
})