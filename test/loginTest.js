const request = require('supertest')
const { expect } = require('chai')
require('dotenv').config()
const postLogin = require('../fixture/postLogin.json')

describe('Login', () => {
    describe('Post /login', () => {
        it('Deve retornar 200 com token em string quando credenciais validas', async () => {
            const bodyLogin = { ...postLogin }
            const resposta = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)

            expect(resposta.status).to.equal(200)
            expect(resposta.body.token).to.be.a('string')
        })
    })
})
