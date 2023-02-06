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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
