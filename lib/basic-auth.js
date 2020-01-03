const basicAuth = (findUserByCredentials) => (req, res, next) => {
  const header = req.headers.authorization || '';
  const [type, payload] = header.split(' ');

  if (type === 'Basic') {
    let credentials = Buffer.from(payload, 'base64').toString('ascii');
    let [username, password] = credentials.split(':');

    const user = findUserByCredentials({ username, password });
    if (user) {
      req.user = user;
    } else {
      return res.sendStatus(401);
    }
  }

  next();
};

module.exports = basicAuth;
