#!/bin/bash

PATH_SRC="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd "$PATH_SRC" && git pull origin test

rm -rf $PATH_SRC/dist/*

docker run --rm -v $PATH_SRC/package.json:/srv/package.json \
-v $PATH_SRC/package-lock.json:/srv/package-lock.json \
-v $PATH_SRC/tsconfig.json:/srv/tsconfig.json \
-v $PATH_SRC/.env:/srv/.env \
-v $PATH_SRC/dist:/srv/dist \
-v $PATH_SRC/src:/srv/src \
-v $PATH_SRC/public:/srv/public \
-w /srv \
node:lts \
npm run build-prod