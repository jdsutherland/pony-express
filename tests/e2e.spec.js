const request = require('supertest')
const { app, server } = require('../index')
const emails = require('../fixtures/emails');

afterAll(async () => {
  server.close()
});

describe('end-to-end', () => {

  describe('upload email w/ jpg attachment', () => {
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
