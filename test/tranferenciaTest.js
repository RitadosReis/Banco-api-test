const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const { obterToken } = require('../helpers/autenticacao');
const postTransferencia = require('../fixture/postTransferencia.json');

describe('Transferencias', function () {
  let token;

  beforeEach(async function () {
    token = await obterToken('Julio.Lima', '123456');
  });

  describe('POST /transferencias', function () {
    it('deve retornar 201 quando valor >= 10,00', async function () {
      const body = { ...postTransferencia };
      const res = await request(process.env.BASE_URL)
        .post('/transferencias')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(body);

      expect(res.status).to.equal(201);
    });

    it('deve retornar 422 quando valor < 10,00', async function () {
      const body = { ...postTransferencia, valor: 7 };
      const res = await request(process.env.BASE_URL)
        .post('/transferencias')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(body);

      expect(res.status).to.equal(422);
    });
  });

  describe('GET /transferencias (paginação)', function () {
    it('Deve retornar paginação', async function () {
      const res = await request(process.env.BASE_URL)
        .get('/transferencias?pagina=1&limite=10')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).to.equal(200);

      const meta = res.body?.meta || res.body;
      const dados =
        res.body?.dados ||
        res.body?.data ||
        res.body?.items ||
        res.body?.results ||
        [];

      expect(meta).to.have.property('page');
      expect(meta).to.have.property('limit');
      expect(meta).to.have.property('total');
      expect(dados).to.be.an('array');
    });
  });
});
