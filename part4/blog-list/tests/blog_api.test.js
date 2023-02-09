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

afterAll(async () => {
  await mongoose.connection.close();
}, 100000);
