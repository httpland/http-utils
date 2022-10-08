import { equalsResponse, isResponse, safeResponse } from "./responses.ts";
import { describe, expect, Fn, fn, it } from "./dev_deps.ts";

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

describe("safeResponse", () => {
  it("should return 500 when the function throw error", async () => {
    expect(
      await safeResponse(() => {
        throw Error();
      }),
    ).toEqualResponse(
      new Response(null, {
        status: 500,
        statusText: "Internal Server Error",
      }),
    );
  });

  it("should return 500 when the async function throw error", async () => {
    expect(
      await safeResponse(() => Promise.reject("Error")),
    ).toEqualResponse(
      new Response(null, {
        status: 500,
        statusText: "Internal Server Error",
      }),
    );
  });

  it("should return response as it is", async () => {
    expect(
      await safeResponse(() => new Response()),
    ).toEqualResponse(
      new Response(null, {
        status: 200,
      }),
    );
  });

  it("should return async response as it is", async () => {
    expect(
      await safeResponse(() => Promise.resolve(new Response())),
    ).toEqualResponse(
      new Response(null, {
        status: 200,
      }),
    );
  });

  it("should catch error via onError", async () => {
    expect(
      await safeResponse(() => {
        throw Error("test");
      }, () => new Response()),
    ).toEqualResponse(
      new Response(null, {
        status: 200,
      }),
    );
  });

  it("should return default response when onError throw error", async () => {
    const mock = fn();
    expect(
      await safeResponse(() => {
        throw Error("test");
      }, (e) => {
        mock(e);
        throw e;
      }),
    ).toEqualResponse(
      new Response(null, {
        status: 500,
        statusText: "Internal Server Error",
      }),
    );

    expect(mock).toHaveBeenCalledWith(new Error());
  });
});

describe("isResponse", () => {
  it("should return true", () => {
    const table: unknown[] = [
      new Response(),
      new Response(""),
    ];

    table.forEach((value) => {
      expect(isResponse(value)).toBeTruthy();
    });
  });

  it("should return false", () => {
    const table: unknown[] = [
      {},
      null,
      undefined,
      0,
      NaN,
      new Request("http://localhost"),
      "",
      false,
      true,
      [],
    ];

    table.forEach((value) => {
      expect(isResponse(value)).toBeFalsy();
    });
  });
});
