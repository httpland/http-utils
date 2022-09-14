/** Check two `Headers` field name and field value equality.
 *
 * ```ts
 * import { equalsHeaders } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
 * import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";
 *
 * assertEquals(
 *   equalsHeaders(new Header({ a: "b" }), new Header({ a: "b" })),
 *   true,
 * );
 * assertEquals(
 *   equalsHeaders(new Header({ a: "b" }), new Header({ c: "d" })),
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
