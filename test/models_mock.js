let sinon = require('sinon');
let chai = require('chai');
let mongoose = require('mongoose');
let assert = require('assert');
let expect = chai.expect;
let faker = require('faker');
var request = require('supertest')('http://localhost:3000/api/v1/users');
let app = require('../src/index');
let models = require('./models_test.js');
let routes = require('./routes_test.js');

import User from '../src/modules/users/user.model';


export function mockDB() {
  describe.only('User Mocks', function() {

    faker.seed(99);
    const fakeUser = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      userName: faker.internet.userName()
    }

    it('Should create a new user', function(done) {
        const user = new User(fakeUser);
        const userMock = sinon.mock(user);
        const theUser = userMock.object;

        userMock
          .expects('save')
          .yields(null);

        theUser.save((err) => {
          userMock.verify();
          userMock.restore();
          expect(err).to.be.null;
          done();
        })
    });
  });
}
