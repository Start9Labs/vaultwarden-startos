# Updating the upstream version

Vaultwarden ships as the upstream `vaultwarden/server` Alpine image. A small helper container is built locally from `argon2.Dockerfile` (used only to Argon2id-hash admin tokens) and tracks `alpine:latest` — it has no pinned version and does not need bumping.

## Determining the upstream version

- **Vaultwarden** — https://github.com/dani-garcia/vaultwarden

  ```
  gh api --paginate 'repos/dani-garcia/vaultwarden/tags?per_page=100' --jq '.[].name' | grep -E '^[0-9]+\.[0-9]+\.[0-9]+$' | sort -V
  ```

  Select the highest stable tag, then confirm that the exact `<version>-alpine` image has been published on Docker Hub for both `amd64` and `arm64` (the package consumes the image, not the source release). If it is unavailable, try the next stable tag:

  ```
  version=<version>
  curl -fsSL "https://hub.docker.com/v2/repositories/vaultwarden/server/tags/${version}-alpine" | jq '{name, images: [.images[] | {architecture, os, status}]}'
  ```

  Pin lives in `startos/manifest/index.ts` as `images.vaultwarden.source.dockerTag`.

## Applying the bump

- **Vaultwarden** — in `startos/manifest/index.ts`, set `images.vaultwarden.source.dockerTag` to `vaultwarden/server:<new version>-alpine`.
