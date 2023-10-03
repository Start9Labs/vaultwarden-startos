PKG_VERSION := $(shell cat manifest.json | jq -r '.version')
PKG_ID := $(shell cat manifest.json | jq -r '.id')
TS_FILES := $(shell find ./ -name \*.ts)

.DELETE_ON_ERROR:

all: verify

verify: $(PKG_ID).s9pk
	@start-sdk verify s9pk $(PKG_ID).s9pk
	@echo " Done!"
	@echo "   Filesize: $(shell du -h $(PKG_ID).s9pk) is ready"

install:
ifeq (,$(wildcard ~/.embassy/config.yaml))
	@echo; echo "You must define \"host: https://adjective-noun.local\" in ~/.embassy/config.yaml config file first"; echo
else
	start-cli package install $(PKG_ID).s9pk
endif

clean:
	rm -rf docker-images
	rm -f  $(PKG_ID).s9pk
	rm -f scripts/generated/manifest.ts
	rm -f scripts/*.js

$(PKG_ID).s9pk: manifest.json LICENSE instructions.md icon.png scripts/embassy.js  docker-images/x86_64.tar docker-images/aarch64.tar
ifeq ($(ARCH),aarch64)
	@echo "start-sdk: Preparing aarch64 package ..."
else ifeq ($(ARCH),x86_64)
	@echo "start-sdk: Preparing x86_64 package ..."
else
	@echo "start-sdk: Preparing Universal Package ..."
endif
	@start-sdk pack

docker-images/aarch64.tar: Dockerfile docker_entrypoint.sh manifest.json
ifeq ($(ARCH),x86_64)
else
	mkdir -p docker-images
	DOCKER_CLI_EXPERIMENTAL=enabled docker buildx build --build-arg DB=sqlite --build-arg PLATFORM=arm64 --tag start9/$(PKG_ID)/main:$(PKG_VERSION) --platform=linux/arm64/v8 -o type=docker,dest=docker-images/aarch64.tar -f Dockerfile .
endif

docker-images/x86_64.tar: Dockerfile docker_entrypoint.sh manifest.json
ifeq ($(ARCH),aarch64)
else
	mkdir -p docker-images
	DOCKER_CLI_EXPERIMENTAL=enabled docker buildx build --build-arg DB=sqlite --build-arg PLATFORM=amd64 --tag start9/$(PKG_ID)/main:$(PKG_VERSION) --platform=linux/amd64 -o type=docker,dest=docker-images/x86_64.tar -f Dockerfile .
endif

scripts/embassy.js: $(TS_FILES) scripts/generated/manifest.ts
	deno bundle scripts/embassy.ts scripts/embassy.js

scripts/generated/manifest.ts: manifest.json
	mkdir -p scripts/generated
	deno run --allow-write scripts/generators/generateManifest.ts