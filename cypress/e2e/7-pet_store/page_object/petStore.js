export class PetStore {

    login(url) {
        return cy.request({
            method: 'GET',
            url: url,
            failOnStatusCode: false,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    createUser(url, payloadNewUser) {
        return cy.request({
            method: 'POST',
            url: url,
            failOnStatusCode: false,
            headers: {
                "Content-Type": "application/json"
            },
            body: payloadNewUser
        })
    }

    updateUser(url, payloadUpdateUser) {
        return cy.request({
            method: 'PUT',
            url: url,
            failOnStatusCode: false,
            headers: {
                "Content-Type": "application/json"
            },
            body: payloadUpdateUser
        })
    }

    deleteUser(url) {
        return cy.request({
            method: 'DELETE',
            url: url,
            failOnStatusCode: false,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

}