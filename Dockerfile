FROM vaultwarden/server:1.29.0


RUN apt update && \
    apt install -y \
    tini \
    nginx-core; \
    apt clean; \
    rm -rf \
    /tmp/* \
    /var/lib/apt/lists/* \
    /var/tmp/*
RUN mkdir /run/nginx


# arm64 or amd64
ARG PLATFORM
ENV YQ_VER v4.3.2
RUN curl -L https://github.com/mikefarah/yq/releases/download/${YQ_VER}/yq_linux_${PLATFORM} -o /usr/local/bin/yq \
    && chmod a+x /usr/local/bin/yq

COPY --chmod=755 ./docker_entrypoint.sh /usr/local/bin/docker_entrypoint.sh
