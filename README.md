# Wrapper for File Browser

## Dependencies

- [docker](https://docs.docker.com/get-docker)
- [docker-buildx](https://docs.docker.com/buildx/working-with-buildx/)
- [yq](https://mikefarah.gitbook.io/yq)
- [tiny-tmpl](https://github.com/Start9Labs/templating-engine-rs.git)
- [npm](https://www.npmjs.com/get-npm)
- [appmgr](https://github.com/Start9Labs/appmgr)

## Cloning
```
git clone git@github.com:Start9Labs/filebrowser-wrapper.git
cd filebrowser-wrapper
git submodule update --init
```

## Building

```
make
```

## Installing (on Embassy)
```
sudo appmgr install filebrowser.s9pk
```
