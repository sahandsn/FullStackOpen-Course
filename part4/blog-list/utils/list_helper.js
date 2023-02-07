/* eslint-disable no-param-reassign */
/* eslint-disable no-prototype-builtins */
// const _ = require('lodash');

const dummy = () => 1;

const totalLikes = (blogsArr) => {
  if (blogsArr.length === 0) {
    // console.log(0);
    return 0;
  }
  // console.log(blogsArr.reduce((total, current) => total + current.likes, 0));
  return blogsArr.reduce((total, current) => total + current.likes, 0);
};

const favoriteBlog = (blogsArr) => {
  if (blogsArr.length === 0) {
    return {};
  }
  return blogsArr.reduce((mostLiked, current) => {
    if (current.likes > mostLiked.likes) {
      return current;
    }
    return mostLiked;
  }, { likes: -1 });
};

const mostBlogs = (blogsArr) => {
  if (blogsArr.length === 0) {
    return {};
  }
  const newObj = blogsArr.reduce((objs, currentObj) => {
    if (!objs.hasOwnProperty(currentObj.author)) {
      objs[currentObj.author] = 0;
    }
    objs[currentObj.author] += 1;
    return objs;
  }, {});
  return Object.keys(newObj).reduce((most, current) => {
    if (most.blogs < newObj[current]) {
      return { author: current, blogs: newObj[current] };
    }
    return most;
  }, { author: 'sahand', blogs: -1 });
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
