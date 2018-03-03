const chai = require('chai');
const chaiHttp = require('chai-http');
const App = require('../app');
chai.use(chaiHttp)
chai.should()
let id=""
let tokenuser=''
describe('Test User',function(){
  it('All User',function(done){
    chai.request(App)
      .get('/api/user')
      .end(function(err,result){
        result.status.should.equal(200)
        result.should.be.a('object')
        done()
      })
  }),
  it('create',function(done){
    chai.request(App)
      .post('/api/user')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({name: 'arief', email:'test@mail.com', password:'123'})
      .end(function(err,result){
        id=result.body._id
        result.status.should.equal(200)
        result.should.be.a('object')
        done()
      })
  }),
  it('Find By ID',function(done){
    chai.request(App)
      .get(`/api/user/${id}`)
      .end(function(err,result){
        result.status.should.equal(200)
        result.should.be.a('object')
        done()
      })
  }),
  it('signin',function(done){
    chai.request(App)
      .post('/api/auth')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({email:'test@mail.com', password:'123'})
      .end(function(err,result){
        tokenuser=result.body.tokenuser
        result.status.should.equal(200)
        result.should.be.a('object')
        done()
      })
  }),
  it('Update By ID',function(done){
    chai.request(App)
      .put(`/api/user/${id}`)
      .set('content-type', 'application/x-www-form-urlencoded')
      .set('tokenuser', tokenuser)
      .send({name: 'ariefmanda', password:'1234'})
      .end(function(err,result){
        result.status.should.equal(200)
        result.should.be.a('object')
        done()
      })
  }),
  it('Delete By ID',function(done){
    chai.request(App)
      .delete(`/api/user/${id}`)
      .set('tokenuser', tokenuser)
      .end(function(err,result){
        result.status.should.equal(200)
        result.should.be.a('object')
        done()
      })
  })
})
