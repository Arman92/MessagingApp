import chai, { assert, expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '@messaging/api-server';
import {
  createMockDatabase,
  clearMockDatabase,
  dropMockDatabase,
  createMockDatabaseUser,
  createMockUser,
} from '@messaging/mocha/mongo-utils';

chai.use(chaiHttp);

describe('Auth endpoint', () => {
  // Setup mock MongoDb database
  before(async () => {
    await createMockDatabase();
  });

  after(async () => {
    await clearMockDatabase();
  });

  afterEach(async () => {
    await dropMockDatabase();
  });

  // Test login with a mock user
  it('Should login successfully', async () => {
    const { user, password } = await createMockDatabaseUser();

    const res = await chai
      .request(app)
      .post('/auth/login')
      .send({ emailOrUsername: user.email, password: password });

    expect(res.status).to.be.eq(200);
    expect(new Date(res.body.accessTokenExpireDate)).to.gt(new Date());
    assert(res.body.accessToken);
    assert(res.body.refreshToken);
    expect(res.body.user.email).to.be.eq(user.email);
    expect(res.body.user.username).to.be.eq(user.username);
    expect(res.body.user.id).to.be.eq(user.id);
  });

  // Test signup a new user
  it('Should sign up successfully', async () => {
    const { email, password, name, username } = await createMockUser();

    const res = await chai
      .request(app)
      .post('/auth/signup')
      .send({ email, password, name, username });

    expect(res.status).to.be.eq(200);
    expect(new Date(res.body.accessTokenExpireDate)).to.gt(new Date());
    assert(res.body.accessToken);
    assert(res.body.refreshToken);
    expect(res.body.user.email).to.be.eq(email);
    expect(res.body.user.username).to.be.eq(username);
    assert(res.body.user.id);
  });
});
