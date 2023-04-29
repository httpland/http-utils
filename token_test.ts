import { isTchar, isToken } from "./token.ts";
import { assert, assertFalse, describe, it } from "./_dev_deps.ts";

const table: string[] = [
  "!",
  "#",
  "$",
  "%",
  "&",
  "'",
  "*",
  "+",
  "-",
  ".",
  "^",
  "_",
  "`",
  "|",
  "~",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

describe("isTchar", () => {
  it("should return true", () => {
    table.forEach((input) => {
      assert(isTchar(input));
    });
  });

  it("should return false", () => {
    const table: string[] = [
      "",
      "\x00",
      " ",
      `"`,
      "aa",
      "AA",
      "あ",
    ];

    table.forEach((input) => {
      assertFalse(isTchar(input));
    });
  });
});

describe("isToken", () => {
  it("should be tchar", () => {
    table.forEach((input) => {
      assert(isToken(input));
    });
  });

  it("should return true", () => {
    const table: string[] = [
      "aa",
      "abcdefghijklmnopqrstuvwxyz",
      "!#$%&'*+.^`|~-",
      "0123456789",
    ];

    table.forEach((input) => {
      assert(isToken(input));
    });
  });

  it("should return false", () => {
    const table: string[] = [
      "",
      "\x00",
      " ",
      `"`,
      "あ",
    ];

    table.forEach((input) => {
      assertFalse(isToken(input));
    });
  });
});
