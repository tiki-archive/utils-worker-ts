/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { ErrorBuilder } from '../api/error-builder';

export function ifNull(param: unknown, name?: string): void {
  if (param == null) {
    const properties: Map<string, string> = new Map();
    properties.set(name ?? 'param', String(param));
    throw new ErrorBuilder()
      .message('Missing required parameter')
      .properties(properties)
      .error(400);
  }
}
