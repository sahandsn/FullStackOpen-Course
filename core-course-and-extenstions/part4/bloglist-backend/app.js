const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const config = require('./utils/config');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const middleware = require('./utils/middleware');
const { info, error } = require('./utils/logger');
const testRouter = require('./controllers/test');

const app = express();

mongoose.set('strictQuery', false);

info(`connecting to ${config.MONGODB_URI}`);

mongoose.connect(config.MONGODB_URI)
  .then(() => info('connected to mongodb'))
  .catch((err) => error(`did not connect to mongodb: ${err.message}`));

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.getTokenFrom);

morgan.token('content', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] -> :response-time ms <- :content'));

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
  app.use('/api/test', testRouter);
}

app.use(middleware.unknownEndpont);
app.use(middleware.errorHandler);

module.exports = app;
