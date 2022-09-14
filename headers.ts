import { toLowerCase } from "./deps.ts";

const SingletonFields: string[] = [
  "Access-Control-Allow-Origin",
  "Authorization",
  "Content-Language",
  "Content-Length",
  "Content-Location",
  "Content-Range",
  "Content-Type",
  "Date",
  "ETag",
  "Expect",
  "From",
  "Host",
  "If-Modified-Since",
  "If-Range",
  "If-Unmodified-Since",
  "Last-Modified",
  "Location",
  "Max-Forwards",
  "Origin",
  "Range",
  "Referer",
  "Retry-After",
  "Server",
  "User-Agent",
  "Proxy-Authorization",
  "Age",
  "Expires",
];

/** Weather the field is singleton field or not.
 *
 * ```ts
 * import { isSingletonField } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
 * import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";
 *
 * assertEquals(isSingletonField("Origin"), true);
 * assertEquals(isSingletonField("Vary"), false);
 * ```
 */
export function isSingletonField(
  fieldName: string,
): boolean {
  return SingletonFields.map(toLowerCase).includes(
    toLowerCase(fieldName),
  );
}

/** Check two `Headers` field name and field value equality.
 *
 * ```ts
 * import { equalsHeaders } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
 * import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";
 *
 * assertEquals(
 *   equalsHeaders(new Headers({ a: "b" }), new Headers({ a: "b" })),
 *   true,
 * );
 * assertEquals(
 *   equalsHeaders(new Headers({ a: "b" }), new Headers({ c: "d" })),
 *   false,
 * );
 * ```
 */
export function equalsHeaders(a: Headers, b: Headers): boolean {
  const header = [...a, ...b];
  for (const [key, value] of header) {
    if (!a.has(key) || !b.has(key)) {
      return false;
    }
    if (a.get(key) !== value || b.get(key) !== value) {
      return false;
    }
  }

  return true;
}
