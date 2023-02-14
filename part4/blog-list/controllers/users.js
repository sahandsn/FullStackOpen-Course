require('express-async-errors');
const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (req, res) => {
  const { name, username, password } = req.body;
  if (!(username && password)) {
    res.status(400).json({ error: 'both username and password are required' });
    return;
  }
  if (password.length <= 2) {
    res.status(400).json({ error: 'password must be at least three characters' });
    return;
  }
  // if i checked for username length and uniqunes here as well,
  // to avoid getting error message from middleware,
  // then no need for its mongoose validator
  const saltRounds = 5;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = new User({
    username, name, passwordHash, blogs: [],
  });
  // if username is short or not unique, we will get a ValidationError
  const savedUser = await user.save();
  res.status(201).json(savedUser);
});

usersRouter.get('/', async (req, res) => {
  const usersArr = await User
    .find({})
    .populate('blogs', 'url title author id');
  res.json(usersArr);
});

module.exports = usersRouter;
