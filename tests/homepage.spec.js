const request = require('supertest')
const { app, server } = require('../index')

describe('homepage', () => {
  afterEach(async () => {
    await server.close()
  });

  it('should return html 200', (done) => {
    const res = request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200, done)
  })

})
