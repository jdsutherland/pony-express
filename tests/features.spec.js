const request = require('supertest')
const sandbox = require('sinon').createSandbox();
let auth;
let app;
let server;
let emails;

describe('end-to-end', () => {
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

  describe('POST email w/ attachment then GET that attachment', () => {
    it('uses mimetype when serving static', (done) => {
      const res = request(app)
        .post('/emails')
        .attach('attachments', './fixtures/kitten-small.png')
        .expect(201)
        .then(res => {
          const email = res.body.attachments[0]
          jest.spyOn(emails, 'filter').mockReturnValue(email)
          return request(app)
            .get(email.url)
            .expect('Content-Type', /png/)
            .expect(200)
            .then(() => done())
        })
    })
  });

})
