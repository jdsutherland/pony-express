const http = require('http');
const express = require('express');

const users = require('./fixtures/users');
const emails = require('./fixtures/emails');
const app = express();

const getUsersRoute = (req, res) => res.send(users);
const getEmailsRoute = (req, res) => res.send(emails);

const ROUTES = new Map([
  ['GET /users', getUsersRoute],
  ['GET /emails', getEmailsRoute],
]);

app.use((req, res) => {
  const route = `${req.method} ${req.url}`;
  const handler = ROUTES.get(route) || res.end(`You asked for ${route}`)

  handler(req, res);
})

app.listen(3000);
