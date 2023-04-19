const { favoriteBlog, initialBlogs } = require('../utils/list_helper');

describe('most likes', () => {
  test('of empty list is empty obj', () => {
    expect(favoriteBlog([])).toEqual({});
  });
  test('when list has only one blog equals to that obj', () => {
    expect(favoriteBlog([initialBlogs[0]])).toEqual({
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0,
    });
  });
  test('of a bigger list is calculated right', () => {
    expect(favoriteBlog(initialBlogs)).toEqual({
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0,
    });
  });
});
