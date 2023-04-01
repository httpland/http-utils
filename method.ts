// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

/** Standard HTTP methods. */
export enum Method {
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

/** HTTP method that request retrieving data. */
export type RetrieveMethod = `${Method.Get}` | `${Method.Head}`;

const RETRIEVE_METHODS = [Method.Get, Method.Head];

/** Whether the method is {@link RetrieveMethod} or not.
 *
 * @param method Any method
 *
 * @example
 * ```ts
 * import { isRetrieveMethod } from "https://deno.land/x/http_utils@$VERSION/method.ts";
 * import { assert } from "https://deno.land/std@$VERSION/testing/asserts.ts";
 *
 * assert(isRetrieveMethod("GET"));
 * assert(isRetrieveMethod("HEAD"));
 * assert(!isRetrieveMethod("POST"));
 * ```
 */
export function isRetrieveMethod(
  method: string,
): method is RetrieveMethod {
  return (RETRIEVE_METHODS as string[]).includes(method);
}

/** HTTP method that is read-only.
 * @see [RFC 9110, 9.2.1. Safe Methods](https://www.rfc-editor.org/rfc/rfc9110.html#name-safe-methods)
 */
export type SafeMethod =
  | RetrieveMethod
  | `${Method.Options}`
  | `${Method.Trace}`;

const SAFE_METHODS = [...RETRIEVE_METHODS, Method.Options, Method.Trace];

/** Whether the method is {@link SafeMethod} or not.
 *
 * @example
 * ```ts
 * import { isSafeMethod } from "https://deno.land/x/http_utils@$VERSION/method.ts";
 * import { assert } from "https://deno.land/std@$VERSION/testing/asserts.ts";
 *
 * assert(isSafeMethod("GET"));
 * assert(isSafeMethod("HEAD"));
 * assert(isSafeMethod("OPTIONS"));
 * assert(isSafeMethod("TRACE"));
 * ```
 */
export function isSafeMethod(method: string): method is SafeMethod {
  return (SAFE_METHODS as string[]).includes(method);
}

/** HTTP method that is idempotent.
 * @see [RFC 9110, 9.2.2 Idempotent Methods](https://www.rfc-editor.org/rfc/rfc9110.html#name-idempotent-methods)
 */
export type IdempotentMethod =
  | SafeMethod
  | `${Method.Put}`
  | `${Method.Delete}`;

const IDEMPOTENT_METHODS = [...SAFE_METHODS, Method.Put, Method.Delete];

/** Whether the method is {@link IdempotentMethod} or not.
 *
 * @example
 * ```ts
 * import { isIdempotentMethod } from "https://deno.land/x/http_utils@$VERSION/method.ts";
 * import { assert } from "https://deno.land/std@$VERSION/testing/asserts.ts";
 *
 * assert(isIdempotentMethod("GET"));
 * assert(isIdempotentMethod("PUT"));
 * assert(isIdempotentMethod("DELETE"));
 * ```
 */
export function isIdempotentMethod(method: string): method is IdempotentMethod {
  return (IDEMPOTENT_METHODS as string[]).includes(method);
}
