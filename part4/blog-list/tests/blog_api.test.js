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

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect('Content-Type', /application\/json/)
    .expect(200);
});

afterAll(async () => {
  await mongoose.connection.close();
});
