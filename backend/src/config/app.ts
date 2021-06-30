export default {
  host: process.env.APP_HOST || 'localhost',
  port: process.env.APP_PORT || 8000,
  corsWhiteList: process.env.CORS_WHITELIST || 'localhost:3000',
};
