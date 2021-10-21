#!/bin/sh

ADMIN_TOKEN=`yq e '.admin-token' /data/start9/config.yaml`
echo "ADMIN_TOKEN=${ADMIN_TOKEN}" >> /.env
echo "version: 2" > /data/start9/stats.yaml
echo "data:" >> /data/start9/stats.yaml
echo "  \"Admin Token\":" >> /data/start9/stats.yaml
echo "    type: string" >> /data/start9/stats.yaml
echo "    value: \"${ADMIN_TOKEN}\"" >> /data/start9/stats.yaml
echo "    description: \"Authentication token for logging into your admin dashboard.\"" >> /data/start9/stats.yaml
echo "    copyable: true" >> /data/start9/stats.yaml
echo "    qr: false" >> /data/start9/stats.yaml
echo "    masked: true" >> /data/start9/stats.yaml

# /usr/bin/dumb-init --
exec /start.sh
