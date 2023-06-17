/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { skipNulls } from '../misc/json';
import { error } from 'itty-router';

export class ErrorBuilder {
  private _id?: string;
  private _message?: string;
  private _detail?: string;
  private _help?: string;
  private _properties?: Map<string, string>;

  id(id: string): ErrorBuilder {
    this._id = id;
    return this;
  }

  message(message: string): ErrorBuilder {
    this._message = message;
    return this;
  }

  detail(detail: string): ErrorBuilder {
    this._detail = detail;
    return this;
  }

  help(help: string): ErrorBuilder {
    this._help = help;
    return this;
  }

  properties(properties: Map<string, string>): ErrorBuilder {
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
        properties:
          this._properties != null
            ? Object.fromEntries(this._properties)
            : undefined,
      },
      skipNulls
    );

  error = (status: number): Response =>
    error(status, {
      id: this._id,
      message: this._message,
      detail: this._detail,
      help: this._help,
      properties:
        this._properties != null
          ? Object.fromEntries(this._properties)
          : undefined,
    });
}
