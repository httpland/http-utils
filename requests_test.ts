import { equalsRequest } from "./requests.ts";
import { expect, Fn } from "./dev_deps.ts";

const url = "http://a";

Deno.test("equalsRequest should pass", () => {
  const table: Fn<typeof equalsRequest>[] = [
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

    [new Request("http://a"), new Request("https://a"), false],
  ];

  table.forEach(([a, b, result]) => {
    expect(equalsRequest(a, b)).toEqual(result);
  });
});
