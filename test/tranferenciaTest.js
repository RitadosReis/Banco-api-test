const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const { obterToken } = require('../helpers/autenticacao');
const path = require('path');
const postTransferencia = require('../fixture/postTransferencia.json');

describe('Transferencias', function () {
  let token;

  before(async function () {
    token = await obterToken('Julio.Lima', '123456');
    expect(token, 'token inválido no login').to.be.a('string').and.not.empty;
    expect(process.env.BASE_URL, 'BASE_URL não definida no .env').to.be.a('string').and.not.empty;
  });

  describe('POST /transferencias', function () {
    it('deve retornar 201 quando valor >= 10,00', async function () {
      const bodyTransferencias = { ...postTransferencia };
      const res = await request(process.env.BASE_URL)
        .post('/transferencias')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(bodyTransferencias);

      expect(res.status).to.equal(201);

    });

    it('deve retornar 422 quando valor < 10,00', async function () {
      const bodyTransferencias = { ...postTransferencia, valor: 7 };
      const res = await request(process.env.BASE_URL)
        .post('/transferencias')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(bodyTransferencias);

      expect(res.status).to.equal(422);
    });
  });
});
