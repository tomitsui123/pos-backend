const expect = require('chai').expect
const _ = require('lodash')
const supertest = require('supertest')
const app = require('../bin/www')

const request = supertest(app)

const testingId = '5d7663cb50717de3f30a9226'

describe('GET /api/orders', () => {
  it('returns a list of orders containing all keys', done => {
    request.get('/api/order')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.be.an('array')
        res.body.map(order => {
          expect(order).to.have.all
            .keys(['telephone', 'priority', 'paid', 'remarks', 
              'deleted', 'createdAt', 'updatedAt', '_id', 
              'itemList', '__v', 'log'])
        })
        done()
      })
  })
})

describe('GET /api/order/id::id', () => {
  it('returns an array of order by correct id', done => {
    request.get(`/api/order/id:${testingId}`)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.be.an('array')
        expect(res.body[0]).to.have.all
          .keys(['telephone', 'priority', 'paid', 'remarks',
            'deleted', 'createdAt', 'updatedAt', '_id',
            'itemList', '__v', 'log'])
        done()
      })
  })
  it('returns an empty array by incorrect id', done => {
    request.get(`/api/order/id:5d6e2b64d41fadf30fa6b961`)
      .expect(200)
      .end((_err, res) => {
        expect(res.body).to.be.an('array')
        expect(res.body.length).to.equal(0)
        done()
      })
  })
  it('returns error by invalid string', done => {
    request.get(`/api/order/id:ahsdfijop`)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.be.an('array')
        expect(res.body.length).to.equal(0)
        done()
      })
  })
})

describe('GET /api/order/:date', () => {
  it('returns an array of order by correct date', done => {
    request.get(`/api/order/date:20190909`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.be.an('array')
        res.body.map(order => {
          expect(order).to.have.all
            .keys(['telephone', 'priority', 'paid', 'remarks', 'deleted', 'createdAt', 'updatedAt', '_id', 'itemList', '__v'])
        })
        done()
      })
  })
  it('returns an empty array by date which has no record on that date', done => {
    request.get('/api/order/date:20180827')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.be.an('array')
        expect(res.body.length).to.equal(0)
        done()
      })
  })
  it('returns error by invalid date', done => {
    request.get('/api/order/date:aisfjp')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.be.an('array')
        expect(res.body.length).to.equal(0)
        done()
      })
  })
})

describe('POST /api/order/', () => {
  it('creates new order without itemList and phone number successfully', done => {
    let createdId = ''
    request.post('/api/order')
      .send()
      .expect(200)
      .end(async (_err, res) => {
        expect(res.body).to.have.all.keys(['message', 'id'])
        createdId = res.body.id
        const createdObject = await request.get(`/api/order/id:${createdId}`)
        expect(createdObject.body[0]).to.have.all
            .keys(['telephone', 'priority', 'paid', 'remarks', 
              'deleted', 'createdAt', 'updatedAt', '_id', 
              'itemList', '__v', 'log'])
        return done()
      })
  })
  it('creates new order with itemList but no telephone successfully', done => {
    request.post('/api/order')
      .send({
        itemList: [
            {
                item: 'beef',
                price: 13,
                amount: 3
            }
        ]
      })
      .expect(200)
      .end((err, res) => {
        console.log(res.body)
        expect(res.body).to.have.all.keys(['message', 'id'])
        createdId = res.body.id
        request.delete(`/api/order/${createdId}`)
          .expect(200)
          .end((err, res) => {
            done()
          })
      })
  })
  it('creates new order with itemList and telephone successfully', done => {
    request.post('/api/order')
      .send({
        telephone: 99999999,
        itemList: [
            {
                item: 'beef',
                price: 13,
                amount: 3
            }
        ]
      })
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.all.keys(['message', 'id'])
        createdId = res.body.id
        request.delete(`/api/order/${createdId}`)
          .expect(200)
          .end((err, res) => {
            done()
          })
      })
  })
  it('creates new order with itemList fail', done => {
    request.post('/api/order')
    .send({
      itemList: [
          {
              item1: 'beef',
              price: 13,
              amount: 3
          }
      ]
    })
    .expect(500)
    .end(async (err, res) => {
      expect(res.body).to.have.all.keys(['message'])
      done()
    })
  })
})

describe('PUT /api/order/:id', () => {
  it('updates order with valid content and correct id', done => {
    request.get(`/api/order/id:${testingId}`)
      .end((err, res1) => {
        const beforeLogNum = res1.body[0].log.length
        const beforeTelephone = res1.body[0].telephone
        const editAPI = `/api/order/${testingId}`
        return request.put(editAPI)
          .send({
            telephone: 11111111
          })
          .end(async (err, res2) => {
            // test
            const output = await request.get(`/api/order/id:${res2.body.id}`)
            const afterTelephone = output.body[0].telephone
            const afterLogNum = output.body[0].log.length
            console.log(afterLogNum, beforeLogNum)
            expect(afterLogNum).to.equal(beforeLogNum + 1)
            expect(afterTelephone).to.not.equal(beforeTelephone)
            // revert data
            await request.put(editAPI)
              .expect(200)
              .send({
                telephone: beforeTelephone
              })
            return done()
          })
      })
  })
  it('updates order with valid content and incorrect id (fail)', done => {
    const updatedWrongId = _.shuffle(testingId).join('')
    const editAPI = `/api/order/${updatedWrongId}`
    request.put(editAPI)
      .send({
        telephone: 88888888
      })
      .expect(500)
      .end(async (err, res) => {
        if(err) return done(err)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.all.keys(['status', 'message'])
        return done()
      })
  })
  it('updates order with invalid content and correct id (fail)',  done => {
    request.put(`/api/order/${testingId}`)
      .send({
        telephone2: 88888888
      })
      .expect(500)
      .end((_err, res) => {
        console.log(res.body)
        expect(res.body.message.includes('key')).to.be.true
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.all.keys(['status', 'message'])
        done()
      })
  })
  it('updates order with invalid content and incorrect id', done => {
    const updatedWrongId = _.shuffle(testingId).join('')
    const editAPI = `/api/order/${updatedWrongId}`
    request.put(editAPI)
      .send({
        telephone1: 88888888
      })
      .expect(500)
      .end(async (err, res) => {
        if(err) return done(err)
        expect(res.body.message.includes('key')).to.be.true
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.all.keys(['status', 'message'])
        return done()
      })
  })
})

describe('DELETE /api/order/:id', () => {
  it('delete order with correct id (success)', done => {
    request.delete(`/api/order/${testingId}`)
      .end(async (err, res) => {
        if (err) return  done(err)
        expect(res.body.message.includes('deleted')).to.be.true
        await request.put(`/api/order/${testingId}`)
          .send({
            deletedAt: null,
            deleted: false
          })
        return done()
      })
  })
  it('delete order with incorrect id (fail)', done => {
    const updatedWrongId = _.shuffle(testingId).join('')
    console.log(updatedWrongId)
    request.delete(`/api/order/${updatedWrongId}`)
      .expect(500)
      .end(async (err, res) => {
        if (err) return  done(err)
        expect(res.body.message.includes('cannot be found')).to.be.true
        expect(res.body).to.have.all.keys(['status', 'message'])
        return done()
      })
  })
  it('delete deleted order with correct id (fail)', done => {
    request.delete(`/api/order/${testingId}`)
    .expect(500)
    .end(async (err, res) => {
      if (err) return  done(err)
      expect(res.body.message.includes('has been deleted')).to.be.true
      expect(res.body).to.have.all.keys(['status', 'message'])
      return done()
    })
  })
})