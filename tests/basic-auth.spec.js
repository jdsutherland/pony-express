const request = require('supertest')
const sandbox = require('sinon').createSandbox();
let auth;
let app;
let server;

describe('basic auth', () => {
  beforeEach(() => {
    jest.resetModules();
    auth = require('../lib/require-auth');
    sandbox.stub(auth, 'requireAuth')
      .callsFake((req, res, next) => next())
    app = require('../index').app
    server = require('../index').server
  })

  afterEach(async () => {
    sandbox.restore();
    await server.close();
  })

  it('does nothing without Authorization header', (done) => {
    const res = request(app)
      .get('/emails')
      .expect(200, done);
  });

  it('does nothing if given non Basic Authorization', (done) => {
    const res = request(app)
      .get('/emails')
      .auth('bob', 'WRONGPASS')
      .set('Authorization', 'Digest')
      .expect(200, done);
  });

  xit('sets req.user if credentials correct', (done) => {
    // TODO: apparently can't check req object using supertest
  });

  it('401 given wrong credentials', (done) => {
    const res = request(app)
      .get('/emails')
      .auth('bob', 'WRONGPASS')
      .expect(401, done);
  });
});

