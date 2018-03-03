const chai = require('chai');
const chaiHttp = require('chai-http');
const App = require('../app');
chai.use(chaiHttp)
chai.should()
let id=""
let tokenuser=''
let idtask=""
let tokentask=""
let idcategory=""
let idmillestone=""
let idpost=""
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
  it('create category',function(done){
    chai.request(App)
      .post('/api/category')
      .set('content-type', 'application/x-www-form-urlencoded')
      .set('tokenuser', tokenuser)
      .set('tokentask', tokentask)
      .send({name:'test'})
      .end(function(err,result){
        idcategory=result.body._id
        result.status.should.equal(200)
        result.should.be.a('object')
        done()
      })
  }),
  it('create Millestone',function(done){
    chai.request(App)
      .post('/api/millestone')
      .set('content-type', 'application/x-www-form-urlencoded')
      .set('tokenuser', tokenuser)
      .set('tokentask', tokentask)
      .send({
        name: 'test',
        CategoryId: idcategory,
        description: 'testing',
        })
      .end(function(err,result){
        idmillestone=result.body._id
        result.status.should.equal(200)
        result.should.be.a('object')
        done()
      })
  }),
  it('All post',function(done){
    chai.request(App)
      .get('/api/post')
      .set('tokenuser', tokenuser)
      .set('tokentask', tokentask)
      .end(function(err,result){
        result.status.should.equal(200)
        result.should.be.a('object')
        done()
      })
  }),
  it('create post',function(done){
    chai.request(App)
      .post('/api/post')
      .set('content-type', 'application/x-www-form-urlencoded')
      .set('tokenuser', tokenuser)
      .set('tokentask', tokentask)
      .send({
        post:'test',
        MillestoneId: idmillestone,
        description:'testing'
        })
      .end(function(err,result){
        idpost=result.body._id
        result.status.should.equal(200)
        result.should.be.a('object')
        done()
      })
  }),
  it('find id post',function(done){
    chai.request(App)
      .get(`/api/post/${idpost}`)
      .set('tokenuser', tokenuser)
      .set('tokentask', tokentask)
      .end(function(err,result){
        result.status.should.equal(200)
        result.should.be.a('object')
        done()
      })
  }),
  it('update By ID post',function(done){
    chai.request(App)
      .put(`/api/post/${idpost}`)
      .set('content-type', 'application/x-www-form-urlencoded')
      .set('tokenuser', tokenuser)
      .set('tokentask', tokentask)
      .send({post:'testing',description:'testing update'})
      .end(function(err,result){
        result.status.should.equal(200)
        result.should.be.a('object')
        done()
      })
  }),
  it('Delete post By ID',function(done){
    chai.request(App)
      .delete(`/api/post/${idpost}`)
      .set('tokenuser', tokenuser)
      .set('tokentask', tokentask)
      .end(function(err,result){
        result.status.should.equal(200)
        result.should.be.a('object')
        done()
      })
  }),
  it('Delete Millestone By ID',function(done){
    chai.request(App)
      .delete(`/api/millestone/${idmillestone}`)
      .set('tokenuser', tokenuser)
      .set('tokentask', tokentask)
      .end(function(err,result){
        result.status.should.equal(200)
        result.should.be.a('object')
        done()
      })
  }),
  it('Delete Category By ID',function(done){
    chai.request(App)
      .delete(`/api/category/${idcategory}`)
      .set('tokenuser', tokenuser)
      .set('tokentask', tokentask)
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
  })
})
