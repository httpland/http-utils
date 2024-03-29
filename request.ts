// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

import { equalsHeaders } from "./header.ts";
import { equalsType } from "./_utils.ts";

/** Check two `Request` fields equality.
 *
 * @example
 * ```ts
 * import { equalsRequest } from "https://deno.land/x/http_utils@$VERSION/request.ts";
 * import { assert } from "https://deno.land/std/testing/asserts.ts";
 *
 * declare const url: URL;
 *
 * assert(
 *   equalsRequest(
 *     new Request(url, { method: "HEAD" }),
 *     new Request(url, { method: "HEAD" }),
 *   ),
 * );
 * ```
 *
 * @deprecated Move to [request-utils](https://github.com/httpland/request-utils).
 */
export function equalsRequest(
  left: Request,
  right: Request,
): boolean;

/** Strict check two `Request` fields equality.
 *
 * @example
 * ```ts
 * import { equalsRequest } from "https://deno.land/x/http_utils@$VERSION/request.ts";
 * import { assert } from "https://deno.land/std/testing/asserts.ts";
 *
 * declare const url: URL;
 *
 * assert(
 *   await equalsRequest(
 *     new Request(url, { body: "", method: "POST" }),
 *     new Request(url, { body: "", method: "POST" }),
 *     true,
 *   ),
 * );
 * ```
 *
 * @throws {Error} If the request has already been read.
 */
export function equalsRequest(
  left: Request,
  right: Request,
  strict: boolean,
): Promise<boolean> | boolean;
export function equalsRequest(
  left: Request,
  right: Request,
  strict = false,
): boolean | Promise<boolean> {
  const staticResult = left.url === right.url &&
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
    equalsType(left.body, right.body) &&
    equalsHeaders(left.headers, right.headers);

  if (!staticResult || !strict) return staticResult;

  if (left.bodyUsed || right.bodyUsed) {
    throw Error(
      "request body has already been read and the body cannot be strictly compared.",
    );
  }

  return Promise.all([left.clone().text(), right.clone().text()]).then((
    [left, right],
  ) => Object.is(left, right));
}

/** Whether the input is `Request` or not.
 *
 * ```ts
 * import { isRequest } from "https://deno.land/x/http_utils@$VERSION/request.ts";
 * import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";
 *
 * assertEquals(isRequest(new Request("http://localhost")), true);
 * assertEquals(isRequest({}), false);
 * assertEquals(isRequest(null), false);
 * ```
 *
 * @deprecated Move to [request-utils](https://github.com/httpland/request-utils).
 */
export function isRequest(input: unknown): input is Request {
  return input instanceof Request;
}
