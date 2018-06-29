let sinon = require('sinon');
let chai = require('chai');
let mongoose = require('mongoose');
let assert = require('assert');
let expect = chai.expect;
let faker = require('faker');
let request = require('supertest')('http://localhost:3000/api/v1/users');
let app = require('../src/index');

import User from '../src/modules/users/user.model';

export function testRoutes() {
  describe('Testing User routes', function() {
    let user1;
    let user2;
    let token1;
    let id2;
    let cookies;

    faker.seed(99);
    const fakeUser = {
      irstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      userName: faker.internet.userName()
    }
    faker.seed(100);
    const fakeUser2 = {
      irstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      userName: faker.internet.userName()
    }

    it('should create new user', (done) => {
      request
        .post('/signup')
        .send(fakeUser)
        .end(function (err, res) {
          token1 = res.body.token;
          expect(201);
          done();
        });
    });

    it('should login', (done) => {
      request
        .post('/login')
        .send({ email: fakeUser.email, password: fakeUser.password})
        .query(token1)
        .expect(201)
        .end((err, res) => {
          console.log(res.body);
          done();
        });
    });

    it('should create new user2', (done) => {
      request
        .post('/signup')
        .send(fakeUser2)
        .end(function (err, res) {
          id2 = res.body._id;
          expect(201);
          done();
        });
    });

    it('user1 should follow user2', (done) => {
      request
        .post(`/${id2}/follow`)
        .set({ authorization: token1 })
        .expect(200)
        .end((err, res) => {
          done();
        });
    });

    it('should update user info', (done) => {
      done();
    });

  });
}
