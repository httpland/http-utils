// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

/** Check two `Headers` field name and field value equality.
 *
 * ```ts
 * import { equalsHeaders } from "https://deno.land/x/http_utils@$VERSION/header.ts";
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
 *
 * @deprecated Move to [headers-utils](https://github.com/httpland/headers-utils).
 */
export function equalsHeaders(left: Headers, right: Headers): boolean {
  const entries = [...left, ...right];

  for (const [key, value] of entries) {
    if (!left.has(key) || !right.has(key)) {
      return false;
    }

    if (left.get(key) !== value || right.get(key) !== value) {
      return false;
    }
  }

  return true;
}

/** Returns a new {@link Headers} with all entries of the given headers except the ones that have a key(header name or field name) that does not match the given predicate.
 *
 * @example
 * ```ts
 * import { filterKeys } from "https://deno.land/x/http_utils@$VERSION/header.ts";
 * import { assert } from "https://deno.land/std@$VERSION/testing/asserts.ts";
 *
 * const headers = filterKeys(
 *   new Headers({
 *     "date": "<date>",
 *     "content-type": "<content-type>",
 *   }),
 *   (key) => key.startsWith("content"),
 * );
 *
 * assert(headers.has("content-type"));
 * assert(!headers.has("date"));
 * ```
 *
 * @deprecated Move to [headers-utils](https://github.com/httpland/headers-utils).
 */
export function filterKeys(
  headers: Headers,
  predicate: (key: string) => boolean,
): Headers {
  return new Headers([...headers].filter(([key]) => predicate(key)));
}

/** HTTP Message Metadata header fields.
 * @see [RFC 9110, 6.6. Message Metadata](https://www.rfc-editor.org/rfc/rfc9110.html#section-6.6)
 *
 * @example
 * ```ts
 * import { MessageMetadataHeader } from "https://deno.land/x/http_utils@$VERSION/header.ts";
 * import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";
 *
 * assertEquals(MessageMetadataHeader.Date, "date");
 * ```
 */
export enum MessageMetadataHeader {
  /**
   * @see [RFC 9110, 6.6.1. Date](https://www.rfc-editor.org/rfc/rfc9110.html#section-6.6.1)
   */
  Date = "date",

  /**
   * @see [RFC 9110, 6.6.2. Trailer](https://www.rfc-editor.org/rfc/rfc9110.html#section-6.6.2)
   */
  Trailer = "trailer",
}

/** HTTP Message Forwarding header fields.
 * @see [RFC 9110, 7.6. Message Forwarding](https://www.rfc-editor.org/rfc/rfc9110.html#section-7.6)
 *
 * @example
 * ```ts
 * import { MessageForwardingHeader } from "https://deno.land/x/http_utils@$VERSION/header.ts";
 * import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";
 *
 * assertEquals(MessageForwardingHeader.Via, "via");
 * ```
 */
export enum MessageForwardingHeader {
  /**
   * @see [RFC 9110, 7.6.1. Connection](https://www.rfc-editor.org/rfc/rfc9110.html#section-7.6.1)
   */
  Connection = "connection",

  /**
   * @see [RFC 9110, 7.6.2. Max-Forwards](https://www.rfc-editor.org/rfc/rfc9110.html#section-7.6.2)
   */
  MaxForwards = "max-forwards",

  /**
   * @see [RFC 9110, 7.6.3. Via](https://www.rfc-editor.org/rfc/rfc9110.html#section-7.6.3)
   */
  Via = "via",
}

/** HTTP representation data and metadata header fields.
 * @see [RFC 9110, 8. Representations](https://www.rfc-editor.org/rfc/rfc9110.html#section-8)
 *
 * @example
 * ```ts
 * import { RepresentationHeader } from "https://deno.land/x/http_utils@$VERSION/header.ts";
 * import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";
 *
 * assertEquals(RepresentationHeader.ContentType, "content-type");
 * ```
 */
export enum RepresentationHeader {
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

/** HTTP Authentication header fields.
 * @see [RFC 9110, 11. HTTP Authentication](https://www.rfc-editor.org/rfc/rfc9110#section-11)
 */
export enum AuthenticationHeader {
  /**
   * @see [RFC 9110, 11.6.1. WWW-Authenticate](https://www.rfc-editor.org/rfc/rfc9110#section-11.6.1)
   */
  WWWAuthenticate = "www-authenticate",

  /**
   * @see [RFC 9110, 11.6.2. Authorization](https://www.rfc-editor.org/rfc/rfc9110#section-11.6.2)
   */
  Authorization = "authorization",

  /**
   * @see [RFC 9110, 11.6.3. Authentication-Info](https://www.rfc-editor.org/rfc/rfc9110#section-11.6.3)
   */
  AuthenticationInfo = "authentication-info",

  /**
   * @see [RFC 9110, 11.7.1. Proxy-Authenticate](https://www.rfc-editor.org/rfc/rfc9110#section-11.7.1)
   */
  ProxyAuthenticate = "proxy-authenticate",

  /**
   * @see [RFC 9110, 11.7.2. Proxy-Authorization](https://www.rfc-editor.org/rfc/rfc9110#section-11.7.2)
   */
  ProxyAuthorization = "proxy-authorization",

  /**
   * @see [RFC 9110, 11.7.3. Proxy-Authentication-Info](https://www.rfc-editor.org/rfc/rfc9110#section-11.7.3)
   */
  ProxyAuthenticationInfo = "proxy-authentication-info",
}

/** HTTP content negotiation header fields.
 * @see [RFC 9110, 12. Content Negotiation](https://www.rfc-editor.org/rfc/rfc9110#section-12)
 *
 * @example
 * ```ts
 * import { ContentNegotiationHeader } from "https://deno.land/x/http_utils@$VERSION/header.ts";
 * import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";
 *
 * assertEquals(ContentNegotiationHeader.Accept, "accept");
 * ```
 */
export enum ContentNegotiationHeader {
  /**
   * @see [RFC 9110, 12.5.1. Accept](https://www.rfc-editor.org/rfc/rfc9110#section-12.5.1)
   */
  Accept = "accept",
  /**
   * @see [RFC 9110, 12.5.2. Accept-Charset](https://www.rfc-editor.org/rfc/rfc9110#section-12.5.2)
   */
  AcceptCharset = "accept-charset",
  /**
   * @see [RFC 9110, 12.5.3. Accept-Encoding](https://www.rfc-editor.org/rfc/rfc9110#section-12.5.3)
   */
  AcceptEncoding = "accept-encoding",
  /**
   * @see [RFC 9110, 12.5.4. Accept-Language](https://www.rfc-editor.org/rfc/rfc9110#section-12.5.4)
   */
  AcceptLanguage = "accept-language",
  /**
   * @see [RFC 9110, 12.5.5. Vary](https://www.rfc-editor.org/rfc/rfc9110#section-12.5.5)
   */
  Vary = "vary",
}

/** HTTP conditional requests header fields.
 * @see [RFC 9110, 13. Conditional Requests](https://www.rfc-editor.org/rfc/rfc9110#section-13)
 *
 * @example
 * ```ts
 * import { ConditionalHeader } from "https://deno.land/x/http_utils@$VERSION/header.ts";
 * import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";
 *
 * assertEquals(ConditionalHeader.IfNoneMatch, "if-none-match");
 * ```
 */
export enum ConditionalHeader {
  /**
   * @see [RFC 9110, 13.1.1. If-Match](https://www.rfc-editor.org/rfc/rfc9110#section-13.1.1)
   */
  IfMatch = "if-match",
  /**
   * @see [RFC 9110, 13.1.2. If-None-Match](https://www.rfc-editor.org/rfc/rfc9110#section-13.1.2)
   */
  IfNoneMatch = "if-none-match",
  /**
   * @see [RFC 9110, 13.1.3. If-Modified-Since](https://www.rfc-editor.org/rfc/rfc9110#section-13.1.3)
   */
  IfModifiedSince = "if-modified-since",
  /**
   * @see [RFC 9110, 13.1.4. If-Unmodified-Since](https://www.rfc-editor.org/rfc/rfc9110#section-13.1.4)
   */
  IfUnmodifiedSince = "if-unmodified-since",
  /**
   * @see [RFC 9110, 13.1.5. If-Range](https://www.rfc-editor.org/rfc/rfc9110#section-13.1.5)
   */
  IfRange = "if-range",
}

/** HTTP range requests header fields.
 * @see [RFC 9110, 14. Range Requests](https://www.rfc-editor.org/rfc/rfc9110#section-14)
 *
 * @example
 * ```ts
 * import { RangeHeader } from "https://deno.land/x/http_utils@$VERSION/header.ts";
 * import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";
 *
 * assertEquals(RangeHeader.Range, "range");
 * ```
 */
export enum RangeHeader {
  /**
   * @see [RFC 9110, 14.2. Range](https://www.rfc-editor.org/rfc/rfc9110#section-14.2)
   */
  Range = "range",
  /**
   * @see [RFC 9110, 14.3. Accept-Ranges](https://www.rfc-editor.org/rfc/rfc9110#section-14.3)
   */
  AcceptRanges = "accept-ranges",
  /**
   * @see [RFC 9110, 14.4. Content-Range](https://www.rfc-editor.org/rfc/rfc9110#section-14.4)
   */
  ContentRange = "content-range",
}

/** HTTP Caching header fields.
 * @see [RFC 9111, HTTP Caching](https://www.rfc-editor.org/rfc/rfc9111)
 *
 * @example
 * ```ts
 * import { CachingHeader } from "https://deno.land/x/http_utils@$VERSION/header.ts";
 * import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";
 *
 * assertEquals(CachingHeader.CacheControl, "cache-control");
 * ```
 */
export enum CachingHeader {
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

const MESSAGE_METADATA_HEADERS = [
  MessageMetadataHeader.Date,
  MessageMetadataHeader.Trailer,
];

/** Whether the input is {@link MessageMetadataHeader} or not.
 *
 * @example
 * ```ts
 * import { isMessageMetadataHeader } from "https://deno.land/x/http_utils@$VERSION/header.ts";
 * import { assert } from "https://deno.land/std@$VERSION/testing/asserts.ts";
 *
 * assert(isMessageMetadataHeader("date"));
 * assert(!isMessageMetadataHeader("<others>"));
 * ```
 */
export function isMessageMetadataHeader(
  input: string,
): input is `${MessageMetadataHeader}` {
  return (MESSAGE_METADATA_HEADERS as string[]).includes(input);
}

const MESSAGE_FORWARDING_HEADERS = [
  MessageForwardingHeader.Connection,
  MessageForwardingHeader.MaxForwards,
  MessageForwardingHeader.Via,
];

/** Whether the input is {@link MessageForwardingHeader} or not.
 *
 * @example
 * ```ts
 * import { isMessageForwardingHeader } from "https://deno.land/x/http_utils@$VERSION/header.ts";
 * import { assert } from "https://deno.land/std@$VERSION/testing/asserts.ts";
 *
 * assert(isMessageForwardingHeader("connection"));
 * assert(!isMessageForwardingHeader("<others>"));
 * ```
 */
export function isMessageForwardingHeader(
  input: string,
): input is `${MessageForwardingHeader}` {
  return (MESSAGE_FORWARDING_HEADERS as string[]).includes(input);
}

const REPRESENTATION_HEADERS = [
  RepresentationHeader.ContentEncoding,
  RepresentationHeader.ContentLanguage,
  RepresentationHeader.ContentLength,
  RepresentationHeader.ContentLocation,
  RepresentationHeader.ContentType,
  RepresentationHeader.ETag,
  RepresentationHeader.LastModified,
];

/** Whether the input is {@link RepresentationHeader} or not.
 *
 * @example
 * ```ts
 * import { isRepresentationHeader } from "https://deno.land/x/http_utils@$VERSION/header.ts";
 * import { assert } from "https://deno.land/std@$VERSION/testing/asserts.ts";
 *
 * assert(isRepresentationHeader("content-type"));
 * assert(!isRepresentationHeader("<others>"));
 * ```
 */
export function isRepresentationHeader(
  input: string,
): input is `${RepresentationHeader}` {
  return (REPRESENTATION_HEADERS as string[]).includes(input);
}

const AUTHENTICATION_HEADERS = [
  AuthenticationHeader.AuthenticationInfo,
  AuthenticationHeader.Authorization,
  AuthenticationHeader.ProxyAuthenticate,
  AuthenticationHeader.ProxyAuthenticationInfo,
  AuthenticationHeader.ProxyAuthorization,
  AuthenticationHeader.WWWAuthenticate,
];

/** Whether the input is {@link AuthenticationHeader} or not.
 *
 * @example
 * ```ts
 * import { isAuthenticationHeader } from "https://deno.land/x/http_utils@$VERSION/header.ts";
 * import { assert } from "https://deno.land/std@$VERSION/testing/asserts.ts";
 *
 * assert(isAuthenticationHeader("authorization"));
 * assert(!isAuthenticationHeader("<others>"));
 * ```
 */
export function isAuthenticationHeader(
  input: string,
): input is `${AuthenticationHeader}` {
  return (AUTHENTICATION_HEADERS as string[]).includes(input);
}

const CONTENT_NEGOTIATION_HEADERS = [
  ContentNegotiationHeader.Accept,
  ContentNegotiationHeader.AcceptCharset,
  ContentNegotiationHeader.AcceptEncoding,
  ContentNegotiationHeader.AcceptLanguage,
  ContentNegotiationHeader.Vary,
];

/** Whether the input is {@link ContentNegotiationHeader} or not.
 *
 * @example
 * ```ts
 * import { isContentNegotiationHeader } from "https://deno.land/x/http_utils@$VERSION/header.ts";
 * import { assert } from "https://deno.land/std@$VERSION/testing/asserts.ts";
 *
 * assert(isContentNegotiationHeader("accept"));
 * assert(!isContentNegotiationHeader("<others>"));
 * ```
 */
export function isContentNegotiationHeader(
  input: string,
): input is `${ContentNegotiationHeader}` {
  return (CONTENT_NEGOTIATION_HEADERS as string[]).includes(input);
}

const CONDITIONAL_HEADERS = [
  ConditionalHeader.IfMatch,
  ConditionalHeader.IfModifiedSince,
  ConditionalHeader.IfNoneMatch,
  ConditionalHeader.IfRange,
  ConditionalHeader.IfUnmodifiedSince,
];

/** Whether the input is {@link ConditionalHeader} or not.
 *
 * @example
 * ```ts
 * import { isConditionalHeader } from "https://deno.land/x/http_utils@$VERSION/header.ts";
 * import { assert } from "https://deno.land/std@$VERSION/testing/asserts.ts";
 *
 * assert(isConditionalHeader("if-match"));
 * assert(!isConditionalHeader("<others>"));
 * ```
 */
export function isConditionalHeader(
  input: string,
): input is `${ConditionalHeader}` {
  return (CONDITIONAL_HEADERS as string[]).includes(input);
}

const RANGE_HEADERS = [
  RangeHeader.AcceptRanges,
  RangeHeader.ContentRange,
  RangeHeader.Range,
];

/** Whether the input is {@link RangeHeader} or not.
 *
 * @example
 * ```ts
 * import { isRangeHeader } from "https://deno.land/x/http_utils@$VERSION/header.ts";
 * import { assert } from "https://deno.land/std@$VERSION/testing/asserts.ts";
 *
 * assert(isRangeHeader("range"));
 * assert(!isRangeHeader("<others>"));
 * ```
 */
export function isRangeHeader(input: string): input is `${RangeHeader}` {
  return (RANGE_HEADERS as string[]).includes(input);
}

const CACHING_HEADERS = [
  CachingHeader.Age,
  CachingHeader.CacheControl,
  CachingHeader.Expires,
];

/** Whether the input is {@link CachingHeader} or not.
 *
 * @example
 * ```ts
 * import { isCachingHeader } from "https://deno.land/x/http_utils@$VERSION/header.ts";
 * import { assert } from "https://deno.land/std@$VERSION/testing/asserts.ts";
 *
 * assert(isCachingHeader("age"));
 * assert(!isCachingHeader("<others>"));
 * ```
 */
export function isCachingHeader(input: string): input is `${CachingHeader}` {
  return (CACHING_HEADERS as string[]).includes(input);
}
