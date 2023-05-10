// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.

import { parseListFields } from "./list.ts";
import { assertEquals, describe, it } from "./_dev_deps.ts";

describe("parseListFields", () => {
  it("should ", () => {
    const table: [string, string[]][] = [
      ["", []],
      ["a", ["a"]],
      ["a, b, c", ["a", "b", "c"]],
      ["   a, a   , a   ", ["a", "a", "a"]],
      [`"", `, [`""`]],
      [`","`, [`","`]],
      [`",", `, [`","`]],
      [`"," ,`, [`","`]],
      [`",,," ,`, [`",,,"`]],
      [`"," , " , "`, [`","`, `" , "`]],
      [`","abc,`, [`","abc`]],
      ["a, b,,,,", ["a", "b"]],
      ["a, b, c", ["a", "b", "c"]],
      ["a,b,c", ["a", "b", "c"]],
      ["a,,c", ["a", "c"]],
      [",,,", []],
      [`"a,b"`, [`"a,b"`]],
      [`"a,b",c, "d,e", f f , g `, [`"a,b"`, "c", `"d,e"`, "f f", "g"]],
      [`   complex,pattern,"abc", "abc , def", ,,,, """, , ",""`, [
        "complex",
        "pattern",
        `"abc"`,
        `"abc , def"`,
        `""", , "`,
        `""`,
      ]],
      [`",","`, [`"`, `","`]],
      [`",",","`, [`","`, `","`]],
      [`",",",",`, [`","`, `","`]],
      [`",",",","`, [`"`, `","`, `","`]],
      [`",",",",",`, [`"`, `","`, `","`]],
      [`",",",",","`, [`","`, `","`, `","`]],
      [`"`, [`"`]],
      [`""`, [`""`]],
      [`"""`, [`"""`]],
      [`""""`, [`""""`]],
      [`"",""`, [`""`, `""`]],
      [`",",`, [`","`]],
      [`"abc,def", "efg, hij", "lmn, opq"`, [
        '"abc,def"',
        '"efg, hij"',
        '"lmn, opq"',
      ]],
    ];

    table.forEach(([input, expected]) => {
      assertEquals(parseListFields(input), expected);
    });
  });
});
