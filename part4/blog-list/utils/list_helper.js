/* eslint-disable no-param-reassign */
/* eslint-disable no-prototype-builtins */
const Blog = require('../models/blog');

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

const mostLikes = (blogsArr) => {
  if (blogsArr.length === 0) {
    return {};
  }
  const newObj = blogsArr.reduce((objs, currentObj) => {
    if (!objs.hasOwnProperty(currentObj.author)) {
      objs[currentObj.author] = 0;
    }
    objs[currentObj.author] += currentObj.likes;
    return objs;
  }, {});
  return Object.keys(newObj).reduce((most, current) => {
    if (most.likes < newObj[current]) {
      return { author: current, likes: newObj[current] };
    }
    return most;
  }, { author: 'sahand', likes: -1 });
};

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ author: 'sahand' });
  await blog.save();
  await blog.remove();
  return blog.id;
};

const blogsInDb = async () => {
  const blogArr = await Blog.find({});
  return blogArr;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
