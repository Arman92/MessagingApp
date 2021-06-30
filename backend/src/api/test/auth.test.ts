import chai, { assert, expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '@messaging/api-server';
import {
  createMockDatabase,
  clearMockDatabase,
  dropMockDatabase,
  createMockUser,
} from '@messaging/mocha/mongo-utils';

chai.use(chaiHttp);

describe('Auth endpoint', () => {
  before(async () => {
    await createMockDatabase();
  });

  after(async () => {
    await clearMockDatabase();
  });

  afterEach(async () => {
    await dropMockDatabase();
  });

  it('Should login successfully', async () => {
    const { user, password } = await createMockUser();
    console.log({ user });

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
});
