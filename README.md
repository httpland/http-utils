# http-utils

HTTP implementation utility collection.

A collection of modules with one or more of the following characteristics:

- Common to many projects
- Too difficult to classify
- Too small

Each module will be split into a separate repository when it becomes
classifiable.

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

## isSingletonField

Weather the field is singleton field or not.

```ts
import { isSingletonField } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assertEquals(isSingletonField("Origin"), true);
assertEquals(isSingletonField("Vary"), false);
```

## equalsResponse

Check two `Response` fields equality.

```ts
import { equalsResponse } from "https://deno.land/x/http_utils@$VERSION/mod.ts";
import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assertEquals(
  equalsResponse(
    new Response(null, { status: 204, headers: { "content-length": "0" } }),
    new Response(null, { status: 204, headers: { "content-length": "0" } }),
  ),
  true,
);
assertEquals(
  equalsResponse(new Response(), new Response(null, { status: 500 })),
  false,
);
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

## License

Copyright © 2022-present [httpland](https://github.com/httpland).

Released under the [MIT](./LICENSE) license
