ARG IMAGE
FROM ${IMAGE}
# The base image's CA store is only as current as its last release.
RUN apk upgrade --no-cache ca-certificates ca-certificates-bundle
