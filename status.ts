// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

/** An HTTP status that is a informational (1XX). */
export enum InformationalStatus {
  /** RFC 9110, 15.2.1 */
  Continue = 100,

  /** RFC 9110, 15.2.2 */
  SwitchingProtocols = 101,

  /** RFC 2518, 10.1 */
  Processing = 102,

  /** RFC 8297 **/
  EarlyHints = 103,
}

/** An HTTP status that is a success (2XX). */
export enum SuccessfulStatus {
  /** RFC 9110, 15.3.1 */
  OK = 200,

  /** RFC 9110, 15.3.2 */
  Created = 201,

  /** RFC 9110, 15.3.3 */
  Accepted = 202,

  /** RFC 9110, 15.3.4 */
  NonAuthoritativeInfo = 203,

  /** RFC 9110, 15.3.5 */
  NoContent = 204,

  /** RFC 9110, 15.3.6 */
  ResetContent = 205,

  /** RFC 9110, 15.3.7 */
  PartialContent = 206,

  /** RFC 4918, 11.1 */
  MultiStatus = 207,

  /** RFC 5842, 7.1 */
  AlreadyReported = 208,

  /** RFC 3229, 10.4.1 */
  IMUsed = 226,
}

/** An HTTP status that is a redirect (3XX). */
export enum RedirectionStatus {
  /** RFC 9110, 15.4.1 */
  MultipleChoices = 300,

  /** RFC 9110, 15.4.2 */
  MovedPermanently = 301,

  /** RFC 9110, 15.4.3 */
  Found = 302,

  /** RFC 9110, 15.4.4 */
  SeeOther = 303,

  /** RFC 9110, 15.4.5 */
  NotModified = 304,

  /** RFC 9110, 15.4.6 */
  UseProxy = 305,

  /** RFC 9110, 15.4.8 */
  TemporaryRedirect = 307,

  /** RFC 9110, 15.4.9 */
  PermanentRedirect = 308,
}

/** An HTTP status that is a client error (4XX). */
export enum ClientErrorStatus {
  /** RFC 9110, 15.5.1 */
  BadRequest = 400,

  /** RFC 9110, 15.5.2 */
  Unauthorized = 401,

  /** RFC 9110, 15.5.3 */
  PaymentRequired = 402,

  /** RFC 9110, 15.5.4 */
  Forbidden = 403,

  /** RFC 9110, 15.5.5 */
  NotFound = 404,

  /** RFC 9110, 15.5.6 */
  MethodNotAllowed = 405,

  /** RFC 9110, 15.5.7 */
  NotAcceptable = 406,

  /** RFC 9110, 15.5.8 */
  ProxyAuthRequired = 407,

  /** RFC 9110, 15.5.9 */
  RequestTimeout = 408,

  /** RFC 9110, 15.5.10 */
  Conflict = 409,

  /** RFC 9110, 15.5.11 */
  Gone = 410,

  /** RFC 9110, 15.5.12 */
  LengthRequired = 411,

  /** RFC 9110, 15.5.13 */
  PreconditionFailed = 412,

  /** RFC 9110, 15.5.14 */
  RequestEntityTooLarge = 413,

  /** RFC 9110, 15.5.15 */
  RequestURITooLong = 414,

  /** RFC 9110, 15.5.16 */
  UnsupportedMediaType = 415,

  /** RFC 9110, 15.5.17 */
  RequestedRangeNotSatisfiable = 416,

  /** RFC 9110, 15.5.18 */
  ExpectationFailed = 417,

  /** RFC 9110, 15.5.20 */
  MisdirectedRequest = 421,

  /** RFC 9110, 15.5.21 */
  UnprocessableContent = 422,

  /** RFC 4918, 11.3 */
  Locked = 423,

  /** RFC 4918, 11.4 */
  FailedDependency = 424,

  /** RFC 8470, 5.2 */
  TooEarly = 425,

  /** RFC 9110, 15.5.22 */
  UpgradeRequired = 426,

  /** RFC 6585, 3 */
  PreconditionRequired = 428,

  /** RFC 6585, 4 */
  TooManyRequests = 429,

  /** RFC 6585, 5 */
  RequestHeaderFieldsTooLarge = 431,

  /** RFC 7725, 3 */
  UnavailableForLegalReasons = 451,
}

/** An HTTP status that is a server error (5XX). */
export enum ServerErrorStatus {
  /** RFC 9110, 15.6.1 */
  InternalServerError = 500,

  /** RFC 9110, 15.6.2 */
  NotImplemented = 501,

  /** RFC 9110, 15.6.3 */
  BadGateway = 502,

  /** RFC 9110, 15.6.4 */
  ServiceUnavailable = 503,

  /** RFC 9110, 15.6.5 */
  GatewayTimeout = 504,

  /** RFC 9110, 15.6.6 */
  HTTPVersionNotSupported = 505,

  /** RFC 2295, 8.1 */
  VariantAlsoNegotiates = 506,

  /** RFC 4918, 11.5 */
  InsufficientStorage = 507,

  /** RFC 5842, 7.2 */
  LoopDetected = 508,

  /** RFC 2774, 7 */
  NotExtended = 510,

  /** RFC 6585, 6 */
  NetworkAuthenticationRequired = 511,
}

/** An HTTP status that is an error (4XX and 5XX). */
export const ErrorStatus = { ...ClientErrorStatus, ...ServerErrorStatus };

/** Standard HTTP status codes. */
export const Status = {
  ...InformationalStatus,
  ...SuccessfulStatus,
  ...RedirectionStatus,
  ...ClientErrorStatus,
  ...ServerErrorStatus,
};
