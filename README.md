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
  equalsHeaders(new Header({ a: "b" }), new Header({ a: "b" })),
  true,
);
assertEquals(
  equalsHeaders(new Header({ a: "b" }), new Header({ c: "d" })),
  false,
);
```

## License

Copyright © 2022-present [httpland](https://github.com/httpland).

Released under the [MIT](./LICENSE) license
