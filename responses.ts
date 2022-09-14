import { Status, STATUS_TEXT } from "./deps.ts";
import { equalsHeaders } from "./headers.ts";

/** Safely returns a Response object.
 * Wraps operations that may cause errors and returns a 500 internal server error response if an error occurs.
 *
 * ```ts
 * import { safeResponse } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
 * import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";
 *
 * const successRes = await safeResponse(() => new Response());
 * assertEquals(successRes.status, 200);
 *
 * const res = await safeResponse(() => {
 *   throw Error();
 * });
 * assertEquals(res.status, 500);
 * ```
 */
export async function safeResponse(
  fn: () => Response | Promise<Response>,
  debug = false,
): Promise<Response> {
  try {
    return await fn();
  } catch (e) {
    const body: string | null = debug ? Deno.inspect(e) : null;
    return new Response(body, {
      status: Status.InternalServerError,
      statusText: STATUS_TEXT[Status.InternalServerError],
    });
  }
}

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
