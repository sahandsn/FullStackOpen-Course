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

blogsRouter.delete('/:id', async (req, res) => {
  const blogList = await Blog.find({});
  const idArr = blogList.map((blog) => blog.id);
  const { id } = req.params;
  if (!idArr.includes(id)) {
    res.status(404).json({ error: 'blog not found' });
    return;
  }
  // const deletedBlog = await Blog.findByIdAndRemove(id);
  await Blog.findByIdAndRemove(id);
  // console.log(deletedBlog.id);
  res.status(204).end();
});

blogsRouter.put('/:id', async (req, res) => {
  const blogList = await Blog.find({});
  const idArr = blogList.map((blog) => blog.id);
  const { id } = req.params;
  if (!idArr.includes(id)) {
    res.status(404).json({ error: 'blog not found' });
    return;
  }
  const newBlog = req.body;
  if (Object.keys(newBlog).length === 0) {
    res.status(400).json({ error: 'blog not changed' });
    return;
  }
  if (!Object.keys(newBlog).every((key) => Object.keys(idArr[0]).includes(key))) {
    res.status(400).json({ error: 'unspecified key' });
    return;
  }
  const response = await Blog.findByIdAndUpdate(id, newBlog, { new: true });
  res.json(response);
});

module.exports = blogsRouter;
