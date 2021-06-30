import 'mocha';
import { expect, assert } from 'chai';

import { User } from '..';
import { comparePassword } from '../../../utils/password-hash';

describe('User db server', async () => {
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
});
