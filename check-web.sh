#!/bin/bash

DURATION=$(</dev/stdin)
if (($DURATION <= 5000 )); then
    exit 60
else
    curl --silent --fail vaultwarden.embassy:80/alive &>/dev/null
    exit_code=$?
    if test "$exit_code" != 0; then
        echo "Web interface is unreachable" >&2
        exit 1
    fi
fi
