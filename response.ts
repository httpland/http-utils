// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

import { Status, STATUS_TEXT } from "./deps.ts";
import { equalsHeaders } from "./header.ts";

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
 * @example
 * ```ts
 * import { equalsResponse } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
 * import { assert } from "https://deno.land/std@$VERSION/testing/asserts.ts";
 *
 * assert(
 *   equalsResponse(
 *     new Response(null, { status: 204, headers: { "content-length": "0" } }),
 *     new Response(null, { status: 204, headers: { "content-length": "0" } }),
 *   ),
 * );
 * ```
 */
export function equalsResponse(left: Response, right: Response): boolean;
/** Strict check two `Response` fields equality.
 *
 * @example
 * ```ts
 * import { equalsResponse } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
 * import { assert } from "https://deno.land/std@$VERSION/testing/asserts.ts";
 *
 * assert(
 *   await equalsResponse(
 *     new Response("test1", { status: 200, headers: { "content-length": "5" } }),
 *     new Response("test2", { status: 200, headers: { "content-length": "5" } }),
 *     false,
 *   ),
 * );
 * ```
 *
 * @throws {Error} In strict mode, if response body has already been read.
 */
export function equalsResponse(
  left: Response,
  right: Response,
  strict: boolean,
): boolean | Promise<boolean>;
export function equalsResponse(
  left: Response,
  right: Response,
  strict?: boolean,
): boolean | Promise<boolean> {
  strict ??= false;

  const staticResult = left.ok === right.ok &&
    left.bodyUsed === right.bodyUsed &&
    left.redirected === right.redirected &&
    left.status === right.status &&
    left.statusText === right.statusText &&
    left.type === right.type &&
    left.url === right.url &&
    equalsHeaders(left.headers, right.headers);

  if (!staticResult || !strict) return staticResult;

  if (left.bodyUsed || right.bodyUsed) {
    throw Error(
      "response body has already been read and the body cannot be strictly compared",
    );
  }

  return Promise.all([left.clone().text(), right.clone().text()]).then((
    [left, right],
  ) => Object.is(left, right));
}

/** Whether the input is `Response` or not.
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
export function isResponse(input: unknown): input is Response {
  return input instanceof Response;
}
