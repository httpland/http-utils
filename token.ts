// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

type _Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type UppercaseLetter =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z";
type LowercaseLetter = Lowercase<UppercaseLetter>;

/** Alphabet letter. */
export type Alpha = UppercaseLetter | LowercaseLetter;

/** Digit letter. */
export type Digit = `${_Digit}`;

/** [tchar](https://www.rfc-editor.org/rfc/rfc9110.html#section-5.6.2-2) letter. */
export type Tchar =
  | "!"
  | "#"
  | "$"
  | "%"
  | "&"
  | "'"
  | "*"
  | "+"
  | "-"
  | "."
  | "^"
  | "_"
  | "`"
  | "|"
  | "~"
  | Digit
  | Alpha;

/**
 * ```abnf
 * token = 1*tchar
 * ```
 */
const reToken = /^[\w!#$%&'*+.^`|~-]+$/;

/** Whether the input is [token](https://www.rfc-editor.org/rfc/rfc9110.html#section-5.6.2-2) or not.
 *
 * @example
 * ```ts
 * import { isToken } from "https://deno.land/x/http_utils@$VERSION/token.ts";
 * import {
 *   assert,
 *   assertFalse,
 * } from "https://deno.land/std@$VERSION/testing/asserts.ts";
 *
 * assert(isToken("token"));
 * assert(isTchar("*!~"));
 * assertFalse(isToken(""));
 * ```
 */
export function isToken(input: string): boolean {
  return reToken.test(input);
}

/**
 * ```abnf
 * tchar = "!" / "#" / "$" / "%" / "&" / "'" / "*"
 *          / "+" / "-" / "." / "^" / "_" / "`" / "|" / "~"
 *          / DIGIT / ALPHA
 *          ; any VCHAR, except delimiters
 * ```
 */
const reTchar = /^[\w!#$%&'*+.^`|~-]$/;

/** Whether the input is [tchar](https://www.rfc-editor.org/rfc/rfc9110.html#section-5.6.2-2) or not.
 *
 * @example
 * ```ts
 * import { isTchar } from "https://deno.land/x/http_utils@$VERSION/token.ts";
 * import {
 *   assert,
 *   assertFalse,
 * } from "https://deno.land/std@$VERSION/testing/asserts.ts";
 *
 * assert(isTchar("!"));
 * assert(isTchar("a"));
 * assert(isTchar("Z"));
 * assertFalse(isTchar(""));
 * ```
 */
export function isTchar(input: string): input is Tchar {
  return reTchar.test(input);
}
