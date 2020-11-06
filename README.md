# Wrapper for Bitwarden

## Dependencies

- [docker](https://docs.docker.com/get-docker)
- [docker-buildx](https://docs.docker.com/buildx/working-with-buildx/)
- [yq](https://mikefarah.gitbook.io/yq)
- [appmgr](https://github.com/Start9Labs/appmgr)
- [md-packer](https://github.com/Start9Labs/md-packer)

## Cloning
```
git clone git@github.com:Start9Labs/bitwarden-wrapper.git
cd bitwarden-wrapper
git submodule update --init
```

## Building

```
make
```

## Installing (on Embassy)
```
sudo appmgr install bitwarden.s9pk
```
