/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { HeaderBuilder } from './api-headers';

export class ApiCors {
  readonly _origin: string;
  readonly _methods: Array<string>;
  readonly _headers: Array<string>;
  readonly _credentials: boolean;

  constructor(origin: string, methods: Array<string>, headers: Array<string>, credentials?: boolean) {
    this._origin = origin;
    this._methods = methods;
    this._headers = headers;
    this._credentials = credentials ?? false;
  }

  headers = () =>
    new HeaderBuilder()
      .allowOrigin(this._origin)
      .allowMethods(this._methods)
      .allowHeaders(this._headers)
      .allowCredentials(this._credentials)
      .build();

  guard(req: Request): Response | undefined {
    if (req.method.toLowerCase() === 'options') {
      return new Response(null, {
        headers: this.headers(),
        status: 200,
      });
    }
  }
}
