import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const loginOk= {
  email: 'teste@teste.com',
  password: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc', 

}

const loginFailnoEmail = {
  email: '',
  password: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc', 
}

const loginFailnoPass = {
  email: 'teste@teste.com',
  password: '',
}

const teams = 
  [
    {
      id: 1,
      teamName: 'Avaí/Kindermann',
    },
    {
      id: 2,
      teamName: 'Bahia',
    },
    {
      id: 3,
      teamName: 'Botafogo',
    },
    {
      id: 4,
      teamName: 'Corinthians',
    },
    {
      id: 5,
      teamName: 'Cruzeiro',
    },
    {
      id: 6,
      teamName: 'Ferroviária',
    },
    {
      id: 7,
      teamName: 'Flamengo',
    },
    {
      id: 8,
      teamName: 'Grêmio',
    },
    {
      id: 9,
      teamName: 'Internacional',
    },
    {
      id: 10,
      teamName: 'Minas Brasília',
    },
    {
      id: 11,
      teamName: 'Napoli-SC',
    },
    {
      id: 12,
      teamName: 'Palmeiras',
    },
    {
      id: 13,
      teamName: 'Real Brasília',
    },
    {
      id: 14,
      teamName: 'Santos',
    },
    {
      id: 15,
      teamName: 'São José-SP',
    },
    {
      id: 16,
      teamName: 'São Paulo',
    },
  ]

  const oneTeam = {
    id: 16,
    teamName: 'São Paulo',
  }


describe('Testa rota Login', () => {
  it('Testa Login corretamente', async () => {
    const teste = await chai.request(app).post('/login').send(loginOk);
    expect(teste.status).to.be.equal(200);
  });
  it('Testa Login sem email', async () => {
    const teste = await chai.request(app).post('/login').send(loginFailnoEmail);
    expect(teste.status).to.be.equal(200);
  });
  it('Testa Login sem senha', async () => {
    const teste = await chai.request(app).post('/login').send(loginFailnoPass);
    expect(teste.status).to.be.equal(200);
  });
});

describe('Testa rota Teams', () => {
  it('Testa retorno de todos os times', async () => {
    const teste = await chai.request(app).get('/teams').send();
    expect(teste.body).to.deep.equal(teams);
  });
  it('Testa retorno de todos os times', async () => {
    const teste = await chai.request(app).get('/teams/16').send();
    expect(teste.body).to.deep.equal(oneTeam);
  });



});