/* eslint-disable no-underscore-dangle */
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const { initialBlogs, nonExistingId, initialUsers } = require('../utils/list_helper');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  const blogArr = initialBlogs.map((b) => new Blog(b));
  const promiseArr = blogArr.map((b) => b.save());
  await Promise.all(promiseArr);
}, 1000000);

describe('get the blogs', () => {
  test('and returned objects have id instead of _id', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
  });
  test('and the correct number of blogs are returned as json', async () => {
    const response = await api.get('/api/blogs');
    //   .expect(response.status).toBe(200)
    expect(response.header['content-type']).toMatch(/application\/json/);
    expect(response.body).toHaveLength(initialBlogs.length);
    expect(response.status).toBe(200);
    // expect(response.header.content-type'Content-Type', /application\/json/);
  });
});

describe('post a blog', () => {
  let token;
  beforeEach(async () => {
    await api
      .post('/api/users')
      .send(initialUsers[0]);
    const response = await api
      .post('/api/login')
      .send(initialUsers[0]);
    token = response.body.token;
  });
  test('which is correct creates correct content and increases the length', async () => {
    const newBlog = {
      title: 'hi',
      author: 'me',
      url: 'great.com',
      likes: 1,
    };
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    const { body } = await api.get('/api/blogs');
    expect(body).toHaveLength(initialBlogs.length + 1);
    expect(body.at(-1).author).toBe('me');
  });
  test('which is correct but bo token', async () => {
    const newBlog = {
      title: 'hi',
      author: 'me',
      url: 'great.com',
      likes: 1,
    };
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401);
  });
  test('with no likes property is saved with likes property set to zero', async () => {
    const noLikesBlog = {
      title: 'hi',
      author: 'me',
      url: 'great.com',
    };
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(noLikesBlog);
    expect(response.status).toBe(201);
    expect(response.body.likes).toBe(0);
  });
  test('with missing url or author returns status code 400', async () => {
    const missingBlog = {
      title: 'hi',
      url: 'me.com',
    };
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(missingBlog);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('misssing author or url');
  });
});

describe('delete a blog', () => {
  let token;
  beforeEach(async () => {
    await api
      .post('/api/users')
      .send(initialUsers[0]);
    const response = await api
      .post('/api/login')
      .send(initialUsers[0]);
    token = response.body.token;
  });
  test('with invalid id', async () => {
    const response = await api
      .delete('/api/blogs/111111111111111111111')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('invalid id');
  });
  test('with valid but non-existing id', async () => {
    const id = await nonExistingId();
    const response = await api
      .delete(`/api/blogs/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('blog not found');
  });
  test('with a valid and existing id', async () => {
    // const responseBlog = await api.get('/api/blogs');
    const newBlog = {
      title: 'hi',
      author: 'me',
      url: 'great.com',
      likes: 1,
    };
    const savedBlog = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog);
    const response = await api
      .delete(`/api/blogs/${savedBlog.body.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(204);
  });
  test('with a valid and existing id but no token', async () => {
    // const responseBlog = await api.get('/api/blogs');
    const newBlog = {
      title: 'hi',
      author: 'me',
      url: 'great.com',
      likes: 1,
    };
    const savedBlog = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog);
    const response = await api
      .delete(`/api/blogs/${savedBlog.body.id}`);
    expect(response.status).toBe(401);
  });
});

describe('update a blog', () => {
  test('with a an invalid id', async () => {
    const response = await api
      .put('/api/blogs/1')
      .send({
        title: 'hi',
        author: 'me',
        url: 'great.com',
        likes: 19,
      });
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('blog not found');
  });
  test('with valid but non-existing id', async () => {
    const id = await nonExistingId();
    const response = await api
      .put(`/api/blogs/${id}`)
      .send({
        title: 'hi',
        author: 'me',
        url: 'great.com',
        likes: 19,
      });
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('blog not found');
  });
  test('with with a valid and existing id but unspecified key', async () => {
    const blogArr = await Blog.find({});
    const response = await api
      .put(`/api/blogs/${blogArr.at(-1).id}`)
      .send({ liked: 19 });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('unspecified key');
  });
  test('with with a valid and existing id but no changes', async () => {
    const blogArr = await Blog.find({});
    const response = await api
      .put(`/api/blogs/${blogArr.at(-1).id}`)
      .send({});
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('blog not changed');
  });
  test('with correct inputs', async () => {
    const blogArr = await Blog.find({});
    const blogAtEnd = blogArr.at(-1);
    const response = await api
      .put(`/api/blogs/${blogAtEnd.id}`)
      .send({ likes: blogAtEnd.likes + 1 });
    expect(response.body.likes).toBe(blogAtEnd.likes + 1);
    expect(response.status).toBe(200);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
}, 1000000);
