// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

import { trim } from "./deps.ts";

/** Parse [list-based fields](https://www.rfc-editor.org/rfc/rfc9110.html#section-5.5-7) into array.
 * Strings enclosed in double quotes are safely handled.
 *
 * @example
 * ```ts
 * import { parseListFields } from "https://deno.land/x/http_utils@$VERSION/list.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * assertEquals(parseListFields("foo , ,bar,charlie"), [
 *   "foo",
 *   "bar",
 *   "charlie",
 * ]);
 * assertEquals(parseListFields(`"Sat, 04 May 1996", "Wed, 14 Sep 2005"`), [
 *   `"Sat, 04 May 1996"`,
 *   `"Wed, 14 Sep 2005"`,
 * ]);
 * ```
 */
export function parseListFields(input: string): string[] {
  return input
    .split(/,(?=(?:(?:[^"]*?"){2})*?[^"]*?$)/)
    .map(trim)
    .filter(Boolean);
}
