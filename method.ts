// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

/** Standard HTTP methods. */
export const enum Method {
  /** RFC 9110, 9.3.1 */
  Get = "GET",
  /** RFC 9110, 9.3.2 */
  Head = "HEAD",
  /** RFC 9110, 9.3.3 */
  Post = "POST",
  /** RFC 9110, 9.3.4 */
  Put = "PUT",
  /** RFC 9110, 9.3.5 */
  Delete = "DELETE",
  /** RFC 9110, 9.3.6 */
  Connect = "CONNECT",
  /** RFC 9110, 9.3.7 */
  Options = "OPTIONS",
  /** RFC 9110, 9.3.8 */
  Trace = "TRACE",
  /** RFC 5789 */
  Patch = "PATCH",
}

/** HTTP request method. */
export type HttpMethod = Uppercase<keyof typeof Method>;
