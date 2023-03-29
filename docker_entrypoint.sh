#!/bin/sh
ADMIN_TOKEN=$(yq e '.admin-token' /data/start9/config.yaml)
cat << EOF > /data/start9/stats.yaml
version: 2
data:
  "Admin Token":
    type: string
    value: "$ADMIN_TOKEN"
    description: "Authentication token for logging into your admin dashboard."
    copyable: true
    qr: false
    masked: true
EOF

CONF_FILE="/etc/nginx/conf.d/default.conf"
NGINX_CONF='
server {
    listen 3443 ssl;
    ssl_certificate /mnt/cert/main.cert.pem;
    ssl_certificate_key /mnt/cert/main.key.pem;
    server_name  localhost;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location / {
        proxy_pass http://0.0.0.0:80;
    }
}
'
rm /etc/nginx/sites-enabled/default
echo "$NGINX_CONF" > $CONF_FILE

nginx -g 'daemon off;' &
exec  tini -p SIGTERM -- /start.sh
