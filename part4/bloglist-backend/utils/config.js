require('dotenv').config();

const { PORT } = process.env;
const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI;

const { SECRETE } = process.env;

module.exports = { PORT, MONGODB_URI, SECRETE };
