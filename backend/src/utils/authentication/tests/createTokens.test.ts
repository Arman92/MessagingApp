import 'mocha';
import { expect } from 'chai';

import { createAuthTokens } from '../createTokens';

describe('Create Tokens', () => {
  it('should create AccessToken and RefreshToken', async () => {
    const result = await createAuthTokens(
      {
        userId: '121231ade2',
        email: 'test@test.com',
      },
      'access token secret',
      'refresh token secret'
    );

    expect(result).to.have.length(3);
    expect(result[0]).to.not.eq('');
    expect(result[1]).to.not.eq('');
  });
});
