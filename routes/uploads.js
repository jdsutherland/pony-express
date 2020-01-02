const express = require('express');
const emails = require('../fixtures/emails');
const NotFound = require('../lib/not-found');

const getUploadRoute = (req, res, next) => {
  const id = req.url.match("^/([a-z0-9]+)$");
  const matchUrl = (obj) => obj.url.match("/uploads/([a-z0-9]+)")[1] === id[1]
  const email = emails.filter(email => email.attachments.some(matchUrl))
  if (email.length === 0) { throw new NotFound(); }

  res.setHeader('Content-Type', email.type)
  next()
}

const uploadsRouter = express.Router();

uploadsRouter.get('/:id', getUploadRoute)

module.exports = uploadsRouter;
