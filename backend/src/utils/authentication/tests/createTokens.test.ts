import { createAuthTokens } from '../createTokens';

describe('Create Tokens', () => {
  it('should create AccessToken and RefreshToken', async () => {
    const result = await createAuthTokens(
      {
        userId: '121231ade2',
        email_cellphone: 'test@test.com',
      },
      'access token secret',
      'refresh token secret',

      (key: string) => key
    );

    expect(result).toHaveLength(3);
    expect(result[0]).not.toEqual('');
    expect(result[1]).not.toEqual('');
  });
});
