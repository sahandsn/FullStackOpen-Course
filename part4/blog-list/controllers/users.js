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
  const saltRounds = 5;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = new User({
    username, name, passwordHash,
  });
  // if username is short or not unique, we will get a ValidationError
  const savedUser = await user.save();
  res.status(201).json(savedUser);
});

usersRouter.get('/', async (req, res) => {
  const usersArr = await User.find({});
  res.json(usersArr);
});

module.exports = usersRouter;
