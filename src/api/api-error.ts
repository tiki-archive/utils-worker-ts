/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { Response } from '@cloudflare/workers-types';
import { APPLICATION_JSON, HeaderBuilder } from './api-headers';
import { ApiCors } from './api-cors';

export class ApiError {
  id?: string;
  message?: string;
  detail?: string;
  help?: string;
  properties?: Map<string, string>;

  constructor(id: string, message: string, detail: string, help: string, properties: Map<string, string>) {
    this.id = id;
    this.message = message;
    this.detail = detail;
    this.help = help;
    this.properties = properties;
  }

  toResponse = (status: number, cors?: ApiCors): Response =>
    new Response(JSON.stringify(this), {
      status,
      headers: new HeaderBuilder().from(cors?.headers()).content(APPLICATION_JSON).build(),
    });
}
