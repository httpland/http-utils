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
 *   await equalsRequest(
 *     new Request("http://localhost"),
 *     new Request("http://test"),
 *   ),
 *   false,
 * );
 * assertEquals(
 *   await equalsRequest(
 *     new Request("http://test", { method: "POST" }),
 *     new Request("http://test", { method: "PUT" }),
 *   ),
 *   false,
 * );
 * ```
 */
export async function equalsRequest(
  left: Request,
  right: Request,
): Promise<boolean> {
  try {
    left = left.clone();
    right = right.clone();

    return left.url === right.url &&
      left.method === right.method &&
      left.mode === right.mode &&
      left.bodyUsed === right.bodyUsed &&
      left.cache === right.cache &&
      left.credentials === right.credentials &&
      left.destination === right.destination &&
      left.integrity === right.integrity &&
      left.isHistoryNavigation === right.isHistoryNavigation &&
      left.isReloadNavigation === right.isReloadNavigation &&
      left.keepalive === right.keepalive &&
      left.redirect === right.redirect &&
      left.referrer === right.referrer &&
      left.referrerPolicy === right.referrerPolicy &&
      equalsHeaders(left.headers, right.headers) &&
      await left.text() === await right.text();
  } catch {
    return false;
  }
}

/** Whether the value is `Request` or not.
 *
 * ```ts
 * import { isRequest } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
 * import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";
 *
 * assertEquals(isRequest(new Request("http://localhost")), true);
 * assertEquals(isRequest({}), false);
 * assertEquals(isRequest(null), false);
 * ```
 */
export function isRequest(value: unknown): value is Request {
  return value instanceof Request;
}
