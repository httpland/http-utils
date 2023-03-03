import { equalsResponse, isResponse, safeResponse } from "./response.ts";
import {
  assert,
  assertEqualsResponse,
  assertThrows,
  describe,
  expect,
  fn,
  it,
} from "./dev_deps.ts";

describe("equalsResponse", () => {
  it("should pass cases", () => {
    const table: [Response, Response, boolean][] = [
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
      [new Response(""), new Response(""), true],
      [new Response("a"), new Response(""), true],
      [new Response("a"), new Response("a"), true],
    ];

    Promise.all(table.map(([left, right, result]) => {
      expect(equalsResponse(left, right)).toEqual(result);
    }));
  });

  it("should pass if strict mode", async () => {
    const table: [Response, Response, boolean][] = [
      [new Response(""), new Response(""), true],
      [new Response("a"), new Response("a"), true],
      [new Response("test"), new Response(), false],
      [new Response("a"), new Response(""), false],
    ];

    await Promise.all(table.map(async ([left, right, result]) => {
      expect(await equalsResponse(left, right, true)).toEqual(result);
    }));
  });

  it("should throw error if strict mode and the response body has been read", async () => {
    const response = new Response("");
    await response.text();

    assert(response.bodyUsed);
    assertThrows(() => equalsResponse(response, response, true));
  });

  it("should not throw when the response body has used", async () => {
    const res = new Response("");

    await res.text();

    expect(res.bodyUsed).toBeTruthy();
    expect(await equalsResponse(res, new Response(""))).toBeFalsy();
  });

  it("should use cloned response", async () => {
    const res = new Response("");

    expect(await equalsResponse(res, new Response(""))).toBeTruthy();

    expect(res.bodyUsed).toBeFalsy();
    expect(await res.text()).toBe("");
  });
});

describe("safeResponse", () => {
  it("should return 500 when the function throw error", async () => {
    assertEqualsResponse(
      await safeResponse(() => {
        throw Error();
      }),
      new Response(null, {
        status: 500,
        statusText: "Internal Server Error",
      }),
    );
  });

  it("should return 500 when the async function throw error", async () => {
    assertEqualsResponse(
      await safeResponse(() => Promise.reject("Error")),
      new Response(null, {
        status: 500,
        statusText: "Internal Server Error",
      }),
    );
  });

  it("should return response as it is", async () => {
    assertEqualsResponse(
      await safeResponse(() => new Response()),
      new Response(null, {
        status: 200,
      }),
    );
  });

  it("should return async response as it is", async () => {
    assertEqualsResponse(
      await safeResponse(() => Promise.resolve(new Response())),
      new Response(null, {
        status: 200,
      }),
    );
  });

  it("should catch error via onError", async () => {
    assertEqualsResponse(
      await safeResponse(() => {
        throw Error("test");
      }, () => new Response()),
      new Response(null, {
        status: 200,
      }),
    );
  });

  it("should return default response when onError throw error", async () => {
    const mock = fn();
    assertEqualsResponse(
      await safeResponse(() => {
        throw Error("test");
      }, (e) => {
        mock(e);
        throw e;
      }),
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
