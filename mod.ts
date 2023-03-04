// Copyright 2022-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

export { equalsRequest, isRequest } from "./request.ts";
export { type HttpHandler } from "./handler.ts";
export {
  CachingHeader,
  equalsHeaders,
  type HttpFieldName,
  isSingletonField,
  mergeHeaders,
  type MergeHeadersOptions,
  parseFieldValue,
  RepresentationHeader,
} from "./header.ts";
export { equalsResponse, isResponse, safeResponse } from "./response.ts";
export {
  type HttpMethod,
  type IdempotentMethod,
  isIdempotentMethod,
  isSafeMethod,
  Method,
  type SafeMethod,
} from "./method.ts";
