const express = require('express');
const bodyParser = require('body-parser');
const findUser = require('../lib/find-user');

const createTokenRoute = (req, res) => {
  const credentials = req.body;
  const user = findUser.byCredentials(credentials);
  if (user) {
    const token = `I am user ${user.id}`;
    res.status(201);
    res.send(token);
  } else {
    res.sendStatus(422);
  }
}

const tokensRouter = express.Router();

tokensRouter.post('/', bodyParser.json(), createTokenRoute)

module.exports = tokensRouter;
