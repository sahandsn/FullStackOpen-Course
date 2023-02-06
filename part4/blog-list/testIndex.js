/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

// blog.js
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
const Blog = mongoose.model('Blog', blogSchema);
// was blog.js

// config.js
const {PORT} = process.env;
const MONGODB_URI = process.env.MONGODB_URI;
// was config.js

// logger.js
const info = (...params) => {
  console.log(params);
};
const error = (...params) => {
  console.error(params);
};
// was logger.js

// middleware.js
const unknownEndpont = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (err, req, res, next) => {
  error(err.message);
  next(err);
};
// was middleware.js

// app.js
const app = express();

mongoose.set('strictQuery', false);

info(`connecting to ${MONGODB_URI}`);

mongoose.connect(MONGODB_URI)
  .then(() => info('connected to mongodb'))
  .catch((err) => `did not connect to mongodb: ${error(err.message)}`);

app.use(cors());
// app.use(express.static('build'));
app.use(express.json());


morgan.token('content', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] -> :response-time ms <- :content'));

// blogsRouter
app.get('/api/blogs/', (request, response) => {
  console.log('geting all the blogs');
  Blog
    .find({})
    .then((blogs) => response.json(blogs));
});

app.post('/api/blogs/', (request, response) => {
  console.log('posting a blog');
  const blog = new Blog(request.body);
  blog
    .save()
    .then((result) => response.status(201).json(result));
});
// was blogsRouter

app.use(unknownEndpont);
app.use(errorHandler);
// was app.js

// index.js
app.listen(PORT, () => {
  info(`server running on port ${PORT}`);
});
// was index.js
