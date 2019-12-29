const express = require('express');
const readBody = require('../lib/read-body');
const generateId = require('../lib/generate-id');
const emails = require('../fixtures/emails');

const getEmailsRoute = (req, res) => res.send(emails);

const getEmailRoute = (req, res) => {
  const email = emails.find(u => u.id === req.params.id)
  res.send(email);
}

const createEmailRoute = async (req, res) => {
  const body = await readBody(req);

  const newEmail = { ...JSON.parse(body), id: generateId() }
  emails.push(newEmail);
  res.status(201);
  res.send(newEmail);
}

const updateEmailRoute = async (req, res) => {
  const body = await readBody(req);
  let email = emails.find(u => u.id === req.params.id)
  Object.assign(email, JSON.parse(body))
  res.status(200);
  res.send(email);
}

const emailsRouter = express.Router();

emailsRouter.get('/', getEmailsRoute)
emailsRouter.get('/:id', getEmailRoute)
emailsRouter.post('/', createEmailRoute)
emailsRouter.patch('/:id', updateEmailRoute)

module.exports = emailsRouter;
