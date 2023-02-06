const dummy = () => 1;

const totalLikes = (blogsArr) => {
  if (blogsArr.length === 0) {
    console.log(0);
    return 0;
  }
  console.log(blogsArr.reduce((total, current) => total + current.likes, 0));
  return blogsArr.reduce((total, current) => total + current.likes, 0);
};

module.exports = {
  dummy,
  totalLikes,
};
