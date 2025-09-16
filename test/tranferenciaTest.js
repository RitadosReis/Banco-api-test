const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const { obterToken } = require('../helpers/autenticacao');

describe('Transferencias', () => {
  let token;

  before(async function () {

    token = await obterToken('Julio.Lima', '123456'); // corrigido
    expect(token, 'token inválido no login').to.be.a('string').and.not.empty;
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

      expect(
        response.status,
        `status inesperado. Body: ${JSON.stringify(response.body)}`
      ).to.equal(201); 
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

      expect(
        response.status,
        `status inesperado. Body: ${JSON.stringify(response.body)}`
      ).to.equal(422);
    });
  });
});
