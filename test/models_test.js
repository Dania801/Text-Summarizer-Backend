
let sinon = require('sinon');
let chai = require('chai');
let mongoose = require('mongoose');
let assert = require('assert');
let expect = chai.expect;
var request = require('supertest')('http://localhost:3000/api/v1/users');
let app = require('../src/index');

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

describe('Testing User Model', function() {

  let user;

  before('Creates a new user to test it', function(done) {
    user = new User({
      firstName: 'Dania',
      lastName: 'Refaie',
      email: 'test1234@gmail.com',
      password: 'Helloworld123',
      userName: 'Dani'
    });
    user.save().then(() => {
      assert(!user.isNew);
      done();
    });
  });

  it('Modifies the created user', function(done) {
    User.findOneAndUpdate({ _id: user._id }, { lastName: 'Ref' }, (err, record) => {
      expect(record).to.not.be.undefined;
      expect(record).to.be.an('object');
      expect(record._id).to.not.be.undefined;
      expect(record.userName).to.not.be.undefined;
      expect(record.lastName).to.not.be.undefined;
      expect(record.email).to.not.be.undefined;
      expect(record.password).to.not.be.undefined;
      expect(record.userName).to.not.be.undefined;
      expect(record.email).to.match(/^.+@.+\..+$/);
      expect(record.password).to.be.a('string');
      expect(record.firstName).to.be.a('string');
      expect(record.lastName).to.be.a('string');
      expect(record.userName).to.be.a('string');
      expect(record.email).to.be.a('string');
      expect(err).to.be.null;
      done();
    });
  });

  it('Finds the created user', function(done) {
    User.findOne({ _id: user._id }, (err, record) => {
      expect(record).to.not.be.undefined;
      expect(record).to.be.an('object');
      expect(record._id).to.not.be.undefined;
      expect(record.userName).to.not.be.undefined;
      expect(record.lastName).to.not.be.undefined;
      expect(record.email).to.not.be.undefined;
      expect(record.password).to.not.be.undefined;
      expect(record.userName).to.not.be.undefined;
      expect(record.email).to.match(/^.+@.+\..+$/);
      expect(record.password).to.be.a('string');
      expect(record.firstName).to.be.a('string');
      expect(record.lastName).to.be.a('string');
      expect(record.userName).to.be.a('string');
      expect(record.email).to.be.a('string');
      expect(err).to.be.null;
      done();
    });
  });

  it('Deletes the created user', function(done) {
    User.findOneAndRemove({ _id: user._id }, (err, record) => {
      expect(record).to.not.be.undefined;
      expect(record).to.be.an('object');
      expect(err).to.be.null;
      done();
    });
  });

  it('Missing userName', function(done) {
    user = new User({
      firstName: 'Lukas',
      lastName: 'Podoloski',
      email: 'poldi1234@gmail.com',
      password: 'Helloworld123',
      //userName: 'Poldi'
    });
    user.save().then(() => {
      assert(user.isNew);
    });
    done();
  });

  it('Invalid email', function(done) {
    user = new User({
      firstName: 'Lukas',
      lastName: 'Podoloski',
      email: 'poldi1234@.com',
      password: 'Helloworld123',
      userName: 'Poldi'
    });
    user.save().then(() => {
      assert(user.isNew);
    });
    done();
  });

  it('Weak password', function(done) {
    user = new User({
      firstName: 'Lukas',
      lastName: 'Podoloski',
      email: 'poldi1234@gmail.com',
      password: 'aaaaa123',
      userName: 'Poldi'
    });
    user.save().then(() => {
      assert(user.isNew);
    });
    done();
  });

  it('Short password', function(done) {
    user = new User({
      firstName: 'Lukas',
      lastName: 'Podoloski',
      email: 'poldi1234@gmail.com',
      password: 'aa123',
      userName: 'Poldi'
    });
    user.save().then(() => {
      assert(user.isNew);
    });
    done();
  });
});


describe.only('Testing User routes', function() {

  let user1;
  let user2;
  let token1;
  let id2;
  let cookies;

  it('should create new user', (done) => {
    user1 = {
      email: 'owaysx123@gmail.com',
      password: 'HelloWorld123',
      firstName: 'Oways',
      lastName: 'Refaie',
      userName: 'Ozyx'
    }
    request
      .post('/signup')
      .send(user1)
      .end(function (err, res) {
        token1 = res.body.token;
        expect(201);
        done();
      });
  });

  it('should login', (done) => {
    request
      .post('/login')
      .send({ email: 'owaysx123@gmail.com', password: 'HelloWorld123'})
      .query(token1)
      .expect(201)
      .end((err, res) => {
        console.log(res.body);
        done();
      });
  });

  it('should create new user2', (done) => {
    user2 = {
      firstName: 'Daniax',
      lastName: 'Refaie',
      email: 'test1234x@gmail.com',
      password: 'Helloworld123',
      userName: 'Danix'
    }
    request
      .post('/signup')
      .send(user2)
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

});
