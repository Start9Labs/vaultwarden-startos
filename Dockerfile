FROM vaultwarden/server:1.28.1


RUN apt update && \
    apt install -y \
    tini \
    apt clean; \
    rm -rf \
    /tmp/* \
    /var/lib/apt/lists/* \
    /var/tmp/*


# arm64 or amd64
ARG PLATFORM
