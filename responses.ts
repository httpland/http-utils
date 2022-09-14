import { equalsHeaders } from "./headers.ts";

/** Check two `Response` fields equality.
 *
 * ```ts
 * import { equalsResponse } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
 * import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";
 *
 * assertEquals(
 *   equalsResponse(
 *     new Response(null, { status: 204, headers: { "content-length": "0" } }),
 *     new Response(null, { status: 204, headers: { "content-length": "0" } }),
 *   ),
 *   true,
 * );
 * assertEquals(
 *   equalsResponse(new Response(), new Response(null, { status: 500 })),
 *   false,
 * );
 * ```
 */
export function equalsResponse(a: Response, b: Response): boolean {
  return a.ok === b.ok &&
    a.bodyUsed === b.bodyUsed &&
    a.redirected === b.redirected &&
    a.status === b.status &&
    a.statusText === b.statusText &&
    a.type === b.type &&
    a.url === b.url &&
    equalsHeaders(a.headers, b.headers);
}
