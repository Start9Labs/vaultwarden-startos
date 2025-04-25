<p align="center">
  <img src="icon.png" alt="Project Logo" width="21%">
</p>

# Vaultwarden for StartOS

[Vaultwarden](https://github.com/dani-garcia/vaultwarden) is a lightweight and secure password manager for storing and auto-filling sensitive information such as usernames and passwords, credit cards, identities, and notes. It is an alternative implementation of the Bitwarden server API written in Rust and compatible with upstream Bitwarden clients. This repository creates the `s9pk` package that is installed to run `Vaultwarden` on [StarOS](https://github.com/Start9Labs/start-os/).

## Dependencies

Prior to building the `Vaultwarden` package, it's essential to configure your build environment for StartOS services. You can find instructions on how to set up the appropriate build environment in the [Developer Docs](https://docs.start9.com/latest/developer-docs/packaging).

- [docker](https://docs.docker.com/get-docker)
- [docker-buildx](https://docs.docker.com/buildx/working-with-buildx/)
- [make](https://www.gnu.org/software/make/)
- [start-cli](https://github.com/Start9Labs/start-cli/)

## Cloning

Clone the Vaultwarden package repository locally.

```
git clone https://github.com/Start9Labs/vaultwarden-startos.git
cd vaultwarden-startos
```

## Building

To build the **Vaultwarden** service as a universal package, run the following command:

```
make
```

## Installing (on StartOS)

Before installation, define `host: https://server-name.local` in your `~/.startos/config.yaml` config file then run the following commands to determine successful install:

> :information_source: Change server-name.local to your Start9 server address

```
make install
```

**Tip:** You can also install the vaultwarden.s9pk by sideloading it under the **StartOS > Sideload a Service** section.

## Verify Install

Go to your StartOS Services page, select **Vaultwarden**, configure and start the service.

**Done!**
