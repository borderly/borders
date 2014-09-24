var request = require('supertest');
var app = require('../index');

describe('GET /', function(){
  it('respond with json', function(done){
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })
  it('repsond with 200 status', function(done){
    request(app)
      .get('/')
      .expect(200, done);
  })
})

describe('GET /laws', function(){
  it('respond with json', function(done){
    request(app)
      .get('/laws')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })
  it('repsond with 200 status', function(done){
    request(app)
      .get('/laws')
      .expect(200, done);
  })
})

describe('GET /laws/:name', function(){
  it('respond with json', function(done){
    request(app)
      .get('/laws/ca')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })
  it('repsond with 200 status', function(done){
    request(app)
      .get('/laws/ca')
      .expect(200, done);
  })
})
