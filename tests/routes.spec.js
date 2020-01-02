const request = require('supertest')
const { app, server } = require('../index')

afterAll(async () => {
  server.close()
});

describe('various routes', () => {

  describe('uploads', () => {
    it('serves upload contents', (done) => {
      const res = request(app)
        .get('/uploads/emails.json')
        .expect('Content-Type', /json/)
        .expect(200, done)
    })
  });

})
