# http-utils

[![deno land](http://img.shields.io/badge/available%20on-deno.land/x-lightgrey.svg?logo=deno)](https://deno.land/x/http_utils)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/httpland/http-utils)](https://github.com/httpland/http-utils/releases)
[![codecov](https://codecov.io/github/httpland/http-utils/branch/main/graph/badge.svg)](https://codecov.io/gh/httpland/http-utils)
[![GitHub](https://img.shields.io/github/license/httpland/http-utils)](https://github.com/httpland/http-utils/blob/main/LICENSE)

[![test](https://github.com/httpland/http-utils/actions/workflows/test.yaml/badge.svg)](https://github.com/httpland/http-utils/actions/workflows/test.yaml)
[![NPM](https://nodei.co/npm/@httpland/http-utils.png?mini=true)](https://nodei.co/npm/@httpland/http-utils/)

HTTP utility collection.

Compliant with [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110).

## Request

Utilities for `Request` object.

### equalsRequest

Check two `Request` fields equality.

```ts
import { equalsRequest } from "https://deno.land/x/http_utils@$VERSION/request.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";

declare const url: URL;

assert(
  equalsRequest(
    new Request(url, { method: "HEAD" }),
    new Request(url, { method: "HEAD" }),
  ),
);
```

If you also want to check the equivalence of the body, set the mode to strict.

```ts
import { equalsRequest } from "https://deno.land/x/http_utils@$VERSION/request.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";

declare const url: URL;

assert(
  await equalsRequest(
    new Request(url, { body: "", method: "POST" }),
    new Request(url, { body: "", method: "POST" }),
    true,
  ),
);
```

#### Throwing error

In strict mode, if request body has already been read.

```ts
import { equalsRequest } from "https://deno.land/x/http_utils@$VERSION/request.ts";
import { assert, assertThrows } from "https://deno.land/std/testing/asserts.ts";

declare const url: URL;
const request = new Request(url, { body: "" });
await request.text();

assert(request.bodyUsed);
assertThrows(() => equalsRequest(request, request, true));
```

### isRequest

Whether the input is `Request` or not.

```ts
import { isRequest } from "https://deno.land/x/http_utils@$VERSION/request.ts";
import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assertEquals(isRequest(new Request("http://localhost")), true);
assertEquals(isRequest({}), false);
assertEquals(isRequest(null), false);
```

## Response

Utilities for `Response` object.

### equalsResponse

Check two `Response` fields equality.

```ts
import { equalsResponse } from "https://deno.land/x/http_utils@$VERSION/response.ts";
import { assert } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assert(
  equalsResponse(
    new Response(null, { status: 204, headers: { "content-length": "0" } }),
    new Response(null, { status: 204, headers: { "content-length": "0" } }),
  ),
);
```

If you also want to check the equivalence of the body, set the mode to strict.

```ts
import { equalsResponse } from "https://deno.land/x/http_utils@$VERSION/response.ts";
import { assert } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assert(
  await equalsResponse(
    new Response("test1", { status: 200, headers: { "content-length": "5" } }),
    new Response("test2", { status: 200, headers: { "content-length": "5" } }),
    true,
  ),
);
```

#### Throwing error

In strict mode, if response body has already been read.

```ts
import { equalsResponse } from "https://deno.land/x/http_utils@$VERSION/response.ts";
import {
  assert,
  assertThrows,
} from "https://deno.land/std@$VERSION/testing/asserts.ts";

const response = new Response("");
await response.text();

assert(response.bodyUsed);
assertThrows(() => equalsResponse(response, response, true));
```

### isResponse

Whether the input is `Response` or not.

```ts
import { isResponse } from "https://deno.land/x/http_utils@$VERSION/response.ts";
import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assertEquals(isResponse(new Response()), true);
assertEquals(isResponse({}), false);
assertEquals(isResponse(null), false);
```

## Headers

Utilities for `Headers` object.

### equalsHeaders

Check two `Headers` field name and field value equality.

```ts
import { equalsHeaders } from "https://deno.land/x/http_utils@$VERSION/header.ts";
import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assertEquals(
  equalsHeaders(new Headers({ a: "b" }), new Headers({ a: "b" })),
  true,
);
assertEquals(
  equalsHeaders(new Headers({ a: "b" }), new Headers({ c: "d" })),
  false,
);
```

### filterKeys

Returns a new `Headers` with all entries of the given headers except the ones
that have a key(header name or field name) that does not match the given
predicate.

```ts
import { filterKeys } from "https://deno.land/x/http_utils@$VERSION/header.ts";
import { assert } from "https://deno.land/std@$VERSION/testing/asserts.ts";

const headers = filterKeys(
  new Headers({
    "date": "<date>",
    "content-type": "<content-type>",
  }),
  (key) => key.startsWith("content"),
);

assert(headers.has("content-type"));
assert(!headers.has("date"));
```

### isMessageMetadataHeader

Whether the input is [MessageMetadataHeader](#messagemetadataheader) or not.

```ts
import { isMessageMetadataHeader } from "https://deno.land/x/http_utils@$VERSION/header.ts";
import { assert } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assert(isMessageMetadataHeader("date"));
assert(!isMessageMetadataHeader("<others>"));
```

### isMessageForwardingHeader

Whether the input is [MessageForwardingHeader](#messageforwardingheader) or not.

```ts
import { isMessageForwardingHeader } from "https://deno.land/x/http_utils@$VERSION/header.ts";
import { assert } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assert(isMessageForwardingHeader("connection"));
assert(!isMessageForwardingHeader("<others>"));
```

### isRepresentationHeader

Whether the input is [RepresentationHeader](#representationheader) or not.

```ts
import { isRepresentationHeader } from "https://deno.land/x/http_utils@$VERSION/header.ts";
import { assert } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assert(isRepresentationHeader("content-type"));
assert(!isRepresentationHeader("<others>"));
```

### isAuthenticationHeader

Whether the input is [AuthenticationHeader](#authenticationheader) or not.

```ts
import { isAuthenticationHeader } from "https://deno.land/x/http_utils@$VERSION/header.ts";
import { assert } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assert(isAuthenticationHeader("authorization"));
assert(!isAuthenticationHeader("<others>"));
```

### isContentNegotiationHeader

Whether the input is [ContentNegotiationHeader](#contentnegotiationheader) or
not.

```ts
import { isContentNegotiationHeader } from "https://deno.land/x/http_utils@$VERSION/header.ts";
import { assert } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assert(isContentNegotiationHeader("accept"));
assert(!isContentNegotiationHeader("<others>"));
```

### isConditionalHeader

Whether the input is [ConditionalHeader](#conditionalheader) or not.

```ts
import { isConditionalHeader } from "https://deno.land/x/http_utils@$VERSION/header.ts";
import { assert } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assert(isConditionalHeader("if-match"));
assert(!isConditionalHeader("<others>"));
```

### isRangeHeader

Whether the input is [RangeHeader](#rangeheader) or not.

```ts
import { isRangeHeader } from "https://deno.land/x/http_utils@$VERSION/header.ts";
import { assert } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assert(isRangeHeader("range"));
assert(!isRangeHeader("<others>"));
```

### isCachingHeader

Whether the input is [CachingHeader](#cachingheader) or not.

```ts
import { isCachingHeader } from "https://deno.land/x/http_utils@$VERSION/header.ts";
import { assert } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assert(isCachingHeader("age"));
assert(!isCachingHeader("<others>"));
```

### MessageMetadataHeader

HTTP Message Metadata header fields.

Compliant with
[RFC 9110, 6.6. Message Metadata](https://www.rfc-editor.org/rfc/rfc9110.html#section-6.6).

- Date
- Trailer

```ts
import { MessageMetadataHeader } from "https://deno.land/x/http_utils@$VERSION/header.ts";
import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assertEquals(MessageMetadataHeader.Date, "date");
```

### MessageForwardingHeader

HTTP Message Forwarding header fields.

Compliant with
[RFC 9110, 7.6. Message Forwarding](https://www.rfc-editor.org/rfc/rfc9110.html#section-7.6).

- Connection
- Max-Forwards
- Via

```ts
import { MessageForwardingHeader } from "https://deno.land/x/http_utils@$VERSION/header.ts";
import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assertEquals(MessageForwardingHeader.Via, "via");
```

### RepresentationHeader

HTTP representation data and metadata header fields.

Compliant with
[RFC 9110, 8. Representations](https://www.rfc-editor.org/rfc/rfc9110.html#section-8).

- Content-Type
- Content-Encoding
- Content-Language
- Content-Length
- Content-Location
- Last-Modified
- ETag

```ts
import { RepresentationHeader } from "https://deno.land/x/http_utils@$VERSION/header.ts";
import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assertEquals(RepresentationHeader.ContentType, "content-type");
```

### AuthenticationHeader

HTTP Authentication header fields.

Compliant with
[RFC 9110, 11. HTTP Authentication](https://www.rfc-editor.org/rfc/rfc9110#section-11).

- WWW-Authenticate
- Authorization
- Authentication-Info
- Proxy-Authenticate
- Proxy-Authorization
- Proxy-Authentication-Info

```ts
import { AuthenticationHeader } from "https://deno.land/x/http_utils@$VERSION/header.ts";
import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assertEquals(AuthenticationHeader.Authorization, "authorization");
```

### ContentNegotiationHeader

HTTP content negotiation header fields.

Compliant with
[RFC 9110, 12. Content Negotiation](https://www.rfc-editor.org/rfc/rfc9110#section-12).

- Accept
- Accept-Charset
- Accept-Encoding
- Accept-Language
- Vary

```ts
import { ContentNegotiationHeader } from "https://deno.land/x/http_utils@$VERSION/header.ts";
import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assertEquals(ContentNegotiationHeader.Accept, "accept");
```

### ConditionalHeader

HTTP conditional requests header fields.

Compliant with
[RFC 9110, 13. Conditional Requests](https://www.rfc-editor.org/rfc/rfc9110#section-13).

- If-Match
- If-None-Match
- If-Modified-Since
- If-Unmodified-Since
- If-Range

```ts
import { ConditionalHeader } from "https://deno.land/x/http_utils@$VERSION/header.ts";
import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assertEquals(ConditionalHeader.IfNoneMatch, "if-none-match");
```

### RangeHeader

HTTP range requests header fields.

Compliant with
[RFC 9110, 14. Range Requests](https://www.rfc-editor.org/rfc/rfc9110#section-14).

- Range
- Accept-Ranges
- Content-Range

```ts
import { RangeHeader } from "https://deno.land/x/http_utils@$VERSION/header.ts";
import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assertEquals(RangeHeader.Range, "range");
```

### CachingHeader

HTTP Caching header fields.

Compliant with [RFC 9111, HTTP Caching](https://www.rfc-editor.org/rfc/rfc9111).

- Age
- Cache-Control
- Expires

```ts
import { CachingHeader } from "https://deno.land/x/http_utils@$VERSION/header.ts";
import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assertEquals(CachingHeader.CacheControl, "cache-control");
```

## Method

Utilities for HTTP method.

### isSafeMethod

Whether the method is safe method or not.

Defined in
[RFC 9110, 9.2.1. Safe Methods](https://www.rfc-editor.org/rfc/rfc9110.html#name-safe-methods).

```ts
import { isSafeMethod } from "https://deno.land/x/http_utils@$VERSION/method.ts";
import { assert } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assert(isSafeMethod("GET"));
assert(isSafeMethod("HEAD"));
assert(isSafeMethod("OPTIONS"));
assert(isSafeMethod("TRACE"));
```

### isIdempotentMethod

Whether the method is idempotent method or not.

Defined in
[RFC 9110, 9.2.2 Idempotent Methods](https://www.rfc-editor.org/rfc/rfc9110.html#name-idempotent-methods).

```ts
import { isIdempotentMethod } from "https://deno.land/x/http_utils@$VERSION/method.ts";
import { assert } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assert(isIdempotentMethod("GET"));
assert(isIdempotentMethod("PUT"));
assert(isIdempotentMethod("DELETE"));
```

### isRetrieveMethod

Whether the method is retrieve method or not.

Retrieve method is following:

- GET
- HEAD

```ts
import { isRetrieveMethod } from "https://deno.land/x/http_utils@$VERSION/method.ts";
import { assert } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assert(isRetrieveMethod("GET"));
assert(isRetrieveMethod("HEAD"));
assert(!isRetrieveMethod("POST"));
```

## Message

Utilities for HTTP message.

HTTP message is following union types:

- `Request`
- `Response`

### withHeader

Return an instance with the provided value replacing the specified header. There
are no side effects on the original target.

This was inspired by
[PSR-7: HTTP message interfaces](https://www.php-fig.org/psr/psr-7/).

`Request`:

```ts
import { withHeader } from "https://deno.land/x/http_utils@$VERSION/message.ts";
import { assert } from "https://deno.land/std@$VERSION/testing/asserts.ts";

declare const init: Request;
declare const header: string;
declare const value: string;

const request = withHeader(init, header, value);

assert(request.headers.get(header), value);
assert(init !== request);
```

`Response`:

```ts
import { withHeader } from "https://deno.land/x/http_utils@$VERSION/message.ts";
import { assert } from "https://deno.land/std@$VERSION/testing/asserts.ts";

declare const init: Response;
declare const header: string;
declare const value: string;

const response = withHeader(init, header, value);

assert(response.headers.get(header), value);
assert(init !== response);
```

## Lists

Compliant with
[RFC 9110, 5.6.1. Lists](https://www.rfc-editor.org/rfc/rfc9110.html#section-5.6.1).

### parseListFields

Parse
[list-based fields](https://www.rfc-editor.org/rfc/rfc9110.html#section-5.5-7)
into array.

Strings enclosed in double quotes are safely handled.

```ts
import { parseListFields } from "https://deno.land/x/http_utils@$VERSION/list.ts";
import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assertEquals(parseListFields("foo , ,bar,charlie"), [
  "foo",
  "bar",
  "charlie",
]);
assertEquals(parseListFields(`"Sat, 04 May 1996", "Wed, 14 Sep 2005"`), [
  `"Sat, 04 May 1996"`,
  `"Wed, 14 Sep 2005"`,
]);
```

## Tokens

Compliant with
[RFC 9110, 5.6.2. Tokens](https://www.rfc-editor.org/rfc/rfc9110.html#section-5.6.2).

### isTchar

Whether the input is
[tchar](https://www.rfc-editor.org/rfc/rfc9110.html#section-5.6.2-2) or not.

```ts
import { isTchar } from "https://deno.land/x/http_utils@$VERSION/token.ts";
import {
  assert,
  assertFalse,
} from "https://deno.land/std@$VERSION/testing/asserts.ts";

assert(isTchar("!"));
assert(isTchar("a"));
assert(isTchar("Z"));
assertFalse(isTchar(""));
```

### isToken

Whether the input is
[token](https://www.rfc-editor.org/rfc/rfc9110.html#section-5.6.2-2) or not.

```ts
import { isToken } from "https://deno.land/x/http_utils@$VERSION/token.ts";
import {
  assert,
  assertFalse,
} from "https://deno.land/std@$VERSION/testing/asserts.ts";

assert(isToken("token"));
assert(isToken("*!~"));
assertFalse(isToken(""));
```

## Quoted Strings

Compliant with
[RFC 9110, 5.6.4. Quoted Strings](https://www.rfc-editor.org/rfc/rfc9110.html#section-5.6.4).

### isQdtext

Whether the input is
[qdtext](https://www.rfc-editor.org/rfc/rfc9110.html#section-5.6.4-2) or not.

```ts
import { isQdtext } from "https://deno.land/x/http_utils@$VERSION/quoted_string.ts";
import {
  assert,
  assertFalse,
} from "https://deno.land/std@$VERSION/testing/asserts.ts";

assert(isQdtext("\t"));
assert(isQdtext("\xFF"));
assertFalse(isQdtext(`"`));
```

### isQuotedPair

Whether the input is
[quoted-pair](https://www.rfc-editor.org/rfc/rfc9110.html#section-5.6.4-4) or
not.

```ts
import { isQuotedPair } from "https://deno.land/x/http_utils@$VERSION/quoted_string.ts";
import {
  assert,
  assertFalse,
} from "https://deno.land/std@$VERSION/testing/asserts.ts";

assert(isQuotedPair("\\\t"));
assert(isQuotedPair("\\\xFF"));
assertFalse(isQuotedPair("\\"));
```

### isQuotedString

Whether the input is
[quoted-string](https://www.rfc-editor.org/rfc/rfc9110.html#section-5.6.4-2) or
not.

```ts
import { isQuotedString } from "https://deno.land/x/http_utils@$VERSION/quoted_string.ts";
import {
  assert,
  assertFalse,
} from "https://deno.land/std@$VERSION/testing/asserts.ts";

assert(isQuotedString(`""`));
assert(isQuotedString(`"qdtext"`));
assert(isQuotedString(`"quoted-pair"`));
assertFalse(isQuotedString(""));
```

## License

Copyright © 2023-present [httpland](https://github.com/httpland).

Released under the [MIT](./LICENSE) license
