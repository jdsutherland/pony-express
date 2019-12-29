const http = require('http');
const express = require('express');

const users = require('./fixtures/users');
const emails = require('./fixtures/emails');
const app = express();

const getUsersRoute = (req, res) => {
  res.send(users);
}
const usersRouter = express.Router();
usersRouter.get('/users', getUsersRoute)
usersRouter.get('/users/:id', getUsersRoute)

const getEmailsRoute = (req, res) => res.send(emails);
const emailsRouter = express.Router();
emailsRouter.get('/emails', getEmailsRoute)

const routeNotFound = (req, res) => res.end(`You asked for ${req.method} ${req.url}`)

app.use(usersRouter);
app.use(emailsRouter);
app.use(routeNotFound); // FALLBACK

app.listen(3000);
