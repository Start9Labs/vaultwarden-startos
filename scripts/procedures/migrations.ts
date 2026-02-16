import { migrations, types as T } from "../deps.ts";
import { manifest } from "../generated/manifest.ts";

export const migration: T.ExpectedExports.migration = migrations.fromMapping(
  {
    // 1.35.3 No migration needed
  },
  manifest.version,
);
