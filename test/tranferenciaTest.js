const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const { obterToken } = require('../helpers/autenticacao');

describe('Transferencias', () => {
  let token;

  // Gera o token uma vez antes dos testes
  before(async () => {
    token = await obterToken('Julio.Lima', '123456');
  });

  describe('POST /transferencias', () => {
    it('deve retornar 201 quando valor >= 10,00', async () => {
      const response = await request(process.env.BASE_URL)
        .post('/transferencias')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          contaOrigem: 1,
          contaDestino: 2,
          valor: 11,
          token: ''
        });

      expect(response.status).to.equal(201); // se a API devolver 200, troque aqui
    });

    it('deve retornar 422 quando valor < 10,00', async () => {
      const response = await request(process.env.BASE_URL)
        .post('/transferencias')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          contaOrigem: 1,
          contaDestino: 2,
          valor: 7,
          token: ''
        });

      expect(response.status).to.equal(422);
    });
  });
});
