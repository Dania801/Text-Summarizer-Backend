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
let mocks = require('./models_mock.js');

import User from '../src/modules/users/user.model';


before('Connecting to DB', function(done) {
  mongoose.connect('mongodb://localhost:27017/supreme-posts-test');
  mongoose.connection
    .once('open', () => {
      console.log('connected to mongoDB');
      mongoose.connection.collections.users.drop();
      done();
    })
    .on('error', err => {
      throw err;
    });
});

routes.testRoutes();
models.testModels();
mocks.mockDB();
