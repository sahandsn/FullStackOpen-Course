const { mostBlogs, initialBlogs } = require('../utils/list_helper');

describe('author with most blogs', () => {
  test('in empty list is {}', () => {
    expect(mostBlogs([])).toEqual({});
  });
  test('in list which has only one author is itself', () => {
    expect(mostBlogs([initialBlogs[0]])).toEqual({ author: 'Michael Chan', blogs: 1 });
  });
  test('of a bigger list is calculated right', () => {
    expect(mostBlogs(initialBlogs)).toEqual({ author: 'Robert C. Martin', blogs: 3 });
  });
});
