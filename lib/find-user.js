const users = require('../fixtures/users');

const findUserByCredentials = ({username, password}) =>
  users.find(u => u.username === username && u.password === password)

exports.byCredentials = findUserByCredentials;

const findUserByToken = ({ userId }) => users.find(u => u.id === userId)
exports.byToken= findUserByToken;
