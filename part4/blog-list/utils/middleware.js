const { error } = require('./logger');

const unknownEndpont = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (err, req, res, next) => {
  error(err.message);
  if (err.name === 'ValidationError') {
    res.status(400).json({ error: 'username must be unique and at leat three characters' });
    return;
  }
  if (err.name === 'JsonWebTokenError') {
    res.status(400).json({ error: 'token invalid' });
    return;
  }
  if (err.name === 'Error') {
    res.status(400).json({ error: 'malformated password - must be a string' });
    return;
  }
  next(err);
};

const getTokenFrom = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    req.token = authorization.replace('Bearer ', '');
  } else {
    req.token = null;
  }
  next();
};

module.exports = { unknownEndpont, errorHandler, getTokenFrom };
