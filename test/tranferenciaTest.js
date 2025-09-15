const request = require('supertest')
const { expect } = require('chai')
describe('Transferencias', () => {
    describe('POST /transfers', () => {
        it('deve retornar 200 quando valor igual ou acima de 10,00', async () => {
            const respostalogin = await request('http://localhost:3000')
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': 'Julio.Lima',
                    'senha': '123456'
                });
            const token = respostalogin.body.token

            const response = await request('http://localhost:3000')
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    contaOrigem: 1,
                    contaDestino: 2,
                    valor: 11,
                    token: ""
                });
            expect(response.status).to.equal(201);
        });
        it('deve retornar 422 quando valor abaixo de 10,00', async () => {
            const respostalogin = await request('http://localhost:3000')
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': 'Julio.Lima',
                    'senha': '123456'
                });
            const token = respostalogin.body.token

            const response = await request('http://localhost:3000')
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    contaOrigem: 1,
                    contaDestino: 2,
                    valor: 7,
                    token: ""
                });
            expect(response.status).to.equal(422);

        });
    });
});

