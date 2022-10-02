// Copyright 2022-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

import { equalsHeaders } from "./headers.ts";
/** HTTP request method. */
export type HttpMethod =
  /** RFC 9110, 9.3.1 */
  | "GET"
  /** RFC 9110, 9.3.2 */
  | "HEAD"
  /** RFC 9110, 9.3.3 */
  | "POST"
  /** RFC 9110, 9.3.4 */
  | "PUT"
  /** RFC 9110, 9.3.5 */
  | "DELETE"
  /** RFC 9110, 9.3.6 */
  | "CONNECT"
  /** RFC 9110, 9.3.7 */
  | "OPTIONS"
  /** RFC 9110, 9.3.8 */
  | "TRACE"
  /** RFC 5789 */
  | "PATCH";

/** Check two `Request` fields equality.
 *
 * ```ts
 * import { equalsRequest } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
 * import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";
 *
 * assertEquals(
 *   equalsRequest(
 *     new Request("http://localhost"),
 *     new Request("http://test"),
 *   ),
 *   false,
 * );
 * assertEquals(
 *   equalsRequest(
 *     new Request("http://test", { method: "POST" }),
 *     new Request("http://test", { method: "PUT" }),
 *   ),
 *   false,
 * );
 * ```
 */
export function equalsRequest(a: Request, b: Request): boolean {
  return a.url === b.url &&
    a.method === b.method &&
    a.mode === b.mode &&
    a.bodyUsed === b.bodyUsed &&
    a.cache === b.cache &&
    a.credentials === b.credentials &&
    a.destination === b.destination &&
    a.integrity === b.integrity &&
    a.isHistoryNavigation === b.isHistoryNavigation &&
    a.isReloadNavigation === b.isReloadNavigation &&
    a.keepalive === b.keepalive &&
    a.redirect === b.redirect &&
    a.referrer === b.referrer &&
    a.referrerPolicy === b.referrerPolicy &&
    equalsHeaders(a.headers, b.headers);
}
