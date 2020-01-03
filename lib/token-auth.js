const jwt = require('jsonwebtoken');
const users = require('../fixtures/users');

const signature = '1m_s3cure';

const tokenAuth = (findUserByToken) => (req, res, next) => {
  const header = req.headers.authorization || '';
  const [type, token] = header.split(' ');

  if (type === 'Bearer') {
    let payload;
    try {
      payload = jwt.verify(token, signature);
    } catch (err) {
      return res.sendStatus(401);
    }
    const user = findUserByToken(payload);
    if (user) {
      req.user = user;
    } else {
      return res.sendStatus(401);
    }
  }

  next();
};

module.exports = tokenAuth;