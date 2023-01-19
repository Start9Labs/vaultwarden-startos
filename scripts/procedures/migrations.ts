import { migrations, types as T } from "../deps.ts";
import { manifest } from "../generated/manifest.ts";

export const migration: T.ExpectedExports.migration = migrations.fromMapping(
  {
    // 1.22.2 No migration needed
    // 1.30.0 No migration needed
  },
  manifest.version,
);
