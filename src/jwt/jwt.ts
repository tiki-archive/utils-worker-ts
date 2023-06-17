/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import * as Base64 from '../misc/base64';
import { Config } from './config';
import { ErrorBuilder } from '../api/error-builder';

export type { Config };

export async function decode(
  jwt: string,
  key: CryptoKey,
  config: Config
): Promise<Map<string, unknown>> {
  const split = jwt.split('.');
  const header = split[0];
  const payload = split[1];
  const signature = split[2];

  const isVerified = await crypto.subtle.verify(
    config.algorithm,
    key,
    Base64.decode(signature, true),
    new TextEncoder().encode([header, payload].join('.'))
  );

  if (isVerified) {
    const claims: Map<string, unknown> = new Map(
      Object.entries(
        JSON.parse(new TextDecoder().decode(Base64.decode(payload)))
      )
    );
    guard(claims, config);
    return claims;
  } else {
    throw new ErrorBuilder().message('JWT verification failed').error(403);
  }
}

function guard(claims: Map<string, unknown>, config: Config): void {
  if (config.claims !== undefined) {
    config.claims.forEach((claim, i) => {
      if (claims.get(claim) == null) {
        throw new ErrorBuilder()
          .message('JWT verification failed')
          .detail('Missing required claim')
          .properties(new Map().set('claim', claim))
          .error(403);
      }
    });
  }

  if (config.iss != null && claims.get('iss') !== config.iss) {
    throw new ErrorBuilder()
      .message('JWT verification failed')
      .detail('Invalid ISS claim')
      .properties(new Map().set('iss', claims.get('iss')))
      .error(403);
  }

  if (config.aud != null && !config.aud.includes(claims.get('aud') as string)) {
    throw new ErrorBuilder()
      .message('JWT verification failed')
      .detail('Invalid AUD claim')
      .properties(new Map().set('aud', claims.get('aud')))
      .error(403);
  }

  if (claims.get('exp') != null) {
    const exp = new Date(
      (claims.get('exp') as number) * 1000 + (config.clockSkew ?? 0) * 1000
    );
    if (exp < new Date())
      throw new ErrorBuilder()
        .message('JWT verification failed')
        .detail('Expired')
        .properties(new Map().set('exp', exp.toISOString()))
        .error(403);
  }
}
