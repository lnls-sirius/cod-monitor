#!/bin/sh
set -e
set -x
set -u
. ./config.sh

docker build \
    --label commit=${commit}\
    --label date=${build_date}\
    --label branch=${branch}\
    --label repository=${repository}\
    --label maintainer.name="Rafael Lyra"\
    --label maintainer.email="rafaellyra2010@hotmail.com"\
    --tag ${docker_image_name}:${docker_image_tag}\
    --tag rafaellyra8
    --progress plain\
    ../

