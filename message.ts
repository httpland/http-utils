// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

/** Return an instance with the provided `Request` replacing the specified header.
 * There are no side effects on the original `Request`.
 *
 * @example
 * ```ts
 * import { withHeader } from "https://deno.land/x/http_utils@$VERSION/message.ts";
 * import { assert } from "https://deno.land/std@$VERSION/testing/asserts.ts";
 *
 * declare const init: Request;
 * declare const header: string;
 * declare const value: string;
 *
 * const request = withHeader(init, header, value);
 *
 * assert(request.headers.get(header), value);
 * assert(init !== request);
 * ```
 */
export function withHeader(
  request: Request,
  fieldName: string,
  fieldValue: string,
): Request;
/** Return an instance with the provided `Response` replacing the specified header.
 * There are no side effects on the original `Response`.
 *
 * @example
 * ```ts
 * import { withHeader } from "https://deno.land/x/http_utils@$VERSION/message.ts";
 * import { assert } from "https://deno.land/std@$VERSION/testing/asserts.ts";
 *
 * declare const init: Response;
 * declare const header: string;
 * declare const value: string;
 *
 * const response = withHeader(init, header, value);
 *
 * assert(response.headers.get(header), value);
 * assert(init !== response);
 * ```
 */
export function withHeader(
  response: Response,
  fieldName: string,
  fieldValue: string,
): Response;
export function withHeader(
  message: Request | Response,
  fieldName: string,
  fieldValue: string,
): Request | Response {
  const headers = new Headers([...message.headers.entries(), [
    fieldName,
    fieldValue,
  ]]);

  if (message instanceof Request) return new Request(message, { headers });

  const { status, statusText } = message;

  return new Response(message.body, { headers, status, statusText });
}
