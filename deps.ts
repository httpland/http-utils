export {
  Status,
  STATUS_TEXT,
} from "https://deno.land/std@0.155.0/http/http_status.ts";
export { isTruthy } from "https://deno.land/x/isx@1.0.0-beta.21/mod.ts";
export { default as db } from "https://deno.land/x/http_header_db@1.0.0-beta.1/db.json" assert { type: "json" };

export function toLowerCase<T extends string>(value: T): Lowercase<T> {
  return value.toLowerCase() as Lowercase<T>;
}

export function trim(value: string): string {
  return value.trim();
}
