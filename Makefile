DOC_ASSETS := $(shell find ./docs/assets)
EMVER := $(shell yq e ".version" manifest.yaml)
PKG_ID := $(shell yq e ".id" manifest.yaml)
ASSET_PATHS := $(shell find ./assets/*)
VERSION := $(shell git --git-dir=vaultwarden/.git describe --tags)
VAULTWARDEN_SRC := $(shell find vaultwarden/src) vaultwarden/Cargo.toml vaultwarden/Cargo.lock
VAULTWARDEN_GIT_REF := $(shell cat .git/modules/vaultwarden/HEAD)
VAULTWARDEN_GIT_FILE := $(addprefix .git/modules/vaultwarden/,$(if $(filter ref:%,$(VAULTWARDEN_GIT_REF)),$(lastword $(VAULTWARDEN_GIT_REF)),HEAD))
S9PK_PATH=$(shell find . -name vaultwarden.s9pk -print)
PWD=$(shell pwd)

.DELETE_ON_ERROR:

all: verify

verify: vaultwarden.s9pk $(S9PK_PATH)
	embassy-sdk verify $(S9PK_PATH)

install: vaultwarden.s9pk
	embassy-cli package install vaultwarden.s9pk

vaultwarden.s9pk: manifest.yaml LICENSE image.tar instructions.md icon.png $(ASSET_PATHS)
	embassy-sdk pack

instructions.md: docs/instructions.md $(DOC_ASSETS)
	cd docs && md-packer < instructions.md > ../instructions.md

image.tar: Dockerfile $(VAULTWARDEN_SRC) docker_entrypoint.sh manifest.yaml
	cp ./docker_entrypoint.sh ./vaultwarden/docker_entrypoint.sh
	DOCKER_CLI_EXPERIMENTAL=enabled docker buildx build --tag start9/${PKG_ID}/main:${EMVER} --platform=linux/arm64/v8 -o type=docker,dest=image.tar -f Dockerfile ./vaultwarden
	rm ./vaultwarden/docker_entrypoint.sh

Dockerfile: vaultwarden/Dockerfile
	grep -v "^CMD" < vaultwarden/Dockerfile > Dockerfile
	sed -i '' 's/CMD \[\"\/start\.sh\"\]/#removed default CMD in favor of custom entrypoint /g' Dockerfile
	sed -i '' 's/ENTRYPOINT \[\"\/usr\/bin\/dumb\-init\"\, \"\-\-\"\]/#removed default ENTRYPOINT in favor of custom entrypoint/g' Dockerfile
	echo 'RUN apt-get update && apt-get install -y wget tini' >> Dockerfile
	echo 'RUN wget -O /usr/local/bin/yq https://github.com/mikefarah/yq/releases/download/v4.13.5/yq_linux_arm64 && chmod a+x /usr/local/bin/yq' >> Dockerfile
	echo 'ADD ./docker_entrypoint.sh /usr/local/bin/docker_entrypoint.sh' >> Dockerfile
	echo 'ENTRYPOINT ["/usr/local/bin/docker_entrypoint.sh"]' >> Dockerfile
