# http-utils

[![deno land](http://img.shields.io/badge/available%20on-deno.land/x-lightgrey.svg?logo=deno)](https://deno.land/x/http_utils)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/httpland/http-utils)](https://github.com/httpland/http-utils/releases)
[![codecov](https://codecov.io/github/httpland/http-utils/branch/main/graph/badge.svg)](https://codecov.io/gh/httpland/http-utils)
[![GitHub](https://img.shields.io/github/license/httpland/http-utils)](https://github.com/httpland/http-utils/blob/main/LICENSE)

[![test](https://github.com/httpland/http-utils/actions/workflows/test.yaml/badge.svg)](https://github.com/httpland/http-utils/actions/workflows/test.yaml)
[![NPM](https://nodei.co/npm/@httpland/http-utils.png?mini=true)](https://nodei.co/npm/@httpland/http-utils/)

HTTP utility collection.

Compliant with [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110).

## Header

Utilities for HTTP header field.

### isMessageMetadataHeader

Whether the input is [MessageMetadataHeader](#messagemetadataheader) or not.

```ts
import { isMessageMetadataHeader } from "https://deno.land/x/http_utils@$VERSION/header.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";

assert(isMessageMetadataHeader("date"));
assert(!isMessageMetadataHeader("<others>"));
```

### isMessageForwardingHeader

Whether the input is [MessageForwardingHeader](#messageforwardingheader) or not.

```ts
import { isMessageForwardingHeader } from "https://deno.land/x/http_utils@$VERSION/header.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";

assert(isMessageForwardingHeader("connection"));
assert(!isMessageForwardingHeader("<others>"));
```

### isRepresentationHeader

Whether the input is [RepresentationHeader](#representationheader) or not.

```ts
import { isRepresentationHeader } from "https://deno.land/x/http_utils@$VERSION/header.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";

assert(isRepresentationHeader("content-type"));
assert(!isRepresentationHeader("<others>"));
```

### isAuthenticationHeader

Whether the input is [AuthenticationHeader](#authenticationheader) or not.

```ts
import { isAuthenticationHeader } from "https://deno.land/x/http_utils@$VERSION/header.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";

assert(isAuthenticationHeader("authorization"));
assert(!isAuthenticationHeader("<others>"));
```

### isContentNegotiationHeader

Whether the input is [ContentNegotiationHeader](#contentnegotiationheader) or
not.

```ts
import { isContentNegotiationHeader } from "https://deno.land/x/http_utils@$VERSION/header.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";

assert(isContentNegotiationHeader("accept"));
assert(!isContentNegotiationHeader("<others>"));
```

### isConditionalHeader

Whether the input is [ConditionalHeader](#conditionalheader) or not.

```ts
import { isConditionalHeader } from "https://deno.land/x/http_utils@$VERSION/header.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";

assert(isConditionalHeader("if-match"));
assert(!isConditionalHeader("<others>"));
```

### isRangeHeader

Whether the input is [RangeHeader](#rangeheader) or not.

```ts
import { isRangeHeader } from "https://deno.land/x/http_utils@$VERSION/header.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";

assert(isRangeHeader("range"));
assert(!isRangeHeader("<others>"));
```

### isCachingHeader

Whether the input is [CachingHeader](#cachingheader) or not.

```ts
import { isCachingHeader } from "https://deno.land/x/http_utils@$VERSION/header.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";

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
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

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
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

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
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

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
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

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
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

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
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

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
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

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
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

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
import { assert } from "https://deno.land/std/testing/asserts.ts";

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
import { assert } from "https://deno.land/std/testing/asserts.ts";

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
import { assert } from "https://deno.land/std/testing/asserts.ts";

assert(isRetrieveMethod("GET"));
assert(isRetrieveMethod("HEAD"));
assert(!isRetrieveMethod("POST"));
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
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

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
import { assert, assertFalse } from "https://deno.land/std/testing/asserts.ts";

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
import { assert, assertFalse } from "https://deno.land/std/testing/asserts.ts";

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
import { assert, assertFalse } from "https://deno.land/std/testing/asserts.ts";

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
import { assert, assertFalse } from "https://deno.land/std/testing/asserts.ts";

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
import { assert, assertFalse } from "https://deno.land/std/testing/asserts.ts";

assert(isQuotedString(`""`));
assert(isQuotedString(`"qdtext"`));
assert(isQuotedString(`"quoted-pair"`));
assertFalse(isQuotedString(""));
```

## HTTP Status code

Compliant with
[RFC 9110, 15. Status Codes](https://www.rfc-editor.org/rfc/rfc9110#section-15)

### InformationalStatus

An HTTP status that is a informational (1XX).

Compliant with
[RFC 9110, 15.2. Informational 1xx](https://www.rfc-editor.org/rfc/rfc9110#section-15.2)

### SuccessfulStatus

An HTTP status that is a success (2XX).

Compliant with
[RFC 9110, 15.3. Successful 2xx](https://www.rfc-editor.org/rfc/rfc9110#section-15.3)

### RedirectionStatus

An HTTP status that is a redirect (3XX).

Compliant with
[RFC 9110, 15.4. Redirection 3xx](https://www.rfc-editor.org/rfc/rfc9110#section-15.4)

### ClientErrorStatus

An HTTP status that is a client error (4XX).

Compliant with
[RFC 9110, 15.5. Client Error 4xx](https://www.rfc-editor.org/rfc/rfc9110#section-15.5)

### ServerErrorStatus

An HTTP status that is a server error (5XX).

Compliant with
[RFC 9110, 15.6. Server Error 5xx](https://www.rfc-editor.org/rfc/rfc9110#section-15.6)

### ErrorStatus

An HTTP status that is an error (4XX and 5XX).

### Status

Standard HTTP status codes.

### isInformationalStatus

Whether the input is [InformationalStatus](#informationalstatus) or not.

```ts
import { isInformationalStatus } from "https://deno.land/x/http_utils@$VERSION/status.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";

assert(isInformationalStatus(100));
assert(isInformationalStatus(101));
```

### isSuccessfulStatus

Whether the input is [SuccessfulStatus](#successfulstatus) or not.

```ts
import { isSuccessfulStatus } from "https://deno.land/x/http_utils@$VERSION/status.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";

assert(isSuccessfulStatus(200));
assert(isSuccessfulStatus(201));
```

### isRedirectionStatus

Whether the input is [RedirectionStatus](#redirectionstatus) or not.

```ts
import { isRedirectionStatus } from "https://deno.land/x/http_utils@$VERSION/status.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";

assert(isRedirectionStatus(300));
assert(isRedirectionStatus(301));
```

### isClientErrorStatus

Whether the input is [ClientErrorStatus](#clienterrorstatus) or not.

```ts
import { isClientErrorStatus } from "https://deno.land/x/http_utils@$VERSION/status.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";

assert(isClientErrorStatus(400));
assert(isClientErrorStatus(401));
```

### isServerErrorStatus

Whether the input is [ServerErrorStatus](#servererrorstatus) or not.

```ts
import { isServerErrorStatus } from "https://deno.land/x/http_utils@$VERSION/status.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";

assert(isServerErrorStatus(500));
assert(isServerErrorStatus(501));
```

### isErrorStatus

Whether the input is [ClientErrorStatus](#clienterrorstatus) or
[ServerErrorStatus](#servererrorstatus) or not.

```ts
import { isErrorStatus } from "https://deno.land/x/http_utils@$VERSION/status.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";

assert(isErrorStatus(400));
assert(isErrorStatus(500));
```

## License

Copyright © 2023-present [httpland](https://github.com/httpland).

Released under the [MIT](./LICENSE) license
