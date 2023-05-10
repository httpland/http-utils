// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.

import { assertEquals, describe, it } from "./_dev_deps.ts";
import {
  isIdempotentMethod,
  isRetrieveMethod,
  isSafeMethod,
} from "./method.ts";

describe("isSafeMethod", () => {
  it("should pass cases", () => {
    const table: [string, boolean][] = [
      ["", false],
      ["get", false],
      ["head", false],
      ["post", false],
      ["put", false],
      ["POST", false],
      ["PUT", false],
      ["DELETE", false],
      ["CONNECT", false],
      ["PATCH", false],

      ["GET", true],
      ["HEAD", true],
      ["OPTIONS", true],
      ["TRACE", true],
    ];

    table.forEach(([method, expected]) => {
      assertEquals(isSafeMethod(method), expected);
    });
  });
});

describe("isIdempotentMethod", () => {
  it("should pass cases", () => {
    const table: [string, boolean][] = [
      ["", false],
      ["get", false],
      ["head", false],
      ["post", false],
      ["put", false],
      ["POST", false],
      ["CONNECT", false],
      ["PATCH", false],

      ["GET", true],
      ["HEAD", true],
      ["OPTIONS", true],
      ["TRACE", true],
      ["PUT", true],
      ["DELETE", true],
    ];

    table.forEach(([method, expected]) => {
      assertEquals(isIdempotentMethod(method), expected);
    });
  });
});

describe("isRetrieveMethod", () => {
  it("should pass cases", () => {
    const table: [string, boolean][] = [
      ["", false],
      ["get", false],
      ["head", false],
      ["post", false],
      ["put", false],
      ["POST", false],
      ["CONNECT", false],
      ["PATCH", false],

      ["GET", true],
      ["HEAD", true],
      ["OPTIONS", false],
      ["TRACE", false],
      ["PUT", false],
      ["DELETE", false],
    ];

    table.forEach(([method, expected]) => {
      assertEquals(isRetrieveMethod(method), expected);
    });
  });
});
