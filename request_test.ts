import { equalsRequest, isRequest } from "./request.ts";
import { describe, expect, it } from "./dev_deps.ts";

const url = "http://a";

Deno.test("equalsRequest should pass", () => {
  const table: [...Parameters<typeof equalsRequest>, boolean][] = [
    [new Request(url), new Request(url), true],
    [
      new Request(url, { method: "POST" }),
      new Request(url, { method: "POST" }),
      true,
    ],
    [
      new Request(url, { headers: { a: "b" } }),
      new Request(url, { headers: { a: "b" } }),
      true,
    ],

    [
      new Request(url, { redirect: "follow" }),
      new Request(url, { redirect: "error" }),
      false,
    ],

    [
      new Request(url, { method: "GET" }),
      new Request(url, { method: "POST" }),
      false,
    ],

    [
      new Request(url, { headers: { a: "b" } }),
      new Request(url, { headers: { c: "d" } }),
      false,
    ],

    [
      new Request(url, { body: "", method: "POST" }),
      new Request(url),
      false,
    ],
    [
      new Request(url, { body: "", method: "POST" }),
      new Request(url, { body: "a", method: "POST" }),
      false,
    ],
    [
      new Request(url, { body: "", method: "POST" }),
      new Request(url, { method: "POST" }),
      false,
    ],
    [
      new Request(url, { body: "", method: "POST" }),
      new Request(url, { body: "", method: "POST" }),
      true,
    ],

    [new Request("http://a"), new Request("https://a"), false],
  ];

  table.forEach(async ([a, b, result]) => {
    expect(await equalsRequest(a, b)).toEqual(result);
  });
});

describe("isRequest", () => {
  it("should return true", () => {
    const table: unknown[] = [
      new Request(url),
      new Request(url, { method: "POST" }),
    ];

    table.forEach((value) => {
      expect(isRequest(value)).toBeTruthy();
    });
  });

  it("should return false", () => {
    const table: unknown[] = [
      {},
      null,
      undefined,
      0,
      NaN,
      new Response(),
      "",
      false,
      true,
      [],
    ];

    table.forEach((value) => {
      expect(isRequest(value)).toBeFalsy();
    });
  });
});
