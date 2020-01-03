const express = require('express');
const auth = require('../lib/require-auth');
const users = require('../fixtures/users');

const getUsersRoute = (req, res) => {
  res.send(users);
}

const getUserRoute = (req, res) => {
  const user = users.find(u => u.id === req.params.id)
  res.send(user);
}

const usersRouter = express.Router();
usersRouter.use(auth.requireAuth);

usersRouter.get('/', getUsersRoute)
usersRouter.get('/:id', getUserRoute)

module.exports = usersRouter;
