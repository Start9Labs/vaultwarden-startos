import { types as T } from "../deps.ts";

// deno-lint-ignore require-await
export const migration: T.ExpectedExports.migration = async () => ({
  result: { configured: true },
});
