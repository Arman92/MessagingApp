import chai, { assert, expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '@messaging/api-server';
import {
  createMockDatabase,
  clearMockDatabase,
  createMockDatabaseUserAndTokens,
  createMockUser,
  createMockDatabaseUser,
} from '@messaging/mocha/mongo-utils';
import { IUser } from 'model';

chai.use(chaiHttp);

describe('Conversation endpoint', () => {
  // TODO: stub these mock users and token with sinon
  let user: IUser;
  let accessToken: string;

  // Setup mock MongoDb database
  before(async () => {
    await createMockDatabase();
    // TODO: stub these mock users and token with sinon
    const userDetails = await createMockDatabaseUserAndTokens();
    user = userDetails.user;
    accessToken = userDetails.accessToken;
  });

  after(async () => {
    await clearMockDatabase();
  });

  // Test login with a mock user
  it('Should create conversation successfully', async () => {
    const { user: secondUser } = await createMockDatabaseUser();

    const postData = {
      title: 'My conversation with user X',
      participantIds: [user.id, secondUser.id],
    };

    const res = await chai
      .request(app)
      .post('/conversation')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(postData);

    console.log({ body: res.body });

    expect(res.status).to.be.eq(200);
    expect(res.body.title).to.be.eq(postData.title);
    expect(res.body.participants).to.have.length(2);
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
