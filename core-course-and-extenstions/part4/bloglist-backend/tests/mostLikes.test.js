const { mostLikes, initialBlogs } = require('../utils/list_helper');

describe('author with most likes', () => {
  test('in empty list is {}', () => {
    expect(mostLikes([])).toEqual({});
  });
  test('in list which has only one author is itself', () => {
    expect(mostLikes([initialBlogs[0]])).toEqual({ author: 'Michael Chan', likes: 7 });
  });
  test('of a bigger list is calculated right', () => {
    expect(mostLikes(initialBlogs)).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 });
  });
});
