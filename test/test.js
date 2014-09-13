var request = require('supertest');
var moment = require('moment');

describe('GET /', function(){
setTimeout('500');
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
      .expect('"hello world"', done);
  })
})

describe('GET /users', function(){
setTimeout('500');
  it('respond with json', function(done){
    request('http://localhost:8080')
      .get('/hello/alex')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })
  it('repsond with 200 status', function(done){
    request('http://localhost:8080')
      .get('/hello/alex')
      .expect(200, done);
  })
  it('repsond with name "alex"', function(done){
    request('http://localhost:8080')
      .get('/hello/alex')
      .expect('{"hello":"alex"}', done);
  })
  it('repsond with name "david"', function(done){
    request('http://localhost:8080')
      .get('/hello/david')
      .expect('{"hello":"david"}', done);
  })
})

describe('GET /date', function() {
setTimeout('500');
  it('respond with json', function(done){
    request('http://localhost:8080')
      .get('/date')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })
  it('repsond with 200 status', function(done){
    request('http://localhost:8080')
      .get('/date')
      .expect(200, done);
  })
  it('respond with current date', function(done){
    request('http://localhost:8080')
      .get('/date')
      .expect('{"date":"'+moment().format('MMMM Do YYYY, h:mm:ss a')+'"}', done);
  })
})
