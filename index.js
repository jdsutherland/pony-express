const express = require('express');
const path = require('path');
const compress = require('compression');
const serveStatic = require('serve-static');
const usersRouter = require('./routes/users');
const emailsRouter = require('./routes/emails');
const uploadsRouter = require('./routes/uploads');
const logger = require('./lib/logger');
const basicAuth = require('./lib/basic-auth');
const app = express();

const routeNotFound = (req, res) => res.end(`You asked for ${req.method} ${req.url}`)

app.use(logger);
app.use(compress());
app.use(serveStatic(path.join(__dirname, 'public')));
app.use(basicAuth);
app.use('/uploads', uploadsRouter, serveStatic(path.join(__dirname, 'uploads')));
app.use('/users', usersRouter);
app.use('/emails', emailsRouter);
app.use(routeNotFound);

const server = app.listen(3000);

module.exports = { app, server }
