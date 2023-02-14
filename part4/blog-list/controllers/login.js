const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');
const { SECRETE } = require('../utils/config');

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const passwordCheck = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash);
  if (!(user && passwordCheck)) {
    res.status(401).json({ error: 'invalid username or password' });
    return;
  }
  const userForToken = {
    username: user.username,
    id: user.id,
  };
  const token = jwt.sign(userForToken, SECRETE);
  res.json({ token, ...userForToken });
});

module.exports = loginRouter;
