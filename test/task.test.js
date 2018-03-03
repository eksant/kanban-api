const chai = require('chai');
const chaiHttp = require('chai-http');
const App = require('../app');
chai.use(chaiHttp)
chai.should()
let id=""
let tokenuser=''
let idtask=""
let tokentask=""
let id2=""
let tokenuser2=''
describe('Test User',function(){
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
  it('create',function(done){
    chai.request(App)
      .post('/api/user')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({name: 'arief', email:'test2@mail.com', password:'123'})
      .end(function(err,result){
        id2=result.body._id
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
  it('signin2',function(done){
    chai.request(App)
      .post('/api/auth')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({email:'test2@mail.com', password:'123'})
      .end(function(err,result){
        tokenuser2=result.body.tokenuser
        result.status.should.equal(200)
        result.should.be.a('object')
        done()
      })
  }),
  it('All Task',function(done){
    chai.request(App)
      .get('/api/task')
      .set('tokenuser', tokenuser)
      .end(function(err,result){
        result.status.should.equal(200)
        result.should.be.a('object')
        done()
      })
  }),
  it('create task',function(done){
    chai.request(App)
      .post('/api/task')
      .set('content-type', 'application/x-www-form-urlencoded')
      .set('tokenuser', tokenuser)
      .send({name:'test', description:'testing'})
      .end(function(err,result){
        idtask=result.body._id
        result.status.should.equal(200)
        result.should.be.a('object')
        done()
      })
  }),
  it('find id task',function(done){
    chai.request(App)
      .get(`/api/task/${idtask}`)
      .set('content-type', 'application/x-www-form-urlencoded')
      .set('tokenuser', tokenuser)
      .end(function(err,result){
        tokentask=result.body.tokentask
        result.status.should.equal(200)
        result.should.be.a('object')
        done()
      })
  }),
  it('find task by id user',function(done){
    chai.request(App)
      .get(`/api/task/user/${id}`)
      .set('content-type', 'application/x-www-form-urlencoded')
      .set('tokenuser', tokenuser)
      .end(function(err,result){
        result.status.should.equal(200)
        result.should.be.a('object')
        done()
      })
  }),
  it('update By ID task',function(done){
    chai.request(App)
      .put(`/api/task/${idtask}`)
      .set('content-type', 'application/x-www-form-urlencoded')
      .set('tokenuser', tokenuser)
      .set('tokentask', tokentask)
      .send({name:'test', description:'testing2'})
      .end(function(err,result){
        result.status.should.equal(200)
        result.should.be.a('object')
        done()
      })
  }),
  it('invite userid By ID task',function(done){
    chai.request(App)
      .put(`/api/task/invite/${idtask}`)
      .set('content-type', 'application/x-www-form-urlencoded')
      .set('tokenuser', tokenuser)
      .set('tokentask', tokentask)
      .send({UserId:id2})
      .end(function(err,result){
        result.status.should.equal(200)
        result.should.be.a('object')
        done()
      })
  }),
  it('uninvite userid By ID task',function(done){
    chai.request(App)
      .put(`/api/task/uninvite/${idtask}`)
      .set('content-type', 'application/x-www-form-urlencoded')
      .set('tokenuser', tokenuser)
      .set('tokentask', tokentask)
      .send({UserId:id2})
      .end(function(err,result){
        result.status.should.equal(200)
        result.should.be.a('object')
        done()
      })
  }),
  it('Delete Task By ID',function(done){
    chai.request(App)
      .delete(`/api/task/${id}`)
      .set('tokenuser', tokenuser)
      .set('tokentask', tokentask)
      .end(function(err,result){
        result.status.should.equal(200)
        result.should.be.a('object')
        done()
      })
  }),
  it('Delete User By ID',function(done){
    chai.request(App)
      .delete(`/api/user/${id}`)
      .set('tokenuser', tokenuser)
      .end(function(err,result){
        result.status.should.equal(200)
        result.should.be.a('object')
        done()
      })
  }),
  it('Delete User By ID sample 2',function(done){
    chai.request(App)
      .delete(`/api/user/${id2}`)
      .set('tokenuser', tokenuser2)
      .end(function(err,result){
        result.status.should.equal(200)
        result.should.be.a('object')
        done()
      })
  })
})
