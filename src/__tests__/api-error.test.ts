/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { ApiError } from '../api/api-error';

describe('ApiError', function () {
  test('No nulls', async () => {
    const err: ApiError = new ApiError().message('test');
    expect(err.json() === '{"message":"test"}');
  });
});
