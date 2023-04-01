# http-utils

HTTP utility collection for Fetch API.

A collection of modules with one or more of the following characteristics:

- Common to many projects
- Too difficult to classify
- Too small

Each module will be split into a separate repository when it becomes
classifiable.

## equalsRequest

Check two `Request` fields equality.

```ts
import { equalsRequest } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assertEquals(
  await equalsRequest(
    new Request("http://localhost"),
    new Request("http://test"),
  ),
  false,
);
assertEquals(
  await equalsRequest(
    new Request("http://test", { method: "POST" }),
    new Request("http://test", { method: "PUT" }),
  ),
  false,
);
```

## isRequest

Whether the value is `Request` or not.

```ts
import { isRequest } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assertEquals(isRequest(new Request("http://localhost")), true);
assertEquals(isRequest({}), false);
assertEquals(isRequest(null), false);
```

## equalsHeaders

Check two `Headers` field name and field value equality.

```ts
import { equalsHeaders } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
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

## mergeHeaders

Merge two `Headers` object.

The first `Headers` always takes precedence.

When fields conflict, the first `Headers` takes precedence if it is a singleton
field.

If it is a list-based field and not empty, it is appended to the first `Headers`
field.

Invalid field names and field values are ignored.

No destructive operation is performed on the arguments and returns a new
`Headers` object.

```ts
import { mergeHeaders } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assertEquals(
  mergeHeaders(
    new Headers({ accept: "text/html" }),
    new Headers({ accept: "application/json", "content-type": "text/plain" }),
  ),
  new Headers({
    accept: "text/html, application/json",
    "content-type": "text/plain",
  }),
);
assertEquals(
  mergeHeaders(
    new Headers({ origin: "http://test.test" }),
    new Headers({ origin: "http://example.test" }),
  ),
  new Headers({ origin: "http://test.test" }),
);
// origin is singleton field
```

## parseFieldValue

Parse the header field value.

Split field values by `<quoted-string>` or `<token>`.

```ts
import { parseFieldValue } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assertEquals(
  parseFieldValue("text/html, image/webp;q=0.8"),
  ["text/html", "image/webp;q=0.8"],
);
assertEquals(parseFieldValue(`"Sat, 04 May 1996", "Wed, 14 Sep 2005"`), [
  `"Sat, 04 May 1996"`,
  `"Wed, 14 Sep 2005"`,
]);
```

## isSingletonField

Weather the field is singleton field or not.

```ts
import { isSingletonField } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assertEquals(isSingletonField("Origin"), true);
assertEquals(isSingletonField("Vary"), false);
```

## isMessageMetadataHeader

Whether the input is [MessageMetadataHeader](#messagemetadataheader) or not.

```ts
import { isMessageMetadataHeader } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
import { assert } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assert(isMessageMetadataHeader("date"));
assert(!isMessageMetadataHeader("<others>"));
```

## isMessageForwardingHeader

Whether the input is [MessageForwardingHeader](#messageforwardingheader) or not.

```ts
import { isMessageForwardingHeader } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
import { assert } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assert(isMessageForwardingHeader("connection"));
assert(!isMessageForwardingHeader("<others>"));
```

## isRepresentationHeader

Whether the input is [RepresentationHeader](#representationheader) or not.

```ts
import { isRepresentationHeader } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
import { assert } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assert(isRepresentationHeader("content-type"));
assert(!isRepresentationHeader("<others>"));
```

## isAuthenticationHeader

Whether the input is [AuthenticationHeader](#authenticationheader) or not.

```ts
import { isAuthenticationHeader } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
import { assert } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assert(isAuthenticationHeader("authorization"));
assert(!isAuthenticationHeader("<others>"));
```

## isContentNegotiationHeader

Whether the input is [ContentNegotiationHeader](#contentnegotiationheader) or
not.

```ts
import { isContentNegotiationHeader } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
import { assert } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assert(isContentNegotiationHeader("accept"));
assert(!isContentNegotiationHeader("<others>"));
```

## isConditionalHeader

Whether the input is [ConditionalHeader](#conditionalheader) or not.

```ts
import { isConditionalHeader } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
import { assert } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assert(isConditionalHeader("if-match"));
assert(!isConditionalHeader("<others>"));
```

## isRangeHeader

Whether the input is [RangeHeader](#rangeheader) or not.

```ts
import { isRangeHeader } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
import { assert } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assert(isRangeHeader("range"));
assert(!isRangeHeader("<others>"));
```

## isCachingHeader

Whether the input is [CachingHeader](#cachingheader) or not.

```ts
import { isCachingHeader } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
import { assert } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assert(isCachingHeader("age"));
assert(!isCachingHeader("<others>"));
```

## filterKeys

Returns a new `Headers` with all entries of the given headers except the ones
that have a key(header name or field name) that does not match the given
predicate.

```ts
import { filterKeys } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
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

## MessageMetadataHeader

HTTP Message Metadata header fields.

Compliant with
[RFC 9110, 6.6. Message Metadata](https://www.rfc-editor.org/rfc/rfc9110.html#section-6.6).

- Date
- Trailer

```ts
import { MessageMetadataHeader } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assertEquals(MessageMetadataHeader.Date, "date");
```

## MessageForwardingHeader

HTTP Message Forwarding header fields.

Compliant with
[RFC 9110, 7.6. Message Forwarding](https://www.rfc-editor.org/rfc/rfc9110.html#section-7.6).

- Connection
- Max-Forwards
- Via

```ts
import { MessageForwardingHeader } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assertEquals(MessageForwardingHeader.Via, "via");
```

## RepresentationHeader

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
import { RepresentationHeader } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assertEquals(RepresentationHeader.ContentType, "content-type");
```

## AuthenticationHeader

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
import { AuthenticationHeader } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assertEquals(AuthenticationHeader.Authorization, "authorization");
```

## ContentNegotiationHeader

HTTP content negotiation header fields.

Compliant with
[RFC 9110, 12. Content Negotiation](https://www.rfc-editor.org/rfc/rfc9110#section-12).

- Accept
- Accept-Charset
- Accept-Encoding
- Accept-Language
- Vary

```ts
import { ContentNegotiationHeader } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assertEquals(ContentNegotiationHeader.Accept, "accept");
```

## ConditionalHeader

HTTP conditional requests header fields.

Compliant with
[RFC 9110, 13. Conditional Requests](https://www.rfc-editor.org/rfc/rfc9110#section-13).

- If-Match
- If-None-Match
- If-Modified-Since
- If-Unmodified-Since
- If-Range

```ts
import { ConditionalHeader } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assertEquals(ConditionalHeader.IfNoneMatch, "if-none-match");
```

## RangeHeader

HTTP range requests header fields.

Compliant with
[RFC 9110, 14. Range Requests](https://www.rfc-editor.org/rfc/rfc9110#section-14).

- Range
- Accept-Ranges
- Content-Range

```ts
import { RangeHeader } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assertEquals(RangeHeader.Range, "range");
```

## CachingHeader

HTTP Caching header fields.

Compliant with [RFC 9111, HTTP Caching](https://www.rfc-editor.org/rfc/rfc9111).

- Age
- Cache-Control
- Expires

```ts
import { CachingHeader } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assertEquals(CachingHeader.CacheControl, "cache-control");
```

## equalsResponse

Check two `Response` fields equality.

```ts
import { equalsResponse } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
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
import { equalsResponse } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
import { assert } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assert(
  await equalsResponse(
    new Response("test1", { status: 200, headers: { "content-length": "5" } }),
    new Response("test2", { status: 200, headers: { "content-length": "5" } }),
    true,
  ),
);
```

### Throwing error

In strict mode, if response body has already been read.

```ts
import { equalsResponse } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
import {
  assert,
  assertThrows,
} from "https://deno.land/std@$VERSION/testing/asserts.ts";

const response = new Response("");
await response.text();

assert(response.bodyUsed);
assertThrows(() => equalsResponse(response, response, true));
```

## safeResponse

Safely returns a Response object.

Wraps operations that may cause errors and returns a 500 internal server error
response if an error occurs.

```ts
import { safeResponse } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";

const successRes = await safeResponse(() => new Response());
assertEquals(successRes.status, 200);

const res = await safeResponse(() => {
  throw Error();
});
assertEquals(res.status, 500);
```

### debug

By default, the error information is not provided to response.

If `debug` flag is `true`, the response will includes error information.

## isResponse

Whether the value is `Response` or not.

```ts
import { isResponse } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assertEquals(isResponse(new Response()), true);
assertEquals(isResponse({}), false);
assertEquals(isResponse(null), false);
```

## isSafeMethod

Whether the method is safe method or not.

Defined in
[RFC 9110, 9.2.1. Safe Methods](https://www.rfc-editor.org/rfc/rfc9110.html#name-safe-methods).

```ts
import { isSafeMethod } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
import { assert } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assert(isSafeMethod("GET"));
assert(isSafeMethod("HEAD"));
assert(isSafeMethod("OPTIONS"));
assert(isSafeMethod("TRACE"));
```

## isIdempotentMethod

Whether the method is idempotent method or not.

Defined in
[RFC 9110, 9.2.2 Idempotent Methods](https://www.rfc-editor.org/rfc/rfc9110.html#name-idempotent-methods).

```ts
import { isIdempotentMethod } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
import { assert } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assert(isIdempotentMethod("GET"));
assert(isIdempotentMethod("PUT"));
assert(isIdempotentMethod("DELETE"));
```

## isRetrieveMethod

Whether the method is retrieve method or not.

Retrieve method is following:

- GET
- HEAD

```ts
import { isRetrieveMethod } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
import { assert } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assert(isRetrieveMethod("GET"));
assert(isRetrieveMethod("HEAD"));
assert(!isRetrieveMethod("POST"));
```

## withHeader

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

## License

Copyright © 2023-present [httpland](https://github.com/httpland).

Released under the [MIT](./LICENSE) license
