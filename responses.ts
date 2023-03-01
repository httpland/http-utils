// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

import { Status, STATUS_TEXT } from "./deps.ts";
import { equalsHeaders } from "./headers.ts";

/** Safely returns a Response object.
 * Wraps operations that may cause errors and returns a 500 internal server error response if an error occurs.
 *
 * ```ts
 * import { safeResponse } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
 * import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";
 *
 * const successRes = await safeResponse(() => new Response());
 * assertEquals(successRes.status, 200);
 *
 * const res = await safeResponse(() => {
 *   throw Error();
 * });
 * assertEquals(res.status, 500);
 * ```
 */
export async function safeResponse(
  fn: () => Response | Promise<Response>,
  onError?: (error: unknown) => Response | Promise<Response>,
): Promise<Response> {
  try {
    return await fn();
  } catch (e) {
    const status = Status.InternalServerError;
    const response = new Response(null, {
      status,
      statusText: STATUS_TEXT[status],
    });

    try {
      return onError?.(e) ?? response;
    } catch {
      return response;
    }
  }
}

/** Check two `Response` fields equality.
 *
 * ```ts
 * import { equalsResponse } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
 * import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";
 *
 * assertEquals(
 *   await equalsResponse(
 *     new Response(null, { status: 204, headers: { "content-length": "0" } }),
 *     new Response(null, { status: 204, headers: { "content-length": "0" } }),
 *   ),
 *   true,
 * );
 * assertEquals(
 *   await equalsResponse(new Response("test"), new Response("test2")),
 *   false,
 * );
 * ```
 */
export async function equalsResponse(
  left: Response,
  right: Response,
): Promise<boolean> {
  try {
    left = left.clone();
    right = right.clone();

    return left.ok === right.ok &&
      left.bodyUsed === right.bodyUsed &&
      left.redirected === right.redirected &&
      left.status === right.status &&
      left.statusText === right.statusText &&
      left.type === right.type &&
      left.url === right.url &&
      equalsHeaders(left.headers, right.headers) &&
      await left.text() === await right.text();
  } catch {
    return false;
  }
}

/** Whether the value is `Response` or not.
 *
 * ```ts
 * import { isResponse } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
 * import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";
 *
 * assertEquals(isResponse(new Response()), true);
 * assertEquals(isResponse({}), false);
 * assertEquals(isResponse(null), false);
 * ```
 */
export function isResponse(value: unknown): value is Response {
  return value instanceof Response;
}
