import 'mocha';
import { expect, assert } from 'chai';

import { User } from '..';
import { comparePassword } from '@messaging/utils/password-hash';
import {
  createMockDatabase,
  clearMockDatabase,
  dropMockDatabase,
} from '@messaging/mocha/mongo-utils';

describe('User Mongodb service', async () => {
  before(async () => {
    await createMockDatabase();
  });

  after(async () => {
    await clearMockDatabase();
  });

  afterEach(async () => {
    await dropMockDatabase();
  });

  it('Should create a new user', async () => {
    const userProps = {
      name: 'Test user',
      username: 'testUser_name',
      email: 'test@domain.com',
      password: 'someSuperPasswordHere',
    };

    const user = await User.createUser(userProps);

    const isPassEqual = await comparePassword(
      userProps.password,
      user.password
    );

    assert(user);
    expect(user.name).to.equal(userProps.name);
    expect(user.username).to.equal(userProps.username.toLowerCase());
    expect(user.email).to.equal(userProps.email);
    expect(isPassEqual).to.equal(true);
  });

  it('Should update an existing user', async () => {
    const user = await User.createUser({
      name: 'Test user',
      username: 'testUser_name',
      email: 'test@domain.com',
      password: 'someSuperPasswordHere',
    });

    const updatedUser = await User.updateUser(user.id, 'New Name');

    assert(updatedUser);
    expect(updatedUser.id).to.equal(user.id);
    expect(updatedUser.name).to.equal('New Name');
    expect(updatedUser.username).to.equal(user.username);
    expect(updatedUser.email).to.equal(user.email);
    expect(updatedUser.password).to.equal(user.password);
  });
});
