import { types as T, checkWebUrl, catchError } from "../deps.ts";

export const health: T.ExpectedExports.health = {
  // deno-lint-ignore require-await
  async "alive"(effects, duration) {
    return checkWebUrl("http://vaultwarden.embassy:80/alive")(effects, duration).catch(catchError(effects))
  },
};