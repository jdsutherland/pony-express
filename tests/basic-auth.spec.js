const request = require('supertest')
const { app, server } = require('../index')
const basicAuth = require('../lib/basic-auth');
const users = require('../fixtures/users');

afterAll(async () => {
  server.close()
});

describe('basic auth', () => {
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

