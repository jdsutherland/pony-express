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
    const email = { id: 1, attachments: ['fake'] }
    const emailCopy = {...email}
    const attachment = './fixtures/emails.json';
    jest.spyOn(emails, 'find').mockReturnValue(email)
    const res = await request(app)
      .patch('/emails/1')
      .attach('attachments', "./fixtures/emails.json")
      .expect(200)
      .expect(res => {
        expect(res.body).toEqual(email)
        expect(emailCopy).not.toEqual(email)
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
