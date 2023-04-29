// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

// export function isQuotedString(input: string): input is QuotedString {
// }

/**
 * ```abnf
 * obs-text = %x80-FF
 * qdtext   = HTAB / SP / %x21 / %x23-5B / %x5D-7E / obs-text
 * ```
 */
const reQdtext = /^[\t \x21\x23-\x5B\x5D-\x7E\x80-\xFF]$/;

/** Whether the input is [qdtext](https://www.rfc-editor.org/rfc/rfc9110.html#section-5.6.4-2) or not.
 *
 * @example
 * ```ts
 * import { isQdtext } from "https://deno.land/x/http_utils@$VERSION/quoted_string.ts";
 * import {
 *   assert,
 *   assertFalse,
 * } from "https://deno.land/std@$VERSION/testing/asserts.ts";
 *
 * assert(isQdtext("\t"));
 * assert(isQdtext("\xFF"));
 * assertFalse(isQdtext(`"`));
 * ```
 */
export function isQdtext(input: string): boolean {
  return reQdtext.test(input);
}
