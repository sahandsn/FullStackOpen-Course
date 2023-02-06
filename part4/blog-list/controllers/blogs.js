const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', (request, response) => {
  // console.log('geting all the blogs');
  Blog
    .find({})
    .then((blogs) => response.json(blogs));
});

blogsRouter.post('/', (request, response) => {
  // console.log('posting a blog');
  const { body } = request;
  // console.log(body);
  const blog = new Blog(body);
  // console.log(blog);
  blog
    .save()
    .then((result) => response.status(201).json(result));
});

module.exports = blogsRouter;
