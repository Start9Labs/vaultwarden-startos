import { configSpec } from './spec'
import { sdk } from '../../sdk'
import { setInterfaces } from '../interfaces'

/**
 * This function executes on config save
 *
 * Use it to persist config data to various files and to establish any resulting dependencies
 */
export const save = sdk.setupConfigSave(
  configSpec,
  async ({ effects, utils, input, dependencies }) => {
    await utils.store.setOwn('/config', input)
    const nginxFile = `server {
    ##
    # \`gzip\` Settings
    #
    #
    gzip on;
    gzip_disable "msie6";

    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_buffers 16 8k;
    gzip_http_version 1.1;
    gzip_min_length 256;
    gzip_types
    application/atom+xml
    application/geo+json
    application/javascript
    application/x-javascript
    application/json
    application/ld+json
    application/manifest+json
    application/rdf+xml
    application/rss+xml
    application/xhtml+xml
    application/xml
    font/eot
    font/otf
    font/ttf
    image/svg+xml
    text/css
    text/javascript
    text/plain
    text/xml;
    listen 3443 ssl;
    listen 8080;
    ssl_certificate /mnt/cert/main.cert.pem;
    ssl_certificate_key /mnt/cert/main.key.pem;
    server_name  localhost;

    location / {
        proxy_pass http://0.0.0.0:80;
    }
}`

    const dependenciesReceipt = await effects.setDependencies([])

    return {
      interfacesReceipt: await setInterfaces({ effects, utils, input }),
      dependenciesReceipt,
      restart: true,
    }
  },
)
