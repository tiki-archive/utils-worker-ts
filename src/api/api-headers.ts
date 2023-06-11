/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { Headers } from '@cloudflare/workers-types';

export const CONTENT_TYPE = 'Content-Type';
export const ACCEPT = 'Accept';
export const AUTHORIZATION = 'Authorization';
export const ALLOW_ORIGIN = 'Access-Control-Allow-Origin';
export const ALLOW_METHODS = 'Access-Control-Allow-Methods';
export const ALLOW_CREDENTIALS = 'Access-Control-Allow-Credentials';
export const ALLOW_HEADERS = 'Access-Control-Allow-Headers';

export const APPLICATION_JSON = 'application/json';
export const APPLICATION_FORM_URL = 'application/x-www-form-urlencoded';

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
