#!/bin/sh
ADMIN_TOKEN=`yq e '.admin-token' /data/start9/config.yaml`
echo "ADMIN_TOKEN=\"${ADMIN_TOKEN}\"" >> /.env
echo "version: 2" > /data/start9/stats.yaml
echo "data:" >> /data/start9/stats.yaml
echo "  \"Admin Token\":" >> /data/start9/stats.yaml
echo "    type: string" >> /data/start9/stats.yaml
echo "    value: \"${ADMIN_TOKEN}\"" >> /data/start9/stats.yaml
echo "    description: \"Authentication token for logging into your admin dashboard.\"" >> /data/start9/stats.yaml
echo "    copyable: true" >> /data/start9/stats.yaml
echo "    qr: false" >> /data/start9/stats.yaml
echo "    masked: true" >> /data/start9/stats.yaml


CONF_FILE="/etc/nginx/conf.d/default.conf"
NGINX_CONF='
server {
    listen 3443 ssl;
    ssl_certificate /mnt/cert/main.cert.pem;
    ssl_certificate_key /mnt/cert/main.key.pem;
    server_name  localhost;
    location ~{
        proxy_pass http://0.0.0.0:80;
    }

}
'
rm /etc/nginx/sites-enabled/default
echo "$NGINX_CONF" > $CONF_FILE

# _term_nginx() {
#   echo "Caught SIGTERM signal!"
#   kill -SIGTERM "$nginx_process" 2>/dev/null
# }

nginx -g 'daemon off;' &
# nginx_process=$!


# trap _term SIGTERM

# proxyboi -l 0.0.0.0:3443 --cert /mnt/cert/main.cert.pem --key /mnt/cert/main.key.pem http://0.0.0.0:80/ -v

# /usr/bin/dumb-init --
exec  tini -p SIGTERM -- /start.sh
