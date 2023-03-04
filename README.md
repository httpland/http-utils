# http-utils

HTTP implementation utility collection.

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

## RepresentationHeader

Representation header field enumeration provide metadata about the
representation.

Defined in
[RFC 9110, 3.2. Representations](https://www.rfc-editor.org/rfc/rfc9110.html#section-3.2).

```ts
import { RepresentationHeader } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assertEquals(RepresentationHeader.ContentType, "content-type");
```

## CachingHeader

Caching header represents a header filed for HTTP caching.

Compliant with [RFC 9111, HTTP Caching](https://www.rfc-editor.org/rfc/rfc9111).

```ts
import { CachingHeader } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assertEquals(CachingHeader.CacheControl, "cache-control");
```

## AuthenticationHeader

HTTP Authentication header fields.

Compliant with
[RFC 9110, 11. HTTP Authentication](https://www.rfc-editor.org/rfc/rfc9110#section-11).

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

## License

Copyright © 2023-present [httpland](https://github.com/httpland).

Released under the [MIT](./LICENSE) license
