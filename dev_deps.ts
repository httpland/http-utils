export * from "https://deno.land/std@0.155.0/testing/bdd.ts";
import {
  defineExpect,
  jestMatcherMap,
} from "https://deno.land/x/unitest@v1.0.0-beta.82/mod.ts";
export { fn } from "https://deno.land/x/unitest@v1.0.0-beta.82/mod.ts";
import { equalsHeaders } from "./headers.ts";
import { equalsResponse } from "./responses.ts";

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
    toEqualResponse: (actual: Response, expected: Response) => {
      return {
        pass: equalsResponse(actual, expected),
        expected,
      };
    },
  },
});
