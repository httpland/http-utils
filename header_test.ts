import {
  AuthenticationHeader,
  CachingHeader,
  ConditionalHeader,
  ContentNegotiationHeader,
  isAuthenticationHeader,
  isCachingHeader,
  isConditionalHeader,
  isContentNegotiationHeader,
  isMessageForwardingHeader,
  isMessageMetadataHeader,
  isRangeHeader,
  isRepresentationHeader,
  MessageForwardingHeader,
  MessageMetadataHeader,
  RangeHeader,
  RepresentationHeader,
} from "./header.ts";
import { assert, describe, it } from "./_dev_deps.ts";

describe("isAuthenticationHeader", () => {
  it("should return true", () => {
    const table: AuthenticationHeader[] = [
      AuthenticationHeader.AuthenticationInfo,
      AuthenticationHeader.Authorization,
      AuthenticationHeader.ProxyAuthenticate,
      AuthenticationHeader.ProxyAuthenticationInfo,
      AuthenticationHeader.ProxyAuthorization,
      AuthenticationHeader.WWWAuthenticate,
    ];

    table.forEach((input) => {
      assert(isAuthenticationHeader(input));
    });
  });

  it("should return false", () => {
    const table: string[] = [
      "",
      "others",
    ];

    table.forEach((input) => {
      assert(!isAuthenticationHeader(input));
    });
  });
});

describe("isRepresentationHeader", () => {
  it("should return true", () => {
    const table: RepresentationHeader[] = [
      RepresentationHeader.ContentEncoding,
      RepresentationHeader.ContentLanguage,
      RepresentationHeader.ContentLength,
      RepresentationHeader.ContentLocation,
      RepresentationHeader.ContentType,
      RepresentationHeader.ETag,
      RepresentationHeader.LastModified,
    ];

    table.forEach((input) => {
      assert(isRepresentationHeader(input));
    });
  });

  it("should return false", () => {
    const table: string[] = [
      "",
      "others",
    ];

    table.forEach((input) => {
      assert(!isRepresentationHeader(input));
    });
  });
});

describe("isRangeHeader", () => {
  it("should return true", () => {
    const table: RangeHeader[] = [
      RangeHeader.AcceptRanges,
      RangeHeader.ContentRange,
      RangeHeader.Range,
    ];

    table.forEach((input) => {
      assert(isRangeHeader(input));
    });
  });

  it("should return false", () => {
    const table: string[] = [
      "",
      "others",
    ];

    table.forEach((input) => {
      assert(!isRangeHeader(input));
    });
  });
});

describe("isMessageMetadataHeader", () => {
  it("should return true", () => {
    const table: MessageMetadataHeader[] = [
      MessageMetadataHeader.Date,
      MessageMetadataHeader.Trailer,
    ];

    table.forEach((input) => {
      assert(isMessageMetadataHeader(input));
    });
  });

  it("should return false", () => {
    const table: string[] = [
      "",
      "others",
    ];

    table.forEach((input) => {
      assert(!isMessageMetadataHeader(input));
    });
  });
});

describe("isMessageForwardingHeader", () => {
  it("should return true", () => {
    const table: MessageForwardingHeader[] = [
      MessageForwardingHeader.Connection,
      MessageForwardingHeader.MaxForwards,
      MessageForwardingHeader.Via,
    ];

    table.forEach((input) => {
      assert(isMessageForwardingHeader(input));
    });
  });

  it("should return false", () => {
    const table: string[] = [
      "",
      "others",
    ];

    table.forEach((input) => {
      assert(!isMessageForwardingHeader(input));
    });
  });
});

describe("isContentNegotiationHeader", () => {
  it("should return true", () => {
    const table: ContentNegotiationHeader[] = [
      ContentNegotiationHeader.Accept,
      ContentNegotiationHeader.AcceptCharset,
      ContentNegotiationHeader.AcceptEncoding,
      ContentNegotiationHeader.AcceptLanguage,
      ContentNegotiationHeader.Vary,
    ];

    table.forEach((input) => {
      assert(isContentNegotiationHeader(input));
    });
  });

  it("should return false", () => {
    const table: string[] = [
      "",
      "others",
    ];

    table.forEach((input) => {
      assert(!isContentNegotiationHeader(input));
    });
  });
});

describe("isConditionalHeader", () => {
  it("should return true", () => {
    const table: ConditionalHeader[] = [
      ConditionalHeader.IfMatch,
      ConditionalHeader.IfModifiedSince,
      ConditionalHeader.IfNoneMatch,
      ConditionalHeader.IfRange,
      ConditionalHeader.IfUnmodifiedSince,
    ];

    table.forEach((input) => {
      assert(isConditionalHeader(input));
    });
  });

  it("should return false", () => {
    const table: string[] = [
      "",
      "others",
    ];

    table.forEach((input) => {
      assert(!isConditionalHeader(input));
    });
  });
});

describe("isCachingHeader", () => {
  it("should return true", () => {
    const table: CachingHeader[] = [
      CachingHeader.Age,
      CachingHeader.CacheControl,
      CachingHeader.Expires,
    ];

    table.forEach((input) => {
      assert(isCachingHeader(input));
    });
  });

  it("should return false", () => {
    const table: string[] = [
      "",
      "others",
    ];

    table.forEach((input) => {
      assert(!isCachingHeader(input));
    });
  });
});
