const request = require('supertest')
const fs = require('fs');
const { app, server } = require('../index')
const emails = require('../fixtures/emails');

afterAll(async () => {
  server.close()
});

describe('emails endpoints', () => {

  it('get should return a json 200', (done) => {
    const res = request(app)
      .get('/emails')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })

  it('post should save attachments', async (done) => {
    const attachment = './fixtures/emails.json';
    const res = await request(app)
      .post('/emails')
      .attach('attachments', attachment)
      .expect(201)
      .then(res => {
        res.body.attachments.forEach(f => {
          expect(fs.existsSync(`./uploads/${f}`)).toBe(true);
          fs.unlinkSync(`./uploads/${f}`)
        })
        done()
      })
  })

  it('patch should update an existing email', async (done) => {
    const expected = { name: 'Bob' }
    jest.spyOn(emails, 'find').mockReturnValue(expected)
    const res = await request(app)
      .patch('/emails/1')
      .send(expected)
      .expect(200)
      .expect(res => {
        expect(res.body).toEqual(expected)
        done()
      })
  })

  it('delete should remove an existing email', async (done) => {
    const res = await request(app)
      .delete('/emails/1')
      .expect(204)
      .expect(_ => done())
  })

})
