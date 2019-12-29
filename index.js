const express = require('express');
const usersRouter = require('./routes/users');
const emailsRouter = require('./routes/emails');
const logger = require('./lib/logger');
const app = express();

const routeNotFound = (req, res) => res.end(`You asked for ${req.method} ${req.url}`)

app.use(logger);
app.use('/users', usersRouter);
app.use('/emails', emailsRouter);
app.use(routeNotFound); // FALLBACK

const server = app.listen(3000);

module.exports = {
  app,
  server
}
