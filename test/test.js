var request = require('supertest');
var moment = require('moment');

describe('GET /', function(){
  it('respond with json', function(done){
    request('http://localhost:8080')
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })
  it('repsond with 200 status', function(done){
    request('http://localhost:8080')
      .get('/')
      .expect(200, done);
  })
  it('repsond with world', function(done){
    request('http://localhost:8080')
      .get('/')
      .expect('{"message":"This is the borderly api"}', done);
  })
})

describe('GET /laws', function(){
  it('respond with json', function(done){
    request('http://localhost:8080')
      .get('/laws')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })
  it('repsond with 200 status', function(done){
    request('http://localhost:8080')
      .get('/laws')
      .expect(200, done);
  })
})

describe('GET /laws/:name', function(){
  it('respond with json', function(done){
    request('http://localhost:8080')
      .get('/laws/ca')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })
  it('repsond with 200 status', function(done){
    request('http://localhost:8080')
      .get('/laws/ca')
      .expect(200, done);
  })
})
