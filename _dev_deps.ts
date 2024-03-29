export { describe, it } from "https://deno.land/std@0.181.0/testing/bdd.ts";
export {
  assert,
  assertEquals,
  assertFalse,
  assertRejects,
  assertThrows,
} from "https://deno.land/std@0.181.0/testing/asserts.ts";

// deno-lint-ignore no-explicit-any
export type Fn<F extends (...args: any) => any> = [
  ...Parameters<F>,
  ReturnType<F>,
];
