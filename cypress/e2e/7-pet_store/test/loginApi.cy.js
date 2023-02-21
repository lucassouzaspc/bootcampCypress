/// <reference types="cypress" />
/*
  Exercício 7 - https://petstore.swagger.io/
  Realizar o seguinte fluxo de API
  Realizar login
  Criar um usuário
  Atualizar um usuário
  Deletar um usuário
  Criar usuário com array
  Validar usuários criados com array
*/

import { PetStore } from "../page_object/petStore";
const petStore = new PetStore()
const urlBase = 'https://petstore.swagger.io'

const payloadUser = {
  "username": "Userpetname",
  "firstName": "UserpetFirstName",
  "lastName": "UserpetLastName",
  "email": "userpet@pet.com",
  "password": "passPet",
  "phone": "82987881116",
  "userStatus": 0
}

describe('Login usuarios OK', () => {

  it('Realizar login', () => {
    const username = 'Userpetname'
    const password = 'passPet'
    const url = urlBase + '/v2/user/login?username=' + username + '&password=' + password
    petStore.login(url).then((response) => {
      expect(response.status).to.equal(200)
      expect(response.body.code).to.equal(200)
      expect(response.body.type).to.equal('unknown')
      expect(response.body.message).to.contain('logged in user session:')
    })
  })

  it('Criar um usuário', () => {
    const url = urlBase + '/v2/user'
    petStore.createUser(url, payloadUser).then((response) => {
      expect(response.status).to.equal(200)
      expect(response.body.code).to.equal(200)
      expect(response.body.type).to.equal('unknown')
      expect(response.body.message).to.exist
    })
  })

  it('Atualizar um usuário', () => {
    const username = 'Userpetname'
    const url = urlBase + '/v2/user/' + username
    petStore.updateUser(url, payloadUser).then((response) => {
      expect(response.status).to.equal(200)
      expect(response.body.code).to.equal(200)
      expect(response.body.type).to.equal('unknown')
      expect(response.body.message).to.exist
    })
  })

  it('Deletar um usuário', () => {
    const username = 'Userpetname'
    const url = urlBase + '/v2/user/' + username
    petStore.deleteUser(url).then((response) => {
      expect(response.status).to.equal(200)
      expect(response.body.code).to.equal(200)
      expect(response.body.type).to.equal('unknown')
      expect(response.body.message).to.exist
    })
  })

  it('  Criar usuário com array', () => {
    payloadUser.username = "UserpetnameArray"
    const payloadUpdateUser = [payloadUser]
    const url = urlBase + '/v2/user/createWithArray'
    petStore.createUser(url, payloadUpdateUser).then((response) => {
      expect(response.status).to.equal(200)
      expect(response.body.code).to.equal(200)
      expect(response.body.type).to.equal('unknown')
      expect(response.body.message).to.equal('ok')
    })
  })

  it('Validar usuários criados com array', () => {
    const username = 'UserpetnameArray'
    const url = urlBase + '/v2/user/' + username
    petStore.login(url).then((response) => {
      expect(response.status).to.equal(200)
      expect(response.body.id).to.exist
      expect(response.body.username).to.equal('UserpetnameArray')
      expect(response.body.firstName).to.equal('UserpetFirstNameArray')
      expect(response.body.lastName).to.equal('UserpetLastNameArray')
      expect(response.body.email).to.equal('userpetArray@pet.com')
      expect(response.body.password).to.equal('passPetArray')
      expect(response.body.phone).to.equal('82987881116')
      expect(response.body.userStatus).to.equal(0)
    })
  })

})