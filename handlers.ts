// Copyright 2022-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

/** HTTP request handler. */
export type Handler = (req: Request) => Promise<Response> | Response;
