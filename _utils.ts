// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

import { isNull } from "./deps.ts";

export function equalsType(
  left: ReadableStream<Uint8Array> | null,
  right: ReadableStream<Uint8Array> | null,
): boolean {
  if (isNull(left)) {
    return isNull(right);
  }

  if (isNull(right)) {
    return isNull(left);
  }

  return true;
}
