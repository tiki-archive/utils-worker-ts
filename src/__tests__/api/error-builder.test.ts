/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { ErrorBuilder } from '../../api/error-builder';

describe('ErrorBuilder', function () {
  test('No nulls', async () => {
    const err: ErrorBuilder = new ErrorBuilder().message('test');
    expect(err.json() === '{"message":"test"}');
  });
});
