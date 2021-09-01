DOC_ASSETS := $(shell find ./docs/assets)
VERSION := $(shell git --git-dir=bitwarden_rs/.git describe --tags)
BITWARDEN_SRC := $(shell find bitwarden_rs/src) bitwarden_rs/Cargo.toml bitwarden_rs/Cargo.lock
BITWARDEN_GIT_REF := $(shell cat .git/modules/bitwarden_rs/HEAD)
BITWARDEN_GIT_FILE := $(addprefix .git/modules/bitwarden_rs/,$(if $(filter ref:%,$(BITWARDEN_GIT_REF)),$(lastword $(BITWARDEN_GIT_REF)),HEAD))
S9PK_PATH=$(shell find . -name bitwarden.s9pk -print)
PWD=$(shell pwd)

.DELETE_ON_ERROR:

all: verify

verify: bitwarden.s9pk $(S9PK_PATH)
	embassy-sdk verify $(S9PK_PATH)

install: bitwarden.s9pk
	appmgr install bitwarden.s9pk

bitwarden.s9pk: manifest.yaml config_spec.yaml config_rules.yaml image.tar instructions.md
	embassy-sdk pack

instructions.md: docs/instructions.md $(DOC_ASSETS)
	cd docs && md-packer < instructions.md > ../instructions.md

image.tar: Dockerfile $(BITWARDEN_SRC) docker_entrypoint.sh
	cp ./docker_entrypoint.sh ./bitwarden_rs/docker_entrypoint.sh
	DOCKER_CLI_EXPERIMENTAL=enabled docker buildx build --tag start9/bitwarden --platform=linux/arm64 -o type=docker,dest=image.tar -f Dockerfile ./bitwarden_rs
	rm ./bitwarden_rs/docker_entrypoint.sh
	rm ./bitwarden_rs/config.sh

Dockerfile: bitwarden_rs/docker/arm64v8/Dockerfile
	grep -v "^CMD" < bitwarden_rs/docker/arm64v8/Dockerfile > Dockerfile
	echo 'RUN apt-get update && apt-get install -y wget' >> Dockerfile
	echo 'RUN wget -O /usr/local/bin/yq https://beta-registry.start9labs.com/sys/yq?spec=^4.4.1 && chmod a+x /usr/local/bin/yq' >> Dockerfile
	echo 'ADD ./docker_entrypoint.sh /usr/local/bin/docker_entrypoint.sh' >> Dockerfile
	echo 'ENTRYPOINT ["/usr/local/bin/docker_entrypoint.sh"]' >> Dockerfile

manifest.yaml: $(BITWARDEN_GIT_FILE)
	yq eval -i ".version = \"$(VERSION)\"" manifest.yaml
	yq eval -i ".release-notes = \"https://github.com/dani-garcia/bitwarden_rs/releases/tag/$(VERSION)\"" manifest.yaml