import { migrations, types as T } from "../deps.ts";
import manifest from "../../manifest.json" assert { type: "json" };

export const migration: T.ExpectedExports.migration = migrations.fromMapping(
  {
    // 1.22.2 No migration needed
  },
  manifest.version,
);
