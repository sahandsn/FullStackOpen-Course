const { totalLikes, initialBlogs } = require('../utils/list_helper');

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(totalLikes([])).toBe(0);
  });
  test('when list has only one blog equals the likes of that', () => {
    expect(totalLikes([initialBlogs[0]])).toBe(7);
  });
  test('of a bigger list is calculated right', () => {
    expect(totalLikes(initialBlogs)).toBe(36);
  });
});
