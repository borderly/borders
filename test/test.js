var request = require('supertest');
var app = require('../index');

describe('GET /', function(){
  it('respond with json', function(done){
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /html/)
      .expect(200, done);
  })
  it('repsond with 200 status', function(done){
    request(app)
      .get('/')
      .expect(200, done);
  })
})

describe('GET /create', function(){
  it('respond with html', function(done){
    request(app)
      .get('/create')
      .set('Accept', 'text/html')
      .expect('Content-Type', /html/)
      .expect(200, done);
  })
  it('repsond with 200 status', function(done){
    request(app)
      .get('/create')
      .expect(200, done);
  })
})

describe('GET /laws', function(){
  it('respond with json', function(done){
    request(app)
      .get('/api/laws')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })
  it('repsond with 200 status', function(done){
    request(app)
      .get('/api/laws')
      .expect(200, done);
  })
})

describe('GET /laws/:name', function(){
  it('respond with json', function(done){
    request(app)
      .get('/api/laws/ca')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })
  it('repsond with 200 status', function(done){
    request(app)
      .get('/api/laws/ca')
      .expect(200, done);
  })
})
