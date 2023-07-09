#!/bin/sh
ADMIN_TOKEN=$(yq e '.admin-token' /data/start9/config.yaml)
echo "ADMIN_TOKEN=\"${ADMIN_TOKEN}\"" >> /.env
cat << EOF >> /.env
PASSWORD_ITERATIONS=2000000
EOF

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
    ##
    # `gzip` Settings
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
    listen 3443 ssl http2;
    listen 8080;
    ssl_certificate /mnt/cert/main.cert.pem;
    ssl_certificate_key /mnt/cert/main.key.pem;
    server_name  localhost;
    client_max_body_size 128M;

    location / {
        proxy_set_header Host $host;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header X-Forwarded-Proto $scheme;
		proxy_set_header X-Forwarded-Host $host;
		set_real_ip_from 0.0.0.0/0;
		proxy_redirect off;
        proxy_pass http://0.0.0.0:80;
    }
    location /notifications/hub {
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection "upgrade";
		proxy_pass http://0.0.0.0:80;
	}
}
'
rm /etc/nginx/sites-enabled/default
echo "$NGINX_CONF" > $CONF_FILE
sed -i "s/TLSv1 TLSv1.1 //" /etc/nginx/nginx.conf

nginx -g 'daemon off;' &
exec  tini -p SIGTERM -- /start.sh
