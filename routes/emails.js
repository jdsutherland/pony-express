const express = require('express');
const path = require('path');
const generateId = require('../lib/generate-id');
const emails = require('../fixtures/emails');
const bodyParser = require('body-parser');
const multer = require('multer');
const NotFound = require('../lib/not-found');
const auth = require('../lib/require-auth');

const upload = multer({ dest: path.join(__dirname, '../uploads') })

const getEmailsRoute = (req, res) => res.send(emails);

const getEmailRoute = (req, res) => {
  const email = emails.find(u => u.id === req.params.id)
  if (!email) throw new NotFound();
  res.send(email);
}

const createEmailRoute = async (req, res) => {
  const attachments = (req.files || []).map(f => {
    return { url: `/uploads/${f.filename}`, type: f.mimetype}
  })
  const newEmail = { ...req.body, id: generateId(), attachments }
  emails.push(newEmail);
  res.status(201);
  res.send(newEmail);
}

const updateEmailRoute = async (req, res) => {
  const newAttachments = (req.files || []).map(f => f.filename)
  const email = emails.find(e => e.id === req.params.id)
  req.body.attachments = [...(email.attachments || []), ...newAttachments]
  Object.assign(email, req.body)
  res.status(200);
  res.send(email);
}

const updateEmailPolicy = (req) => {
  const email = emails.find(e => e.id === req.params.id)
  const user = req.user;
  return user.id === email.from
}

const authorizedUpdateEmailRoute = (req, res, next) => {
  if (updateEmailPolicy(req)) {
    next();
  } else {
    res.sendStatus(403);
  }
}

const deleteEmailRoute = async (req, res) => {
  const idx = emails.findIndex(u => u.id === req.params.id);
  emails.splice(idx, 1);
  res.sendStatus(204);
}

const deleteEmailPolicy = (req) => {
  const email = emails.find(e => e.id === req.params.id)
  const user = req.user;
  return user.id === email.to
}

const authorizedDeleteEmailRoute = (req, res, next) => {
  if (deleteEmailPolicy(req)) {
    next();
  } else {
    res.sendStatus(403);
  }
}

const emailsRouter = express.Router();
emailsRouter.use(auth.requireAuth);

emailsRouter.route('/')
  .get(getEmailsRoute)
  .post(
    bodyParser.json(),
    bodyParser.urlencoded({extended: true}),
    upload.array('attachments'),
    createEmailRoute
  );

emailsRouter.route('/:id')
  .get(getEmailRoute)
  .patch(
    authorizedUpdateEmailRoute,
    bodyParser.json(),
    bodyParser.urlencoded({extended: true}),
    upload.array('attachments'),
    updateEmailRoute
  )
  .delete(
    authorizedDeleteEmailRoute,
    deleteEmailRoute
  );

module.exports = emailsRouter;
