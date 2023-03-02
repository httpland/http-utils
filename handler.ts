// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

/** HTTP request handler. */
export interface HttpHandler {
  (request: Request): Promise<Response> | Response;
}
