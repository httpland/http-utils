// Copyright 2022-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

export { equalsRequest, isRequest } from "./request.ts";
export {
  AuthenticationHeader,
  CachingHeader,
  ConditionalHeader,
  ContentNegotiationHeader,
  equalsHeaders,
  filterKeys,
  type HttpFieldName,
  isSingletonField,
  mergeHeaders,
  type MergeHeadersOptions,
  MessageForwardingHeader,
  MessageMetadataHeader,
  parseFieldValue,
  RangeHeader,
  RepresentationHeader,
} from "./header.ts";
export { equalsResponse, isResponse, safeResponse } from "./response.ts";
export {
  type HttpMethod,
  type IdempotentMethod,
  isIdempotentMethod,
  isRetrieveMethod,
  isSafeMethod,
  Method,
  type RetrieveMethod,
  type SafeMethod,
} from "./method.ts";
