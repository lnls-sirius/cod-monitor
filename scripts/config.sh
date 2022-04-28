#!/bin/sh
set -e
set -u
set -x
branch=$(git branch --no-color --show-current)
build_date=$(date -I)
commit=$(git rev-parse --short HEAD)
repository=$(git remote show origin |grep Fetch|awk '{ print $3 }')

docker_user=rafaellyra8
docker_image_name=${docker_image_prefix}/sirius-orbit-mon
docker_image_tag=${build_date}-${commit}
