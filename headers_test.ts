import {
  equalsHeaders,
  isSingletonField,
  mergeHeaders,
  parseFieldValue,
} from "./headers.ts";
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

Deno.test("parseFieldValue should pass", () => {
  const table: Fn<typeof parseFieldValue>[] = [
    ["", []],
    [",", []],
    ["  a ", ["a"]],
    ["  a , b ", ["a", "b"]],
    ["test, test2", ["test", "test2"]],
    [`"Sat, 04 May 1996"`, [`"Sat, 04 May 1996"`]],
    [`"Sat, 04 May 1996", "Wed, 14 Sep 2005"`, [
      `"Sat, 04 May 1996"`,
      `"Wed, 14 Sep 2005"`,
    ]],
    ["34aa387-d-1568eb00", ["34aa387-d-1568eb00"]],
    [" Apache", ["Apache"]],
    ["51", ["51"]],
    ["Accept-Encoding", ["Accept-Encoding"]],
    ["   text/plain   ", ["text/plain"]],
    [`""`, [`""`]],
    ["Wed, 22 Jul 2009 19:15:56 GMT", ["Wed", "22 Jul 2009 19:15:56 GMT"]],
    ["Foo, Bar", ["Foo", "Bar"]],
    ["foo , ,bar,charlie", ["foo", "bar", "charlie"]],
    [
      ` "http://example.com/a.html,foo"  , "http://without-a-comma.example.com/" `,
      [
        '"http://example.com/a.html,foo"',
        '"http://without-a-comma.example.com/"',
      ],
    ],
    [
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      [
        "text/html",
        "application/xhtml+xml",
        "application/xml;q=0.9",
        "image/avif",
        "image/webp",
        "image/apng",
        "*/*;q=0.8",
        "application/signed-exchange;v=b3;q=0.9",
      ],
    ],
    [
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
      [
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML",
        "like Gecko) Chrome/104.0.0.0 Safari/537.36",
      ],
    ],
    [`"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"`, [
      '"Chromium";v="104"',
      '" Not A;Brand";v="99"',
      '"Google Chrome";v="104"',
    ]],
    [`W/"6323ce9e-15a14"`, [`W/"6323ce9e-15a14"`]],
    [",   ,", []],
    [`"""""`, [`"""""`]],
    [`,,,,`, []],
  ];

  table.forEach(([actual, expected]) => {
    expect(parseFieldValue(actual)).toEqual(expected);
  });
});
