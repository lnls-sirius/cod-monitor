FROM node:16.15-alpine3.15

WORKDIR /src

COPY /src /src
COPY package*.json ./

RUN npm install --loglevel verbose
RUN npm install typescript ts-node

LABEL maintainer="Rafael Lyra <rafael.lyra@lnls.br>"

RUN set -x; apt update -y; apt install -y git;
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

CMD [ "npm", "start" ]
EXPOSE 3000