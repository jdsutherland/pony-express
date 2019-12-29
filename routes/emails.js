const express = require('express');
const generateId = require('../lib/generate-id');
const emails = require('../fixtures/emails');
const jsonBodyParser = require('../lib/json-body-parser');
const NotFound = require('../lib/not-found');

const getEmailsRoute = (req, res) => res.send(emails);

const getEmailRoute = (req, res) => {
  const email = emails.find(u => u.id === req.params.id)
  if (!email) throw new NotFound();
  res.send(email);
}

const createEmailRoute = async (req, res) => {
  const newEmail = { ...req.body, id: generateId() }
  emails.push(newEmail);
  res.status(201);
  res.send(newEmail);
}

const updateEmailRoute = async (req, res) => {
  let email = emails.find(u => u.id === req.params.id)
  Object.assign(email, req.body)
  res.status(200);
  res.send(email);
}

const deleteEmailRoute = async (req, res) => {
  const idx = emails.findIndex(u => u.id === req.params.id)
  emails.splice(idx, 1)
  res.sendStatus(204);
}

const emailsRouter = express.Router();

emailsRouter.route('/')
  .get(getEmailsRoute)
  .post(jsonBodyParser, createEmailRoute);

emailsRouter.route('/:id')
  .get(getEmailRoute)
  .patch(jsonBodyParser, updateEmailRoute)
  .delete(deleteEmailRoute);

module.exports = emailsRouter;
