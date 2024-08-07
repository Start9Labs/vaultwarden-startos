FROM vaultwarden/server:1.31.0-alpine

RUN apk update && \
    apk add --no-cache \
    tini \
    argon2 \
    nginx \
    yq; \
    rm -rf \
    /tmp/* \
    /var/cache/apk/* \
    /var/tmp/*

COPY --chmod=755 ./docker_entrypoint.sh /usr/local/bin/docker_entrypoint.sh
