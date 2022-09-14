export * from "https://deno.land/std@0.155.0/testing/bdd.ts";
export { expect } from "https://deno.land/x/unitest@v1.0.0-beta.82/mod.ts";

// deno-lint-ignore no-explicit-any
export type Fn<F extends (...args: any) => any> = [
  ...Parameters<F>,
  ReturnType<F>,
];
