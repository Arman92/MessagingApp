import 'mocha';
import { assert, expect } from 'chai';

import { comparePassword, hashPassword } from '../password-hash';

function randomString(n: number): string {
  return Array(n)
    .fill(null)
    .map(() => ((Math.random() * 100) % 25) + 'A'.charCodeAt(0))
    .map((a) => String.fromCharCode(a))
    .join('');
}

describe('Hash passwords', () => {
  it('Should create hash out of given string', async () => {
    const input = randomString(10);

    const hashed = await hashPassword(input);

    assert(hashed);
    expect(hashed).to.have.length(60);

    const isEqualToHash = await comparePassword(input, hashed);
    expect(isEqualToHash).to.eq(true);
  });
});
