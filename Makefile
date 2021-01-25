ASSETS := $(shell yq e '.assets.[].src' manifest.yaml)
DOC_ASSETS := $(shell find ./docs/assets)
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

instructions.md: docs/instructions.md $(DOC_ASSETS)
	cd docs && md-packer < instructions.md > ../instructions.md

image.tar: Dockerfile $(BITWARDEN_SRC) docker_entrypoint.sh
	cp ./docker_entrypoint.sh ./bitwarden_rs/docker_entrypoint.sh
	DOCKER_CLI_EXPERIMENTAL=enabled docker buildx build --tag start9/bitwarden --platform=linux/arm/v7 -o type=docker,dest=image.tar -f Dockerfile ./bitwarden_rs
	rm ./bitwarden_rs/docker_entrypoint.sh

Dockerfile: bitwarden_rs/docker/arm32v7/Dockerfile.alpine
	grep -v "^CMD" < bitwarden_rs/docker/arm32v7/Dockerfile.alpine > Dockerfile
	echo 'RUN wget -O /usr/local/bin/yq https://beta-registry.start9labs.com/sys/yq?spec=^4.4.1 && chmod a+x /usr/local/bin/yq' >> Dockerfile
	echo 'ADD ./docker_entrypoint.sh /usr/local/bin/docker_entrypoint.sh' >> Dockerfile
	echo 'ENTRYPOINT ["/usr/local/bin/docker_entrypoint.sh"]' >> Dockerfile

manifest.yaml: $(BITWARDEN_GIT_FILE)
	yq eval -i ".version = \"$(VERSION)\"" manifest.yaml
	yq eval -i ".release-notes = \"https://github.com/dani-garcia/bitwarden_rs/releases/tag/$(VERSION)\"" manifest.yaml
