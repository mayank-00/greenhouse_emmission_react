#!/usr/bin/env bash

apt-get update
apt-get install jq
jq --slurp --raw-input \
'split("\n") | .[1:-1] | map(split(",")) | map({"country": .[0], "year": .[1] | tonumber, "value": .[2] | tonumber, "category": .[3]})' \
data.csv > data.json
