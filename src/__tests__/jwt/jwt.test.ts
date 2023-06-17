/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import * as KeyFixture from '../__fixtures__/example-jwt';
import * as JWT from '../../jwt/jwt';

describe('JWT', function () {
  test('Decode Success', async () => {
    const cryptoKey = await crypto.subtle.importKey(
      'jwk',
      KeyFixture.key,
      KeyFixture.alg,
      false,
      ['verify']
    );
    const res = await JWT.decode(KeyFixture.jwt, cryptoKey, {
      algorithm: KeyFixture.alg,
      clockSkew: 999999999999999,
      claims: ['iss', 'iat', 'sub', 'exp', 'jti'],
      iss: KeyFixture.claims.iss,
    });
    expect(res.get('sub') === KeyFixture.claims.sub);
    expect(res.get('jti') === KeyFixture.claims.jti);
  });
});
