/* eslint-disable no-prototype-builtins */
require('express-async-errors');
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  // console.log('geting all the blogs');
  const blogArr = await Blog.find({});
  response.json(blogArr);
  // Blog
  //   .find({})
  //   .then((blogs) => response.json(blogs));
});

blogsRouter.post('/', async (request, response) => {
  // console.log('posting a blog');
  const { body } = request;
  // console.log(body);
  if (body.likes === undefined) {
    body.likes = 0;
  }
  if (body.author === undefined || body.url === undefined) {
    response.status(400).json({ error: 'misssing author or url' });
    return;
  }
  const blog = new Blog(body);
  // console.log(blog);
  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
  // blog
  //   .save()
  //   .then((result) => response.status(201).json(result));
});

module.exports = blogsRouter;
