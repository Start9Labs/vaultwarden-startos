ASSETS := $(shell yq r manifest.yaml assets.*.src)
ASSET_PATHS := $(addprefix assets/,$(ASSETS))
VERSION := $(shell git --git-dir=bitwarden_rs/.git describe --tags)
BITWARDEN_SRC := $(shell find bitwarden_rs/src) bitwarden_rs/Cargo.toml bitwarden_rs/Cargo.lock
BITWARDEN_GIT_REF := $(shell cat .git/modules/bitwarden_rs/HEAD)
BITWARDEN_GIT_FILE := $(addprefix .git/modules/bitwarden_rs/,$(if $(filter ref:%,$(BITWARDEN_GIT_REF)),$(lastword $(BITWARDEN_GIT_REF)),HEAD))

.DELETE_ON_ERROR:

all: bitwarden.s9pk

install: bitwarden.s9pk
	appmgr install bitwarden.s9pk

bitwarden.s9pk: manifest.yaml config_spec.yaml config_rules.yaml image.tar instructions.md $(ASSET_PATHS)
	appmgr -vv pack $(shell pwd) -o bitwarden.s9pk
	appmgr -vv verify bitwarden.s9pk

image.tar: Dockerfile $(BITWARDEN_SRC)
	DOCKER_CLI_EXPERIMENTAL=enabled docker buildx build --tag start9/bitwarden --platform=linux/arm/v7 -o type=docker,dest=image.tar -f Dockerfile ./bitwarden_rs

Dockerfile: bitwarden_rs/docker/arm32v7/Dockerfile.alpine
	grep -v "^CMD" < bitwarden_rs/docker/arm32v7/Dockerfile.alpine > Dockerfile
	echo 'ENTRYPOINT ["/start.sh"]' >> Dockerfile

manifest.yaml: $(BITWARDEN_GIT_FILE)
	yq w -i manifest.yaml version $(VERSION)
	yq w -i manifest.yaml release-notes https://github.com/dani-garcia/bitwarden_rs/releases/tag/v$(VERSION)
