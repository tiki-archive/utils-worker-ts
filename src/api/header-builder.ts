/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import {
  ACCEPT,
  ALLOW_CREDENTIALS,
  ALLOW_HEADERS,
  ALLOW_METHODS,
  ALLOW_ORIGIN,
  AUTHORIZATION,
  CONTENT_TYPE,
} from './consts';

export class HeaderBuilder {
  private _headers: Headers;

  constructor() {
    this._headers = new Headers();
  }

  from(headers?: Headers): HeaderBuilder {
    this._headers = headers ?? new Headers();
    return this;
  }

  content(type: string): HeaderBuilder {
    this._headers.set(CONTENT_TYPE, type);
    return this;
  }

  accept(type: string): HeaderBuilder {
    this._headers.set(ACCEPT, type);
    return this;
  }

  authorization(value: string): HeaderBuilder {
    this._headers.set(AUTHORIZATION, value);
    return this;
  }

  allowOrigin(origin: string): HeaderBuilder {
    this._headers.set(ALLOW_ORIGIN, origin);
    return this;
  }

  allowMethods(methods: Array<string>): HeaderBuilder {
    this._headers.set(ALLOW_METHODS, methods.join(', '));
    return this;
  }

  allowCredentials(allow: boolean): HeaderBuilder {
    this._headers.set(ALLOW_CREDENTIALS, String(allow));
    return this;
  }

  allowHeaders(headers: Array<string>): HeaderBuilder {
    this._headers.set(ALLOW_HEADERS, headers.join(', '));
    return this;
  }

  set(header: string, value: string): HeaderBuilder {
    this._headers.set(header, value);
    return this;
  }

  build = (): Headers => this._headers;
}
