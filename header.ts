// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

import { db } from "./deps.ts";

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
  fieldName = fieldName.toLowerCase();
  const field = db[fieldName as keyof typeof db] as { listable?: boolean };

  return !field?.listable;
}

/** Wellknown HTTP field name. */
export type HttpFieldName = keyof typeof db;

/** Header merge options. */
export interface MergeHeadersOptions {
  /** Merging definition map. */
  readonly definitions?: Definitions;
}

export type Definitions =
  | {
    [k in string]: MergeFn;
  }
  | {
    [k in HttpFieldName]: MergeFn;
  };

/** Custom merge definition. */
export type MergeFn = (
  sourceFieldValue: string,
  destinationFieldValue: string,
) => string;

const defaultMergeFn: MergeFn = (sourceFieldValue, destinationFieldValue) =>
  [sourceFieldValue, destinationFieldValue].join(", ");

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
  source: Headers,
  destination: Headers,
  { definitions }: MergeHeadersOptions = {},
): Headers | TypeError {
  try {
    source = new Headers(source);
    destination = new Headers(destination);
  } catch (e) {
    return e as TypeError;
  }

  try {
    destination.forEach((destinationFieldValue, fieldName) => {
      if (!destinationFieldValue) return;

      const has = source.has(fieldName);

      if (!has) {
        source.append(fieldName, destinationFieldValue);
        return;
      }

      if (isSingletonField(fieldName)) return;

      const sourceFieldValue = source.get(fieldName)!;
      const mergeFn = definitions?.[fieldName as HttpFieldName] ??
        defaultMergeFn;
      const fieldValue = mergeFn(sourceFieldValue, destinationFieldValue);

      source.set(fieldName, fieldValue);
    });
  } catch (e) {
    return e as TypeError;
  }

  return source;
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

/** Parse the header field value.
 * Split field values by `<quoted-string>` or `<token>`.
 *
 * ```ts
 * import { parseFieldValue } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
 * import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";
 *
 * assertEquals(
 *   parseFieldValue("text/html, image/webp;q=0.8"),
 *   ["text/html", "image/webp;q=0.8"],
 * );
 * assertEquals(parseFieldValue(`"Sat, 04 May 1996", "Wed, 14 Sep 2005"`), [
 *   `"Sat, 04 May 1996"`,
 *   `"Wed, 14 Sep 2005"`,
 * ]);
 * ```
 */
export function parseFieldValue(fieldValue: string): string[] {
  return (fieldValue.match(/((".+?")|[^,])*/g) ??
    []).map((value) => value.trim()).filter(Boolean);
}

/** Representation header fields provide metadata about the representation.
 * @see [RFC 9110, 3.2. Representations](https://www.rfc-editor.org/rfc/rfc9110.html#section-3.2)
 */
export const enum RepresentationHeader {
  /**
   * @see [RFC 9110, 8.3. Content-Type](https://www.rfc-editor.org/rfc/rfc9110.html#section-8.3)
   */
  ContentType = "content-type",

  /**
   * @see [RFC 9110, 8.4. Content-Encoding](https://www.rfc-editor.org/rfc/rfc9110.html#section-8.4)
   */
  ContentEncoding = "content-encoding",

  /**
   * @see [RFC 9110, 8.5. Content-Language](https://www.rfc-editor.org/rfc/rfc9110.html#section-8.5)
   */
  ContentLanguage = "content-language",

  /**
   * @see [RFC 9110, 8.6. Content-Length](https://www.rfc-editor.org/rfc/rfc9110.html#section-8.6)
   */
  ContentLength = "content-length",

  /**
   * @see [RFC 9110, 8.7. Content-Location](https://www.rfc-editor.org/rfc/rfc9110.html#section-8.7)
   */
  ContentLocation = "content-location",

  /**
   * @see [RFC 9110, 8.8.2. Last-Modified](https://www.rfc-editor.org/rfc/rfc9110.html#section-8.8.2)
   */
  LastModified = "last-modified",

  /**
   * @see [RFC 9110, 8.8.3. ETag](https://www.rfc-editor.org/rfc/rfc9110.html#section-8.8.3)
   */
  ETag = "etag",
}

/** Caching header represents a header filed for HTTP caching.
 * @see [RFC 9111, HTTP Caching](https://www.rfc-editor.org/rfc/rfc9111)
 */
export const enum CachingHeader {
  /**
   * @see [RFC 9111, 5.1. Age](https://www.rfc-editor.org/rfc/rfc9111#section-5.1)
   */
  Age = "age",

  /**
   * @see [RFC 9111, 5.2. Cache-Control](https://www.rfc-editor.org/rfc/rfc9111#section-5.2)
   */
  CacheControl = "cache-control",

  /**
   * @see [RFC 9111, 5.3. Expires](https://www.rfc-editor.org/rfc/rfc9111#section-5.3)
   */
  Expires = "expires",
}
