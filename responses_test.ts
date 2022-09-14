import { equalsResponse } from "./responses.ts";
import { expect, Fn } from "./dev_deps.ts";

Deno.test("equalsResponse should pass", () => {
  const table: Fn<typeof equalsResponse>[] = [
    [new Response(), new Response(), true],
    [new Response(null), new Response(), true],
    [new Response(undefined), new Response(), true],
    [
      new Response(null, {
        status: 500,
      }),
      new Response(null, {
        status: 500,
      }),
      true,
    ],
    [
      new Response(null, {
        statusText: "",
      }),
      new Response(null, {
        statusText: "",
      }),
      true,
    ],
    [
      new Response(null, {
        headers: {
          a: "",
        },
      }),
      new Response(null, {
        headers: {
          a: "",
        },
      }),
      true,
    ],

    [
      new Response(null, {
        headers: {
          a: "test",
        },
      }),
      new Response(null, {
        headers: {
          a: "",
        },
      }),
      false,
    ],
    [
      new Response(null, {
        statusText: "",
      }),
      new Response(null, {
        statusText: "a",
      }),
      false,
    ],
    [
      new Response(null, {
        status: 200,
      }),
      new Response(null, {
        status: 201,
      }),
      false,
    ],
    [
      new Response(null, {
        status: 300,
      }),
      new Response(),
      false,
    ],
    [new Response("test"), new Response(), false],
  ];

  table.forEach(([a, b, result]) => {
    expect(equalsResponse(a, b)).toEqual(result);
  });
});
