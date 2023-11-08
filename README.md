<p align="center">
  <img src="icon.png" alt="Project Logo" width="21%">
</p>

# Vaultwarden for StartOS

[Vaultwarden](https://github.com/dani-garcia/vaultwarden) is a lightweight and secure password manager for storing and auto-filling sensitive information such as usernames and passwords, credit cards, identities, and notes. It is an alternative implementation of the Bitwarden server API written in Rust and compatible with upstream Bitwarden clients. This repository creates the `s9pk` package that is installed to run `vaultwarden` on [StarOS](https://github.com/Start9Labs/start-os/).

## Dependencies

Install the system dependencies below to build this project by following the instructions in the provided links. You can also find detailed steps to setup your environment in the service packaging [documentation](https://github.com/Start9Labs/service-pipeline#development-environment).

- [docker](https://docs.docker.com/get-docker)
- [docker-buildx](https://docs.docker.com/buildx/working-with-buildx/)
- [jq](https://stedolan.github.io/jq/)
- [start-sdk](https://github.com/Start9Labs/start-os/blob/sdk/backend/install-sdk.sh)
- [deno](https://deno.land/#installation)
- [make](https://www.gnu.org/software/make/)

## Cloning

Clone the project locally:

```
git clone git@github.com:Start9Labs/vaultwarden-startos.git
cd vaultwarden-startos
```

## Building

After setting up your environment, build the `vaultwarden` package by running:

```
make
```

To build the `vaultwarden` package for a single platform, run:

```
# for amd64
make x86
```

or

```
# for arm64
make arm
```

## Installing (on StartOS)

Before installation, define `host: https://server-name.local` in your `~/.embassy/config.yaml` config file then run the following commands to determine successful install:

> :information_source: Change server-name.local to your Start9 server address

```
start-cli auth login
#Enter your StartOS password
make install
```

**Tip:** You can also install the `vaultwarden.s9pk` by sideloading it under the **StartOS > System > Sideload a Service** section.

### Verify Install

Via the StartOS web-UI, select Services > **Vaultwarden**, configure and start the service. Then, verify its interfaces are accessible.

**Done!**
