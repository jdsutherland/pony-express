const users = require('../fixtures/users');

const findUserByCredentials = ({username, password}) =>
  users.find(u => u.username === username && u.password === password)

exports.byCredentials = findUserByCredentials;
