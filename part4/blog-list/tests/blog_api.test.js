const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const { initialBlogs } = require('../utils/list_helper');
const Blog = require('../models/blog');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogArr = initialBlogs.map((b) => new Blog(b));
  const promiseArr = blogArr.map((b) => b.save());
  await Promise.all(promiseArr);
}, 100000);

test('blog object has the key id instead of _id', async () => {
  const response = await api.get('/api/blogs');
  // console.log(JSON.stringify(blogArr));
  // console.log(response.text);
  expect(response.body[0].id).toBeDefined();
});

test('correct number of blogs are returned as json', async () => {
  const response = await api.get('/api/blogs');
  // console.log(response);
  //   .expect(response.status).toBe(200)
  expect(response.header['content-type']).toMatch(/application\/json/);
  expect(response.body).toHaveLength(initialBlogs.length);
  expect(response.status).toBe(200);
  // console.log(response);
  // expect(response.header.content-type'Content-Type', /application\/json/);
});

test('posting an acceptable blog to the db creates correct content and increases the length', async () => {
  const newBlog = {
    title: 'hi',
    author: 'me',
    url: 'great.com',
    likes: 1,
  };
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const { body } = await api.get('/api/blogs');
  expect(body).toHaveLength(initialBlogs.length + 1);
  expect(body.at(-1).author).toContain('me');
});

test('blog to be posted with no likes property is saved with likes property set to zero', async () => {
  const noLikesBlog = {
    title: 'hi',
    author: 'me',
    url: 'great.com',
  };
  const response = await api
    .post('/api/blogs')
    .send(noLikesBlog);
  expect(response.status).toBe(201);
  expect(response.body.likes).toBe(0);
});

test('blog with missing url or author returns status code 400', async () => {
  const missingBlog = {
    title: 'hi',
    url: 'me.com',
  };
  const response = await api
    .post('/api/blogs')
    .send(missingBlog);
  expect(response.status).toBe(400);
  expect(response.body.error).toBe('misssing author or url');
});

afterAll(async () => {
  await mongoose.connection.close();
}, 100000);
