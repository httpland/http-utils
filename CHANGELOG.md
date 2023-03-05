# [1.0.0-beta.12](https://github.com/httpland/http-utils/compare/1.0.0-beta.11...1.0.0-beta.12) (2023-03-05)


### Features

* **header:** add range requests header fields ([7c00c47](https://github.com/httpland/http-utils/commit/7c00c47fec3e0edd9cbf794b8ef602a0298d3eca))
* **method:** add retrieve method checking function ([702f18f](https://github.com/httpland/http-utils/commit/702f18fb3caa68bf0366dd7636cd5ea73d6b7a21))

# [1.0.0-beta.11](https://github.com/httpland/http-utils/compare/1.0.0-beta.10...1.0.0-beta.11) (2023-03-04)


### Features

* **header:** add conditional header fields ([863f4cb](https://github.com/httpland/http-utils/commit/863f4cb905e0b981de616acc58b54be0512f437c))
* **header:** add content negotiation header fields ([cc6c3d0](https://github.com/httpland/http-utils/commit/cc6c3d0eb0c3605d9b118e703fdda86c93b9237e))
* **heaer:** add http authentication header fields ([5cfa316](https://github.com/httpland/http-utils/commit/5cfa3166e9eaa8a15e0f2c82779466e7a0bfb55b))

# [1.0.0-beta.10](https://github.com/httpland/http-utils/compare/1.0.0-beta.9...1.0.0-beta.10) (2023-03-04)


### Features

* **header:** add caching header enum ([1844621](https://github.com/httpland/http-utils/commit/1844621b43293e362c41af24ef2f57dcf24eac4b))

# [1.0.0-beta.9](https://github.com/httpland/http-utils/compare/1.0.0-beta.8...1.0.0-beta.9) (2023-03-04)


### Features

* **header:** add fileld to representation header ([58965b2](https://github.com/httpland/http-utils/commit/58965b247926983b1e81462adcdb7eb69d2cc13e))
* **header:** add representation header enum ([2561134](https://github.com/httpland/http-utils/commit/25611347552a620ea19bc301ca5357179ebb5533))

# [1.0.0-beta.8](https://github.com/httpland/http-utils/compare/1.0.0-beta.7...1.0.0-beta.8) (2023-03-03)


### Features

* **response:** add throwing error pattern to `equalsResponse` ([d58690a](https://github.com/httpland/http-utils/commit/d58690a8f18ac8db1d108af9d849b49a8e68855b))

# [1.0.0-beta.7](https://github.com/httpland/http-utils/compare/1.0.0-beta.6...1.0.0-beta.7) (2023-03-01)


### Features

* **method:** add http method enum ([5e31439](https://github.com/httpland/http-utils/commit/5e31439fdeaf4ea5a25bee094cebacc7552a45b9))
* **method:** add method utilities ([44a025c](https://github.com/httpland/http-utils/commit/44a025c7d6311bbd0f2e5e40ae8521527d7a26d4))
* **responses:** add overload types to `equalsResponse` ([7af961b](https://github.com/httpland/http-utils/commit/7af961b06a8c56ef0b1c6931b95366bc740d0966))

# [1.0.0-beta.6](https://github.com/httpland/http-utils/compare/1.0.0-beta.5...1.0.0-beta.6) (2022-10-13)


### Features

* **responses:** add checking body content ([3c57c76](https://github.com/httpland/http-utils/commit/3c57c76fa85b85c6157c0c5a459aca0bee500f8e))

# [1.0.0-beta.5](https://github.com/httpland/http-utils/compare/1.0.0-beta.4...1.0.0-beta.5) (2022-10-11)


### Features

* **requests:** add checking request body equality ([4ddca1b](https://github.com/httpland/http-utils/commit/4ddca1b7c0fa7869fb37f76b561cc05cc1ede646))

# [1.0.0-beta.4](https://github.com/httpland/http-utils/compare/1.0.0-beta.3...1.0.0-beta.4) (2022-10-08)


### Features

* **requests:** add `isRequest` function ([cf92dc1](https://github.com/httpland/http-utils/commit/cf92dc1440c40198ba2b8f48898e14dc145acf9d))
* **responses:** add `isResponse` function ([176d614](https://github.com/httpland/http-utils/commit/176d61486ce7cc2e1f974c8925c15f6a440f1c03))

# [1.0.0-beta.3](https://github.com/httpland/http-utils/compare/1.0.0-beta.2...1.0.0-beta.3) (2022-10-02)


### Features

* **handlers:** rename types ([cdf2721](https://github.com/httpland/http-utils/commit/cdf27215e4a33289b744903ec1f4afa4ff3f28cb))
* **headers:** add `parseFieldValue` function ([2dca3bd](https://github.com/httpland/http-utils/commit/2dca3bd26076c8982e15c4f65fc34c523361a003))
* **headers:** add options to `mergeHeaders`, accept custom merge function ([e161c6d](https://github.com/httpland/http-utils/commit/e161c6d30cf3306d27b6c02bf4d54946bf16febc))
* **responses:** change `safeResponse` interface ([ffd3ddc](https://github.com/httpland/http-utils/commit/ffd3ddc79d1ed3f7ca67b1e4ae0b02dbc50d69e8))

# [1.0.0-beta.2](https://github.com/httpland/http-utils/compare/1.0.0-beta.1...1.0.0-beta.2) (2022-09-14)


### Features

* **headers:** add `isSingletonField` function ([9109451](https://github.com/httpland/http-utils/commit/9109451c156610289b91405aa86a9fe7ae828d1f))
* **headers:** add `mergeHeaders` function ([cd224d3](https://github.com/httpland/http-utils/commit/cd224d39f6ae7b9817b5122fe2226b21c7c0fffc))
* **headers:** add checking equality of `Headers` object ([66c108f](https://github.com/httpland/http-utils/commit/66c108f3c7a5cbd8a881f560fac6bbff0f51cbc1))
* **requests:** add `equalsRequest` function ([383be15](https://github.com/httpland/http-utils/commit/383be151e21df37cc35ee8c255288f20e9bf2957))
* **requests:** rename to `HttpMethod` from `Method` ([097490b](https://github.com/httpland/http-utils/commit/097490b9d21df9ac57ba9684812cc0981a3b670c))
* **responses:** add `equalsResponse` function ([b1d8ade](https://github.com/httpland/http-utils/commit/b1d8adeff317cfa74e80f9c64e9e79f6be516da9))
* **responses:** add `safeResponse` function ([74e9aed](https://github.com/httpland/http-utils/commit/74e9aedc489abe35dac6224762aa5836d2cf3535))

# 1.0.0-beta.1 (2022-08-19)


### Features

* **handler:** add types for http handler ([a0f3785](https://github.com/httpland/http-utils/commit/a0f3785df6686cd9f6e201bffb9d5befbcf1155e))
* **request:** add types for http methods ([2f59e87](https://github.com/httpland/http-utils/commit/2f59e870d4e2e9c54bf9c9295db416276cc55553))
