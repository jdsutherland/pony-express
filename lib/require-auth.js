const requireAuth = (req, res, next) => {
  const header = req.headers.authorization || '';
  const [type, payload] = header.split(' ');

  if (type === 'Basic') {
    if (req.user) {
      next();
    } else {
      res.sendStatus(401);
    }
  }
};

module.exports = { requireAuth }
