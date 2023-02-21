export class LojaSauceDemo {

    login(user, password) {
        cy.get('[data-test="username"]').type(user)
        cy.get('[data-test="password"]').type(password)
        cy.get('[data-test="login-button"]').click()
    }

    addToCard(nomeProduto) {
        cy.get('.inventory_item_description').filter(':contains(' + nomeProduto + ')').should('have.length', 1).then(($) => {
            cy.wrap($).find('button').contains('Add to cart').click()
        })
    }

    validateToCard(nomeProduto, price) {
        cy.get('.cart_item_label').filter(':contains(' + nomeProduto + ')').should('have.length', 1).then(($) => {
            cy.wrap($).find('.inventory_item_name').should('have.text', nomeProduto)
            cy.wrap($).find('.inventory_item_price').should('have.text', '$' + price)
        })
    }

    addAddres() {
        cy.get('[data-test="firstName"]').type('PrimeiroNome')
        cy.get('[data-test="lastName"]').type('SegundoNome')
        cy.get('[data-test="postalCode"]').type('123123123')
        cy.get('[data-test="continue"]').should('be.visible').click()
    }
}