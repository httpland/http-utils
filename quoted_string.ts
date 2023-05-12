// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

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
 * } from "https://deno.land/std/testing/asserts.ts";
 *
 * assert(isQdtext("\t"));
 * assert(isQdtext("\xFF"));
 * assertFalse(isQdtext(`"`));
 * ```
 */
export function isQdtext(input: string): boolean {
  return reQdtext.test(input);
}

/**
 * ```abnf
 * obs-text = %x80-FF
 * quoted-pair = "\" ( HTAB / SP / VCHAR / obs-text )
 * ```
 */
const reQuotedPair = /^\\[\t \x21-\x7E\x80-\xFF]$/;

/** [Quoted pair](https://www.rfc-editor.org/rfc/rfc9110.html#section-5.6.4-4). */
export type QuotedPair = `\\${string}`;

/** Whether the input is [quoted-pair](https://www.rfc-editor.org/rfc/rfc9110.html#section-5.6.4-4) or not.
 *
 * @example
 * ```ts
 * import { isQuotedPair } from "https://deno.land/x/http_utils@$VERSION/quoted_string.ts";
 * import {
 *   assert,
 *   assertFalse,
 * } from "https://deno.land/std/testing/asserts.ts";
 *
 * assert(isQuotedPair("\\\t"));
 * assert(isQuotedPair("\\\xFF"));
 * assertFalse(isQuotedPair("\\"));
 * ```
 */
export function isQuotedPair(input: string): input is QuotedPair {
  return reQuotedPair.test(input);
}

/** [quoted-string](https://www.rfc-editor.org/rfc/rfc9110.html#section-5.6.4-2). */
export type QuotedString = `"${string}"`;

/**
 * ```abnf
 * quoted-string  = DQUOTE *( qdtext / quoted-pair ) DQUOTE
 * qdtext         = HTAB / SP / %x21 / %x23-5B / %x5D-7E / obs-text
 * quoted-pair    = "\" ( HTAB / SP / VCHAR / obs-text )
 * obs-text       = %x80-FF
 * ```
 */
const reQuotedString =
  /^"(?:[\t \x21\x23-\x5B\x5D-\x7E\x80-\xFF]|\\[\t \x21-\x7E\x80-\xFF])*?"$/;

/** Whether the input is [quoted-string](https://www.rfc-editor.org/rfc/rfc9110.html#section-5.6.4-2) or not.
 *
 * @example
 * ```ts
 * import { isQuotedString } from "https://deno.land/x/http_utils@$VERSION/quoted_string.ts";
 * import {
 *   assert,
 *   assertFalse,
 * } from "https://deno.land/std/testing/asserts.ts";
 *
 * assert(isQuotedString(`""`));
 * assert(isQuotedString(`"qdtext"`));
 * assert(isQuotedString(`"quoted-pair"`));
 * assertFalse(isQuotedString(""));
 * ```
 */
export function isQuotedString(input: string): input is QuotedString {
  return reQuotedString.test(input);
}
