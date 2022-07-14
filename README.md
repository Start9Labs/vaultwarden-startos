# Wrapper for Vaultwarden

## Dependencies

- [docker](https://docs.docker.com/get-docker)
- [docker-buildx](https://docs.docker.com/buildx/working-with-buildx/)
- [yq](https://mikefarah.gitbook.io/yq)
- [appmgr](https://github.com/Start9Labs/embassy-os/tree/master/appmgr)
- [md-packer](https://github.com/Start9Labs/md-packer)
- [deno](https://deno.land/#installation)

## Cloning
```
git clone git@github.com:Start9Labs/vaultwarden-wrapper.git
cd vaultwarden-wrapper
git submodule update --init
```

## Building

```
make
```

## Installing (on Embassy)
```
embassy-cli package install vaultwarden.s9pk
```
