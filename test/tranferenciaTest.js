const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const { obterToken } = require('../helpers/autenticacao');
const postTransferencia = require('../fixture/postTransferencia.json');

describe('Transferencias', () => {
  let token;

  before(async function () {

    token = await obterToken('Julio.Lima', '123456');
    expect(token, 'token inválido no login').to.be.a('string').and.not.empty;
  });

  describe('POST /transferencias', () => {
    it('deve retornar 201 quando valor >= 10,00', async () => {
        const transferencias = {...postTransferencia};

      const response = await request(process.env.BASE_URL)
        .post('/transferencias')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(bodytransferencias);

        });

      expect(
        response.status,
        `status inesperado. Body: ${JSON.stringify(response.body)}`
      ).to.equal(201);
    });

    it('deve retornar 422 quando valor < 10,00', async () => {
        const transferencias = {...postTransferencia};
        body.transferencias.valor = 7;
      const response = await request(process.env.BASE_URL)
        .post('/transferencias')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(transferencias);

      expect(
        response.status,
        `status inesperado. Body: ${JSON.stringify(response.body)}`
      ).to.equal(422);
    });
  });

