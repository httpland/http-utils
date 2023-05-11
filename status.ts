// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

/** An HTTP status that is a informational (1XX). */
export enum InformationalStatus {
  /** RFC 9110, 15.2.1 */
  Continue = 100,

  /** RFC 9110, 15.2.2 */
  SwitchingProtocols,

  /** RFC 2518, 10.1 */
  Processing,

  /** RFC 8297 **/
  EarlyHints,
}

/** An HTTP status that is a success (2XX). */
export enum SuccessfulStatus {
  /** RFC 9110, 15.3.1 */
  OK = 200,

  /** RFC 9110, 15.3.2 */
  Created,

  /** RFC 9110, 15.3.3 */
  Accepted,

  /** RFC 9110, 15.3.4 */
  NonAuthoritativeInformation,

  /** RFC 9110, 15.3.5 */
  NoContent,

  /** RFC 9110, 15.3.6 */
  ResetContent,

  /** RFC 9110, 15.3.7 */
  PartialContent,

  /** RFC 4918, 11.1 */
  MultiStatus,

  /** RFC 5842, 7.1 */
  AlreadyReported,

  /** RFC 3229, 10.4.1 */
  IMUsed = 226,
}

/** An HTTP status that is a redirect (3XX). */
export enum RedirectionStatus {
  /** RFC 9110, 15.4.1 */
  MultipleChoices = 300,

  /** RFC 9110, 15.4.2 */
  MovedPermanently,

  /** RFC 9110, 15.4.3 */
  Found,

  /** RFC 9110, 15.4.4 */
  SeeOther,

  /** RFC 9110, 15.4.5 */
  NotModified,

  /** RFC 9110, 15.4.6 */
  UseProxy,

  /** RFC 9110, 15.4.8 */
  TemporaryRedirect = 307,

  /** RFC 9110, 15.4.9 */
  PermanentRedirect,
}

/** An HTTP status that is a client error (4XX). */
export enum ClientErrorStatus {
  /** RFC 9110, 15.5.1 */
  BadRequest = 400,

  /** RFC 9110, 15.5.2 */
  Unauthorized,

  /** RFC 9110, 15.5.3 */
  PaymentRequired,

  /** RFC 9110, 15.5.4 */
  Forbidden,

  /** RFC 9110, 15.5.5 */
  NotFound,

  /** RFC 9110, 15.5.6 */
  MethodNotAllowed,

  /** RFC 9110, 15.5.7 */
  NotAcceptable,

  /** RFC 9110, 15.5.8 */
  ProxyAuthenticationRequired,

  /** RFC 9110, 15.5.9 */
  RequestTimeout,

  /** RFC 9110, 15.5.10 */
  Conflict,

  /** RFC 9110, 15.5.11 */
  Gone,

  /** RFC 9110, 15.5.12 */
  LengthRequired,

  /** RFC 9110, 15.5.13 */
  PreconditionFailed,

  /** RFC 9110, 15.5.14 */
  ContentTooLarge,

  /** RFC 9110, 15.5.15 */
  URITooLong,

  /** RFC 9110, 15.5.16 */
  UnsupportedMediaType,

  /** RFC 9110, 15.5.17 */
  RangeNotSatisfiable,

  /** RFC 9110, 15.5.18 */
  ExpectationFailed,

  /** RFC 9110, 15.5.20 */
  MisdirectedRequest = 421,

  /** RFC 9110, 15.5.21 */
  UnprocessableContent,

  /** RFC 4918, 11.3 */
  Locked,

  /** RFC 4918, 11.4 */
  FailedDependency,

  /** RFC 8470, 5.2 */
  TooEarly,

  /** RFC 9110, 15.5.22 */
  UpgradeRequired,

  /** RFC 6585, 3 */
  PreconditionRequired = 428,

  /** RFC 6585, 4 */
  TooManyRequests,

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
  NotImplemented,

  /** RFC 9110, 15.6.3 */
  BadGateway,

  /** RFC 9110, 15.6.4 */
  ServiceUnavailable,

  /** RFC 9110, 15.6.5 */
  GatewayTimeout,

  /** RFC 9110, 15.6.6 */
  HTTPVersionNotSupported,

  /** RFC 2295, 8.1 */
  VariantAlsoNegotiates,

  /** RFC 4918, 11.5 */
  InsufficientStorage,

  /** RFC 5842, 7.2 */
  LoopDetected,

  /** RFC 2774, 7 */
  NotExtended = 510,

  /** RFC 6585, 6 */
  NetworkAuthenticationRequired,
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
