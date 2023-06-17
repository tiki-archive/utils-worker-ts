/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

export interface Config {
  claims?: Array<string>;
  iss?: string;
  aud?: Array<string>;
  clockSkew?: number;
  algorithm: AlgorithmIdentifier | RsaPssParams | EcdsaParams;
}
