const request = require('supertest')
const { app, server } = require('../index')

afterAll(async () => {
  server.close()
});

describe('homepage', () => {

  it('should return html 200', (done) => {
    const res = request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200, done)
  })

})
