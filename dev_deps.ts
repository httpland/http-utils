export { describe, it } from "https://deno.land/std@0.178.0/testing/bdd.ts";
export {
  assert,
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.178.0/testing/asserts.ts";
import {
  defineExpect,
  jestMatcherMap,
} from "https://deno.land/x/unitest@v1.0.0-beta.82/mod.ts";
export { fn } from "https://deno.land/x/unitest@v1.0.0-beta.82/mod.ts";
import { equalsHeaders } from "./header.ts";
import { equalsResponse } from "./response.ts";
import { AssertionError } from "https://deno.land/std@0.159.0/testing/asserts.ts";

// deno-lint-ignore no-explicit-any
export type Fn<F extends (...args: any) => any> = [
  ...Parameters<F>,
  ReturnType<F>,
];

export const expect = defineExpect({
  matcherMap: {
    ...jestMatcherMap,
    toEqualHeaders: (actual: Headers, expected: Headers) => {
      return {
        pass: equalsHeaders(actual, expected),
        expected,
      };
    },
  },
});

export async function assertEqualsResponse(
  actual: Response,
  expected: Response,
  message?: string,
): Promise<void> {
  if (!await equalsResponse(actual, expected)) {
    throw new AssertionError(
      message ??
        `Not equal response.
    actual:
      ${Deno.inspect(actual)}
    expected:
      ${Deno.inspect(expected)}`,
    );
  }
}
