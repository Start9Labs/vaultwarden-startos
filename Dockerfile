FROM vaultwarden/server:1.26.0

# arm64 or amd64
ARG PLATFORM

RUN apt-get update && apt-get install -y wget tini
RUN wget -O /usr/local/bin/yq https://github.com/mikefarah/yq/releases/download/v4.13.5/yq_linux_${PLATFORM} && chmod a+x /usr/local/bin/yq
ADD ./docker_entrypoint.sh /usr/local/bin/docker_entrypoint.sh
ENTRYPOINT ["/usr/local/bin/docker_entrypoint.sh"]
