import { BuildOptions } from "https://deno.land/x/dnt@0.30.0/mod.ts";

export const makeOptions = (version: string): BuildOptions => ({
  test: false,
  shims: {},
  compilerOptions: {
    lib: ["dom", "esnext", "dom.iterable"],
  },
  typeCheck: false,
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  package: {
    name: "@httpland/http-utils",
    version,
    description: "HTTP implementation utility collection",
    keywords: [
      "http",
      "utility",
      "handler",
      "request",
      "response",
    ],
    license: "MIT",
    homepage: "https://github.com/httpland/http-utils",
    repository: {
      type: "git",
      url: "git+https://github.com/httpland/http-utils.git",
    },
    bugs: {
      url: "https://github.com/httpland/http-utils/issues",
    },
    sideEffects: false,
    type: "module",
    publishConfig: {
      access: "public",
    },
  },
  packageManager: "pnpm",
  mappings: {
    "https://deno.land/x/prelude_js@1.0.0/to_lower_case.ts": {
      name: "@miyauci/prelude",
      version: "1.0.0",
      subPath: "to_lower_case",
    },
  },
});
