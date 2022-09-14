import { equalsHeaders, isSingletonField, mergeHeaders } from "./headers.ts";
import { describe, expect, Fn, it } from "./dev_deps.ts";

describe("equalsHeaders", () => {
  it("should pass", () => {
    const table: Fn<typeof equalsHeaders>[] = [
      [new Headers({ a: "" }), new Headers(), false],
      [new Headers(), new Headers({ a: "" }), false],
      [new Headers({ a: "" }), new Headers({ a: "", b: "" }), false],
      [new Headers({ a: "", b: "c" }), new Headers({ a: "", d: "c" }), false],
      [
        new Headers({ a: "b", b: "c" }),
        new Headers({ a: "b", b: "c", c: "d" }),
        false,
      ],

      [new Headers(), new Headers(), true],
      [new Headers({ a: "" }), new Headers({ a: "" }), true],
      [new Headers([["a", ""]]), new Headers({ a: "" }), true],
      [
        new Headers({ a: "", b: "c", c: "abc" }),
        new Headers({ a: "", b: "c", c: "abc" }),
        true,
      ],
      [
        new Headers({ a: " " }),
        new Headers({ a: "" }),
        true,
      ],
      [
        new Headers({ a: "   a " }),
        new Headers({ a: "        a       " }),
        true,
      ],
    ];

    table.forEach(([a, b, result]) =>
      expect(equalsHeaders(a, b)).toEqual(result)
    );
  });
});

Deno.test("isSingletonField should pass", () => {
  const table: Fn<typeof isSingletonField>[] = [
    ["origin", true],
    ["Origin", true],
    ["ORIGIN", true],
    ["Access-Control-Allow-Origin", true],
    ["access-control-allow-origin", true],

    ["accessControlAllowOrigin", false],
    ["unknown", false],
  ];

  table.forEach(([value, result]) =>
    expect(isSingletonField(value)).toEqual(result)
  );
});

Deno.test("mergeHeaders should pass", () => {
  const table: Fn<typeof mergeHeaders>[] = [
    [new Headers(), new Headers(), new Headers()],
    [new Headers({ a: "" }), new Headers(), new Headers({ a: "" })],
    [new Headers({ a: "" }), new Headers({ a: "" }), new Headers({ a: "" })],
    [
      new Headers({ a: "abc" }),
      new Headers({ a: "cdf" }),
      new Headers({ a: "abc, cdf" }),
    ],
    [
      new Headers({ origin: "http://localhost/" }),
      new Headers({ origin: "http://example.test/" }),
      new Headers({ origin: "http://localhost/" }),
    ],
    [
      new Headers(),
      new Headers({ a: "b" }),
      new Headers({ a: "b" }),
    ],
    [
      new Headers({ a: "b", c: "d", e: "f" }),
      new Headers({ a: "c", b: "d", e: "g" }),
      new Headers({ a: "b, c", b: "d", c: "d", e: "f, g" }),
    ],
  ];

  table.forEach(([a, b, result]) =>
    expect(mergeHeaders(a, b)).toEqualHeaders(result)
  );
});
