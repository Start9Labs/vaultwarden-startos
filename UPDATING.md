# Updating the upstream version

Vaultwarden ships as the upstream `vaultwarden/server` Alpine image. A small helper container is built locally from `argon2.Dockerfile` (used only to Argon2id-hash admin tokens) and tracks `alpine:latest` — it has no pinned version and does not need bumping.

## Determining the upstream version

- **Vaultwarden** — https://github.com/dani-garcia/vaultwarden

  ```
  gh release view -R dani-garcia/vaultwarden --json tagName -q .tagName
  ```

  Cross-check that the matching `<version>-alpine` tag has been published on Docker Hub (the package consumes the image, not the source release):

  ```
  curl -fsSL "https://hub.docker.com/v2/repositories/vaultwarden/server/tags?page_size=20&ordering=last_updated" | jq -r '.results[].name'
  ```

  Pin lives in `startos/manifest/index.ts` as `images.vaultwarden.source.dockerTag`.

## Applying the bump

- **Vaultwarden** — in `startos/manifest/index.ts`, set `images.vaultwarden.source.dockerTag` to `vaultwarden/server:<new version>-alpine`.
