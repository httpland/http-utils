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

/** Merge two `Headers` object.
 * The first `Headers` always takes precedence.
 * When fields conflict, the first `Headers` takes precedence if it is a singleton
 * field.
 * If it is a list-based field and not empty, it is appended to the first `Headers`
 * field.
 * Invalid field names and field values are ignored.
 * No destructive operation is performed on the arguments and returns a new
 * `Headers` object.
 *
 * ```ts
 * import { mergeHeaders } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
 * import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";
 *
 * assertEquals(
 *   mergeHeaders(
 *     new Headers({ accept: "text/html" }),
 *     new Headers({ accept: "application/json", "content-type": "text/plain" }),
 *   ),
 *   new Headers({
 *     accept: "text/html, application/json",
 *     "content-type": "text/plain",
 *   }),
 * );
 * assertEquals(
 *   mergeHeaders(
 *     new Headers({ origin: "http://test.test" }),
 *     new Headers({ origin: "http://example.test" }),
 *   ),
 *   new Headers({ origin: "http://test.test" }),
 * );
 * // origin is singleton field
 * ```
 */
export function mergeHeaders(
  primaryHeaders: Headers,
  newHeaders: Headers,
): Headers {
  primaryHeaders = new Headers(primaryHeaders);
  newHeaders = new Headers(newHeaders);

  newHeaders.forEach((value, key) => {
    if (!value) return;
    const has = primaryHeaders.has(key);
    if (has && isSingletonField(key)) return;

    try {
      primaryHeaders.append(key, value);
    } catch {
      // When the key is invalid header name, throw error.
      // But just ignore it.
    }
  });

  return primaryHeaders;
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
