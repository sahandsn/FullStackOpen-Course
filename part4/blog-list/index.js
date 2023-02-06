const app = require('./app');
const { info } = require('./utils/logger');
const config = require('./utils/config');

app.listen(config.PORT, () => {
  info(`server running on port ${config.PORT}`);
});
