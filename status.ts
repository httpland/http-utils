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

const InformationalStatuses = [
  InformationalStatus.Continue,
  InformationalStatus.SwitchingProtocols,
  InformationalStatus.Processing,
  InformationalStatus.EarlyHints,
];

/** Whether the input is {@link InformationalStatus} or not.
 *
 * @example
 * ```ts
 * import { isInformationalStatus } from "https://deno.land/x/http_utils@$VERSION/status.ts";
 * import { assert } from "https://deno.land/std/testing/asserts.ts";
 *
 * assert(isInformationalStatus(100));
 * assert(isInformationalStatus(101));
 * ```
 */
export function isInformationalStatus(
  status: number,
): status is InformationalStatus {
  return InformationalStatuses.includes(status);
}

const SuccessfulStatuses = [
  SuccessfulStatus.OK,
  SuccessfulStatus.Created,
  SuccessfulStatus.Accepted,
  SuccessfulStatus.NonAuthoritativeInformation,
  SuccessfulStatus.NoContent,
  SuccessfulStatus.ResetContent,
  SuccessfulStatus.PartialContent,
  SuccessfulStatus.MultiStatus,
  SuccessfulStatus.AlreadyReported,
  SuccessfulStatus.IMUsed,
];

/** Whether the input is {@link SuccessfulStatus} or not.
 *
 * @example
 * ```ts
 * import { isSuccessfulStatus } from "https://deno.land/x/http_utils@$VERSION/status.ts";
 * import { assert } from "https://deno.land/std/testing/asserts.ts";
 *
 * assert(isSuccessfulStatus(200));
 * assert(isSuccessfulStatus(201));
 * ```
 */
export function isSuccessfulStatus(
  status: number,
): status is ServerErrorStatus {
  return SuccessfulStatuses.includes(status);
}

const RedirectionStatuses = [
  RedirectionStatus.MultipleChoices,
  RedirectionStatus.MovedPermanently,
  RedirectionStatus.Found,
  RedirectionStatus.SeeOther,
  RedirectionStatus.NotModified,
  RedirectionStatus.UseProxy,
  RedirectionStatus.TemporaryRedirect,
  RedirectionStatus.PermanentRedirect,
];

/** Whether the input is {@link RedirectionStatus} or not.
 *
 * @example
 * ```ts
 * import { isRedirectionStatus } from "https://deno.land/x/http_utils@$VERSION/status.ts";
 * import { assert } from "https://deno.land/std/testing/asserts.ts";
 *
 * assert(isRedirectionStatus(300));
 * assert(isRedirectionStatus(301));
 * ```
 */
export function isRedirectionStatus(
  status: number,
): status is RedirectionStatus {
  return RedirectionStatuses.includes(status);
}

const ServerErrorStatues = [
  ServerErrorStatus.InternalServerError,
  ServerErrorStatus.NotImplemented,
  ServerErrorStatus.BadGateway,
  ServerErrorStatus.ServiceUnavailable,
  ServerErrorStatus.GatewayTimeout,
  ServerErrorStatus.HTTPVersionNotSupported,
  ServerErrorStatus.VariantAlsoNegotiates,
  ServerErrorStatus.InsufficientStorage,
  ServerErrorStatus.LoopDetected,
  ServerErrorStatus.NotExtended,
  ServerErrorStatus.NetworkAuthenticationRequired,
];

const ClientErrorStatuses = [
  ClientErrorStatus.BadRequest,
  ClientErrorStatus.Unauthorized,
  ClientErrorStatus.PaymentRequired,
  ClientErrorStatus.Forbidden,
  ClientErrorStatus.NotFound,
  ClientErrorStatus.MethodNotAllowed,
  ClientErrorStatus.NotAcceptable,
  ClientErrorStatus.ProxyAuthenticationRequired,
  ClientErrorStatus.RequestTimeout,
  ClientErrorStatus.Conflict,
  ClientErrorStatus.Gone,
  ClientErrorStatus.LengthRequired,
  ClientErrorStatus.PreconditionFailed,
  ClientErrorStatus.ContentTooLarge,
  ClientErrorStatus.URITooLong,
  ClientErrorStatus.UnsupportedMediaType,
  ClientErrorStatus.RangeNotSatisfiable,
  ClientErrorStatus.ExpectationFailed,
  ClientErrorStatus.MisdirectedRequest,
  ClientErrorStatus.UnprocessableContent,
  ClientErrorStatus.Locked,
  ClientErrorStatus.FailedDependency,
  ClientErrorStatus.TooEarly,
  ClientErrorStatus.UpgradeRequired,
  ClientErrorStatus.PreconditionRequired,
  ClientErrorStatus.TooManyRequests,
  ClientErrorStatus.RequestHeaderFieldsTooLarge,
  ClientErrorStatus.UnavailableForLegalReasons,
];

/** Whether the input is {@link ClientErrorStatus} or not.
 *
 * @example
 * ```ts
 * import { isClientErrorStatus } from "https://deno.land/x/http_utils@$VERSION/status.ts";
 * import { assert } from "https://deno.land/std/testing/asserts.ts";
 *
 * assert(isClientErrorStatus(400));
 * assert(isClientErrorStatus(401));
 * ```
 */
export function isClientErrorStatus(
  status: number,
): status is ClientErrorStatus {
  return ClientErrorStatuses.includes(status);
}

/** Whether the input is {@link ServerErrorStatus} or not.
 *
 * @example
 * ```ts
 * import { isServerErrorStatus } from "https://deno.land/x/http_utils@$VERSION/status.ts";
 * import { assert } from "https://deno.land/std/testing/asserts.ts";
 *
 * assert(isServerErrorStatus(500));
 * assert(isServerErrorStatus(501));
 * ```
 */
export function isServerErrorStatus(
  status: number,
): status is ServerErrorStatus {
  return ServerErrorStatues.includes(status);
}

const ErrorStatuses = [...ClientErrorStatuses, ...ServerErrorStatues];

/** Whether the input is {@link ClientErrorStatus} or {@link ServerErrorStatus} or not.
 *
 * @example
 * ```ts
 * import { isErrorStatus } from "https://deno.land/x/http_utils@$VERSION/status.ts";
 * import { assert } from "https://deno.land/std/testing/asserts.ts";
 *
 * assert(isErrorStatus(400));
 * assert(isErrorStatus(500));
 * ```
 */
export function isErrorStatus(
  status: number,
): status is ClientErrorStatus | ServerErrorStatus {
  return ErrorStatuses.includes(status);
}
