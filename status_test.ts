import {
  ClientErrorStatus,
  InformationalStatus,
  isClientErrorStatus,
  isErrorStatus,
  isInformationalStatus,
  isRedirectionStatus,
  isServerErrorStatus,
  isSuccessfulStatus,
  RedirectionStatus,
  ServerErrorStatus,
  SuccessfulStatus,
} from "./status.ts";
import { assert, assertEquals, describe, it } from "./_dev_deps.ts";

describe("InformationalStatus", () => {
  it("should equal status", () => {
    const table: [number, number][] = [
      [InformationalStatus.Continue, 100],
      [InformationalStatus.SwitchingProtocols, 101],
      [InformationalStatus.Processing, 102],
      [InformationalStatus.EarlyHints, 103],
    ];

    table.forEach(([input, expected]) => {
      assertEquals(input, expected);
    });
  });
});

describe("SuccessfulStatus", () => {
  it("should equal status", () => {
    const table: [number, number][] = [
      [SuccessfulStatus.OK, 200],
      [SuccessfulStatus.Created, 201],
      [SuccessfulStatus.Accepted, 202],
      [SuccessfulStatus.NonAuthoritativeInformation, 203],
      [SuccessfulStatus.NoContent, 204],
      [SuccessfulStatus.ResetContent, 205],
      [SuccessfulStatus.PartialContent, 206],
      [SuccessfulStatus.MultiStatus, 207],
      [SuccessfulStatus.AlreadyReported, 208],
      [SuccessfulStatus.IMUsed, 226],
    ];

    table.forEach(([input, expected]) => {
      assertEquals(input, expected);
    });
  });
});

describe("RedirectionStatus", () => {
  it("should equal status", () => {
    const table: [number, number][] = [
      [RedirectionStatus.MultipleChoices, 300],
      [RedirectionStatus.MovedPermanently, 301],
      [RedirectionStatus.Found, 302],
      [RedirectionStatus.SeeOther, 303],
      [RedirectionStatus.NotModified, 304],
      [RedirectionStatus.UseProxy, 305],
      [RedirectionStatus.TemporaryRedirect, 307],
      [RedirectionStatus.PermanentRedirect, 308],
    ];

    table.forEach(([input, expected]) => {
      assertEquals(input, expected);
    });
  });
});

describe("ClientErrorStatus", () => {
  it("should equal status", () => {
    const table: [number, number][] = [
      [ClientErrorStatus.BadRequest, 400],
      [ClientErrorStatus.Unauthorized, 401],
      [ClientErrorStatus.PaymentRequired, 402],
      [ClientErrorStatus.Forbidden, 403],
      [ClientErrorStatus.NotFound, 404],
      [ClientErrorStatus.MethodNotAllowed, 405],
      [ClientErrorStatus.NotAcceptable, 406],
      [ClientErrorStatus.ProxyAuthenticationRequired, 407],
      [ClientErrorStatus.RequestTimeout, 408],
      [ClientErrorStatus.Conflict, 409],
      [ClientErrorStatus.Gone, 410],
      [ClientErrorStatus.LengthRequired, 411],
      [ClientErrorStatus.PreconditionFailed, 412],
      [ClientErrorStatus.ContentTooLarge, 413],
      [ClientErrorStatus.URITooLong, 414],
      [ClientErrorStatus.UnsupportedMediaType, 415],
      [ClientErrorStatus.RangeNotSatisfiable, 416],
      [ClientErrorStatus.ExpectationFailed, 417],
      [ClientErrorStatus.MisdirectedRequest, 421],
      [ClientErrorStatus.UnprocessableContent, 422],
      [ClientErrorStatus.Locked, 423],
      [ClientErrorStatus.FailedDependency, 424],
      [ClientErrorStatus.TooEarly, 425],
      [ClientErrorStatus.UpgradeRequired, 426],
      [ClientErrorStatus.PreconditionRequired, 428],
      [ClientErrorStatus.TooManyRequests, 429],
      [ClientErrorStatus.RequestHeaderFieldsTooLarge, 431],
      [ClientErrorStatus.UnavailableForLegalReasons, 451],
    ];

    table.forEach(([input, expected]) => {
      assertEquals(input, expected);
    });
  });
});

describe("ServerErrorStatus", () => {
  it("should equal status", () => {
    const table: [number, number][] = [
      [ServerErrorStatus.InternalServerError, 500],
      [ServerErrorStatus.NotImplemented, 501],
      [ServerErrorStatus.BadGateway, 502],
      [ServerErrorStatus.ServiceUnavailable, 503],
      [ServerErrorStatus.GatewayTimeout, 504],
      [ServerErrorStatus.HTTPVersionNotSupported, 505],
      [ServerErrorStatus.VariantAlsoNegotiates, 506],
      [ServerErrorStatus.InsufficientStorage, 507],
      [ServerErrorStatus.LoopDetected, 508],
      [ServerErrorStatus.NotExtended, 510],
      [ServerErrorStatus.NetworkAuthenticationRequired, 511],
    ];

    table.forEach(([input, expected]) => {
      assertEquals(input, expected);
    });
  });
});

describe("isInformationalStatus", () => {
  it("should return true", () => {
    const table: number[] = [
      InformationalStatus.Continue,
      InformationalStatus.SwitchingProtocols,
      InformationalStatus.Processing,
      InformationalStatus.EarlyHints,
    ];

    table.forEach((status) => {
      assert(isInformationalStatus(status));
    });
  });
});

describe("isSuccessfulStatus", () => {
  it("should return true", () => {
    const table: number[] = [
      SuccessfulStatus.OK,
      SuccessfulStatus.Created,
      SuccessfulStatus.Accepted,
      SuccessfulStatus.NonAuthoritativeInformation,
      SuccessfulStatus.NoContent,
      SuccessfulStatus.ResetContent,
      SuccessfulStatus.PartialContent,
      SuccessfulStatus.MultiStatus,
      SuccessfulStatus.AlreadyReported,
      SuccessfulStatus.IMUsed,
    ];

    table.forEach((status) => {
      assert(isSuccessfulStatus(status));
    });
  });
});

describe("isRedirectionStatus", () => {
  it("should return true", () => {
    const table: number[] = [
      RedirectionStatus.MultipleChoices,
      RedirectionStatus.MovedPermanently,
      RedirectionStatus.Found,
      RedirectionStatus.SeeOther,
      RedirectionStatus.NotModified,
      RedirectionStatus.UseProxy,
      RedirectionStatus.TemporaryRedirect,
      RedirectionStatus.PermanentRedirect,
    ];

    table.forEach((status) => {
      assert(isRedirectionStatus(status));
    });
  });
});

describe("isClientErrorStatus", () => {
  it("should return true", () => {
    const table: number[] = [
      ClientErrorStatus.BadRequest,
      ClientErrorStatus.Unauthorized,
      ClientErrorStatus.PaymentRequired,
      ClientErrorStatus.Forbidden,
      ClientErrorStatus.NotFound,
      ClientErrorStatus.MethodNotAllowed,
      ClientErrorStatus.NotAcceptable,
      ClientErrorStatus.ProxyAuthenticationRequired,
      ClientErrorStatus.RequestTimeout,
      ClientErrorStatus.Conflict,
      ClientErrorStatus.Gone,
      ClientErrorStatus.LengthRequired,
      ClientErrorStatus.PreconditionFailed,
      ClientErrorStatus.ContentTooLarge,
      ClientErrorStatus.URITooLong,
      ClientErrorStatus.UnsupportedMediaType,
      ClientErrorStatus.RangeNotSatisfiable,
      ClientErrorStatus.ExpectationFailed,
      ClientErrorStatus.MisdirectedRequest,
      ClientErrorStatus.UnprocessableContent,
      ClientErrorStatus.Locked,
      ClientErrorStatus.FailedDependency,
      ClientErrorStatus.TooEarly,
      ClientErrorStatus.UpgradeRequired,
      ClientErrorStatus.PreconditionRequired,
      ClientErrorStatus.TooManyRequests,
      ClientErrorStatus.RequestHeaderFieldsTooLarge,
      ClientErrorStatus.UnavailableForLegalReasons,
    ];

    table.forEach((status) => {
      assert(isClientErrorStatus(status));
    });
  });
});

describe("isServerErrorStatus", () => {
  it("should return true", () => {
    const table: number[] = [
      ServerErrorStatus.InternalServerError,
      ServerErrorStatus.NotImplemented,
      ServerErrorStatus.BadGateway,
      ServerErrorStatus.ServiceUnavailable,
      ServerErrorStatus.GatewayTimeout,
      ServerErrorStatus.HTTPVersionNotSupported,
      ServerErrorStatus.VariantAlsoNegotiates,
      ServerErrorStatus.InsufficientStorage,
      ServerErrorStatus.LoopDetected,
      ServerErrorStatus.NotExtended,
      ServerErrorStatus.NetworkAuthenticationRequired,
    ];

    table.forEach((status) => {
      assert(isServerErrorStatus(status));
    });
  });
});

describe("isErrorStatus", () => {
  it("should return true", () => {
    const table: number[] = [
      ClientErrorStatus.BadRequest,
      ClientErrorStatus.Unauthorized,
      ClientErrorStatus.PaymentRequired,
      ClientErrorStatus.Forbidden,
      ClientErrorStatus.NotFound,
      ClientErrorStatus.MethodNotAllowed,
      ClientErrorStatus.NotAcceptable,
      ClientErrorStatus.ProxyAuthenticationRequired,
      ClientErrorStatus.RequestTimeout,
      ClientErrorStatus.Conflict,
      ClientErrorStatus.Gone,
      ClientErrorStatus.LengthRequired,
      ClientErrorStatus.PreconditionFailed,
      ClientErrorStatus.ContentTooLarge,
      ClientErrorStatus.URITooLong,
      ClientErrorStatus.UnsupportedMediaType,
      ClientErrorStatus.RangeNotSatisfiable,
      ClientErrorStatus.ExpectationFailed,
      ClientErrorStatus.MisdirectedRequest,
      ClientErrorStatus.UnprocessableContent,
      ClientErrorStatus.Locked,
      ClientErrorStatus.FailedDependency,
      ClientErrorStatus.TooEarly,
      ClientErrorStatus.UpgradeRequired,
      ClientErrorStatus.PreconditionRequired,
      ClientErrorStatus.TooManyRequests,
      ClientErrorStatus.RequestHeaderFieldsTooLarge,
      ClientErrorStatus.UnavailableForLegalReasons,
      ServerErrorStatus.InternalServerError,
      ServerErrorStatus.NotImplemented,
      ServerErrorStatus.BadGateway,
      ServerErrorStatus.ServiceUnavailable,
      ServerErrorStatus.GatewayTimeout,
      ServerErrorStatus.HTTPVersionNotSupported,
      ServerErrorStatus.VariantAlsoNegotiates,
      ServerErrorStatus.InsufficientStorage,
      ServerErrorStatus.LoopDetected,
      ServerErrorStatus.NotExtended,
      ServerErrorStatus.NetworkAuthenticationRequired,
    ];

    table.forEach((status) => {
      assert(isErrorStatus(status));
    });
  });
});
