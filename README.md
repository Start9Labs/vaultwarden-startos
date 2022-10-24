# Wrapper for vaultwarden

[Vaultwarden](https://github.com/dani-garcia/vaultwarden) is a lightweight and secure password manager for storing and auto-filling sensitive information such as usernames and passwords, credit cards, identities, and notes. It is an alternative implementation of the Bitwarden server API written in Rust and compatible with upstream Bitwarden clients. This repository creates the `s9pk` package that is installed to run `vaultwarden` on [embassyOS](https://github.com/Start9Labs/embassy-os/).

## Dependencies

Install the system dependencies below to build this project by following the instructions in the provided links. You can also find detailed steps to setup your environment in the service packaging [documentation](https://github.com/Start9Labs/service-pipeline#development-environment).

- [docker](https://docs.docker.com/get-docker)
- [docker-buildx](https://docs.docker.com/buildx/working-with-buildx/)
- [jq](https://stedolan.github.io/jq/)
- [embassy-sdk](https://github.com/Start9Labs/embassy-os/blob/master/backend/install-sdk.sh)
- [md-packer](https://github.com/Start9Labs/md-packer)
- [deno](https://deno.land/#installation)
- [make](https://www.gnu.org/software/make/)
- [wget](https://command-not-found.com/wget)

## Cloning

Clone the project locally:

```
git clone git@github.com:Start9Labs/vaultwarden-wrapper.git
cd vaultwarden-wrapper
```

## Building

After setting up your environment, build the `vaultwarden` package by running:

```
make
```

## Installing (on embassyOS)

Run the following commands to install:

> :information_source: Change embassy-server-name.local to your Embassy address

```
embassy-cli auth login
# Enter your embassy password
embassy-cli --host https://embassy-server-name.local package install vaultwarden.s9pk
```

If you already have your `embassy-cli` config file setup with a default `host`,
you can install simply by running:

```
make install
```

> **Tip:** You can also install the vaultwarden.s9pk using **Sideload Service** under
the **Embassy > Settings** section.

### Verify Install

Go to your Embassy Services page, select **Vaultwarden**, configure and start the service. Then, verify its interfaces are accessible.

**Done!** 