export default {
  enabled: true,
  file: {
    level: 'info',
    json: true,
  },
  console: {
    level: 'silly',
    json: false,
  },
  morgan: {
    // HTTP Logging middleware
    enabled: true,
    level: 'combined',
  },
};
