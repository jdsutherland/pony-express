const http = require('http');

const users = require('./fixtures/users');
const emails = require('./fixtures/emails');

http.createServer((req, res) => {
  const route = `${req.method} ${req.url}`;

  if (route === 'GET /users') {
    res.end(JSON.stringify(users))
  } else if (route === 'GET /emails') {
    res.end(JSON.stringify(emails))
  }
  res.end(`You asked for ${route}`)

}).listen(3000);
