#!/bin/bash

version="1.0.0"

cd ./front_end
docker-compose -f docker-compose.yml up

docker tag orb-mon-frontend:latest orb-mon-frontend:$version
# docker build --build-arg version=$version --tag orb-mon-frontend:$version .

# cd ../back_end
# docker build --build-arg version=$version --tag orb-mon-backend:$version .
