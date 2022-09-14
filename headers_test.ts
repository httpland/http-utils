import { equalsHeaders } from "./headers.ts";
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
