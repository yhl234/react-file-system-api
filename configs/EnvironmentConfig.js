const dev = {
  DB_CONNECTION_STRING: process.env.DEV_DB_CONNECTION_STRING,
};

const prod = {
  DB_CONNECTION_STRING: process.env.PROD_DB_CONNECTION_STRING,
};

const test = {
  DB_CONNECTION_STRING: process.env.TEST_DB_CONNECTION_STRING,
};

exports.getEnv = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return dev;
    case 'production':
      return prod;
    case 'test':
      return test;
    default:
      break;
  }
};