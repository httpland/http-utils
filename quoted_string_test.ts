import { isQdtext } from "./quoted_string.ts";
import {
  assert,
  assertEquals,
  assertFalse,
  assertThrows,
  describe,
  it,
} from "./_dev_deps.ts";

function charRange(start: string, end: string): string[] {
  if (end < start) throw RangeError();

  return Array.from(new Array(end.charCodeAt(0) - start.charCodeAt(0) + 1)).map(
    (
      _,
      i,
    ) => String.fromCharCode(start.charCodeAt(0) + i),
  );
}

describe("charRange", () => {
  it("should throw error is the range is invalid", () => {
    const table: [string, string, string[]][] = [
      ["A", "C", ["A", "B", "C"]],
      ["A", "A", ["A"]],
      ["\x21", "\x24", ["\x21", "\x22", "\x23", "\x24"]],
    ];

    table.forEach(([start, end, expected]) => {
      assertEquals(charRange(start, end), expected);
    });
  });

  it("should throw error is the range is invalid", () => {
    assertThrows(() => charRange("b", "a"));
  });
});

describe("describe", () => {
  it("should return true", () => {
    const table: string[] = [
      "\t",
      " ",
      "\x21",
      ...charRange("\x23", "\x5B"),
      ...charRange("\x5D", "\x7E"),
      ...charRange("\x80", "\xFF"),
    ];

    table.forEach((input) => {
      assert(isQdtext(input));
    });
  });

  it("should return false", () => {
    const table: string[] = [
      "",
      ...charRange("\x00", "\x08"), // \x09 is "\t"
      ...charRange("\x10", "\x19"), // \x20 is " "
      "\x22",
      "\xFF" + 1,
      "\x22\x22",
    ];

    table.forEach((input) => {
      assertFalse(isQdtext(input), input);
    });
  });
});
