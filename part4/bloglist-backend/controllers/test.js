require('express-async-errors');
const testRouter = require('express').Router();
// const middleware = require('../utils/middleware');
const Blog = require('../models/blog');
const User = require('../models/user');

testRouter.post('/reset', async (req, res) => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  res.status(204).end();
});

module.exports = testRouter;
