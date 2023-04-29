import { isQdtext, isQuotedPair, isQuotedString } from "./quoted_string.ts";
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

function slashed(input: string): `\\${string}` {
  return `\\${input}`;
}

function quoted(input: string): `"${string}"` {
  return `"${input}"`;
}

function next(input: string): string {
  return String.fromCharCode(input.charCodeAt(0) + 1);
}

const vchars = charRange("\x21", "\x7E");
const obsTexts = charRange("\x80", "\xFF");

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

describe("isQdtext", () => {
  it("should return true", () => {
    const table: string[] = [
      "\t",
      " ",
      "\x21",
      ...charRange("\x23", "\x5B"),
      ...charRange("\x5D", "\x7E"),
      ...obsTexts,
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
      "\x21\x21",
    ];

    table.forEach((input) => {
      assertFalse(isQdtext(input), input);
    });
  });
});

describe("isQuotedPair", () => {
  it("should return true", () => {
    const table: string[] = [
      "\\\t",
      "\\ ",
      ...vchars.map(slashed),
      ...obsTexts.map(slashed),
    ];

    table.forEach((input) => {
      assert(isQuotedPair(input));
    });
  });

  it("should return false", () => {
    const table: string[] = [
      "",
      "\\",
      ...charRange("\x00", "\x08").map(slashed), // \x09 is "\t"
      ...charRange("\x10", "\x19").map(slashed), // \x20 is " "
      "\\\x7F",
      "\\" + next("\xFF"),

      "\\\x21\x21",
    ];

    table.forEach((input) => {
      assertFalse(isQuotedPair(input), input);
    });
  });
});

describe("isQuotedString", () => {
  it("should return true", () => {
    const table: string[] = [
      quoted(""),
      quoted("\t"),
      quoted(" "),
      quoted("\x21"),
      ...charRange("\x23", "\x5B").map(quoted),
      ...charRange("\x5D", "\x7E").map(quoted),
      ...obsTexts.map(quoted),
      quoted(slashed("\t")),
      quoted(slashed(" ")),
      ...vchars.map(slashed).map(quoted),
      ...obsTexts.map(slashed).map(quoted),

      quoted(vchars.map(slashed).join("")),
      quoted(obsTexts.map(slashed).join("")),
      quoted(obsTexts.join("")),
      quoted(charRange("\x23", "\x5B").join()),
      quoted(charRange("\x23", "\x5B").join() + vchars.map(slashed).join("")),
    ];

    table.forEach((input) => {
      assert(isQuotedString(input));
    });
  });

  it("should return false", () => {
    const table: string[] = [
      "",
      "''",
      quoted("\\"),
      quoted("\t\\"),
      quoted(next("\xFF")),
      quoted("あ"),
      quoted(charRange(next("\xFF"), next(next("\xFF"))).join()),
      quoted(vchars.join("")),
      obsTexts.map(slashed).join(""),
    ];

    table.forEach((input) => {
      assertFalse(isQuotedString(input));
    });
  });
});
