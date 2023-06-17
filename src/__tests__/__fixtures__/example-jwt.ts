/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { SubtleCryptoImportKeyAlgorithm } from '@cloudflare/workers-types';

export const key: JsonWebKey = JSON.parse(
  '{ "kty": "EC", "use": "sig", "crv": "P-256", "kid": "dc4bde16-1cff-4335-bd8f-e5639761fdbe", "x": "zAq5eyNt6b25XGckC5u4whIl558xs-IzogJqjygysZo", "y": "hjwlv3xt0L10XiJASkjOFHUxI_72ZeLI378trg8pN6c" }'
);

export const jwt =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJpc3MiOiJjb20ubXl0aWtpLmwwX3N0b3JhZ2UiLCJzdWIiOiJHVXVvV2NqMzZFZ0JRWThIVkloc2dYSGFUMWt5WlBxS2YwSXlDekxiMHo0XC8zNm1aWVBhUXVzZVN6U1NsSFF5YTQxVkUwRUIzUmZHcWE4eFlCV1FZZ1ZFXC8iLCJleHAiOjE2NjgyOTU1NTcsImlhdCI6MTY2ODI5MTk1NywianRpIjoiNzJlYWE2M2EtMTkzZC00NTUwLWJhM2MtNTFhYmYyOWFiYjZkIn0.zFjCc13Iz2r9EGd11YpUPw1bYxMsx5SqlyKecxjc64Rzfkt7T2d2EK-U4g_m2yE5aJ69HCGFekot_GGdZiEEnQ';

export const claims = {
  iss: 'com.mytiki.l0_storage',
  iat: 1668291957,
  sub: 'GUuoWcj36EgBQY8HVIhsgXHaT1kyZPqKf0IyCzLb0z4/36mZYPaQuseSzSSlHQya41VE0EB3RfGqa8xYBWQYgVE/',
  exp: 1668295557,
  jti: '72eaa63a-193d-4550-ba3c-51abf29abb6d',
};

export const alg: SubtleCryptoImportKeyAlgorithm = {
  name: 'ECDSA',
  namedCurve: 'P-256',
  hash: 'SHA-256',
};
