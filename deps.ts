export { Status, STATUS_TEXT } from "https://deno.land/std@0.155.0/http/mod.ts";

export function toLowerCase<T extends string>(value: T): Lowercase<T> {
  return value.toLowerCase() as Lowercase<T>;
}
