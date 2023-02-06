const { error } = require('./logger');

const unknownEndpont = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (err, req, res, next) => {
  error(err.message);
  next(err);
};

module.exports = { unknownEndpont, errorHandler };
