#!/bin/bash

version="1.0"

cd ./front_end
docker build --build-arg version=$version --tag orb-mon-frontend:$version .

# cd ../back_end
# docker build --build-arg version=$version --tag orb-mon-backend:$version .
