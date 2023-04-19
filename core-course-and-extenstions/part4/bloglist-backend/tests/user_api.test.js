const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const { initialUsers } = require('../utils/list_helper');
const User = require('../models/user');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  const userArr = initialUsers.map((u) => new User(u));
  const promiseArr = userArr.map((u) => u.save());
  await Promise.all(promiseArr);
}, 1000000);

describe('post a users', () => {
  test('and it does not have password', async () => {
    const newUser = {
      name: 'hi',
      username: 'biden',
    };
    const res = await api
      .post('/api/users')
      .send(newUser);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('both username and password are required');
    expect(2 + 2).toBe(4);
  });
  test('and it does not have username', async () => {
    const newUser = {
      name: 'hi',
      password: '1234',
    };
    const res = await api
      .post('/api/users')
      .send(newUser);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('both username and password are required');
  });
  test('and password is not three characters', async () => {
    const newUser = {
      name: 'hi',
      password: '12',
      username: 'biden',
    };
    const res = await api
      .post('/api/users')
      .send(newUser);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('password must be at least three characters');
  });
  test('and username is not three characters', async () => {
    const newUser = {
      name: 'hi',
      password: '1234',
      username: 'sa',
    };
    const res = await api
      .post('/api/users')
      .send(newUser);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('username must be unique and at leat three characters');
  });
  test('and username is not unique', async () => {
    const newUser = {
      name: 'hi',
      password: '1234',
      username: 'root',
    };
    const res = await api
      .post('/api/users')
      .send(newUser);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('username must be unique and at leat three characters');
  });
  test('and user is valid', async () => {
    const newUser = {
      name: 'joe',
      password: '1234',
      username: 'joebn',
    };
    const res = await api
      .post('/api/users')
      .send(newUser);
    expect(res.status).toBe(201);
    const userArr = await api.get('/api/users');
    expect(userArr.body.at(-1).username).toBe('joebn');
    expect(userArr.body).toHaveLength(initialUsers.length + 1);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
}, 1000000);
