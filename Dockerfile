FROM vaultwarden/server:1.27.0

RUN apt-get update
RUN apt-get install -y wget tini nginx
ADD ./docker_entrypoint.sh /usr/local/bin/docker_entrypoint.sh

# arm64 or amd64
ARG PLATFORM
RUN wget --no-check-certificate -O /usr/local/bin/yq https://github.com/mikefarah/yq/releases/download/v4.13.5/yq_linux_${PLATFORM} && chmod a+x /usr/local/bin/yq
RUN wget --no-check-certificate -O /usr/local/bin/proxyboi https://github.com/svenstaro/proxyboi/releases/download/v0.5.0/proxyboi-v0.5.0-linux-x86_64 && chmod a+x /usr/local/bin/proxyboi

ENTRYPOINT ["/usr/local/bin/docker_entrypoint.sh"]
