const request = require('supertest')
const fs = require('fs');
const sandbox = require('sinon').createSandbox();
const ATTACHMENT = './fixtures/emails.json';
let auth;
let app;
let server;
let emails;

describe('emails endpoints', () => {
  beforeEach(() => {
    jest.resetModules();
    auth = require('../lib/require-auth');
    sandbox.stub(auth, 'requireAuth')
      .callsFake((req, res, next) => next())
    app = require('../index').app
    server = require('../index').server
    emails = require('../fixtures/emails');
  })

  afterEach(async () => {
    sandbox.restore();
    await server.close();
  })

  it('get should return a json 200', (done) => {
    const res = request(app)
      .get('/emails')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })

  it('post should save attachments', async (done) => {
    const res = await request(app)
      .post('/emails')
      .attach('attachments', ATTACHMENT)
      .expect(201)
      .then(res => {
        res.body.attachments.forEach(a => {
          expect(fs.existsSync(`./${a.url}`)).toBe(true);
          fs.unlinkSync(`./${a.url}`)
        })
        done()
      })
  })

  it('patch should update an existing email', async (done) => {
    const email = { id: 1, attachments: ['fake'] }
    const emailCopy = {...email}
    jest.spyOn(emails, 'find').mockReturnValue(email)
    const res = await request(app)
      .patch('/emails/1')
      .attach('attachments', ATTACHMENT)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual(email)
        expect(emailCopy).not.toEqual(email)
        done()
      })
  })

  it('delete should remove an existing email', async () => {
    const res = await request(app)
      .delete('/emails/1')
      .expect(204)
  })

})
