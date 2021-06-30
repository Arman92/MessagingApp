export default {
  secret:
    process.env.NODE_ENV === 'test'
      ? 'secret for tests'
      : process.env.JWT_SECURITY_SECRET ||
        'this is the default secret if JWT_SECURITY_SECRET not set!',
  jwt: {
    enabled: true,
    authTokenExpiresIn: '2h',
    authRefreshTokenExpiresIn: '3d',
  },
};
