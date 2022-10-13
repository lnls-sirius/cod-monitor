FROM node:16.15-alpine3.15

WORKDIR /src

COPY /src .
COPY package*.json ./

RUN npm install --loglevel verbose
RUN npm install typescript ts-node

LABEL maintainer="Rafael Lyra <rafael.lyra@lnls.br>"

CMD [ "npm", "start" ]
EXPOSE 3000
