/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { Response } from '@cloudflare/workers-types';
import { APPLICATION_JSON, HeaderBuilder } from './api-headers';
import { ApiCors } from './api-cors';
import { skipNulls } from './api-consts';

export class ApiError {
  private _id?: string;
  private _message?: string;
  private _detail?: string;
  private _help?: string;
  private _properties?: Map<string, string>;

  id(id: string): ApiError {
    this._id = id;
    return this;
  }

  message(message: string): ApiError {
    this._message = message;
    return this;
  }

  detail(detail: string): ApiError {
    this._detail = detail;
    return this;
  }

  help(help: string): ApiError {
    this._help = help;
    return this;
  }

  properties(properties: Map<string, string>): ApiError {
    this._properties = properties;
    return this;
  }

  json = () =>
    JSON.stringify(
      {
        id: this._id,
        message: this._message,
        detail: this._detail,
        help: this._help,
        properties: this._properties,
      },
      skipNulls
    );

  response = (status: number, cors?: ApiCors): Response =>
    new Response(this.json(), {
      status,
      headers: new HeaderBuilder().from(cors?.headers()).content(APPLICATION_JSON).build(),
    });
}
