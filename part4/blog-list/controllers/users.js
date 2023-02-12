require('express-async-errors');
const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (req, res) => {
  const { name, username, password } = req.body;
  const saltRounds = 5;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = new User({
    username, name, passwordHash,
  });
  const savedUser = await user.save();
  res.status(201).json(savedUser);
});

usersRouter.get('/', async (req, res) => {
  const usersArr = await User.find({});
  res.json(usersArr);
});

module.exports = usersRouter;
