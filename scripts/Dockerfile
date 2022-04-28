FROM node:16.15-alpine3.15

WORKDIR /src
ADD /src /src

RUN npm install
RUN npm install typescript ts-node

LABEL maintainer="Rafael Lyra <rafaellyra2010@hotmail.com>"

CMD [ "npm", "start" ]
EXPOSE 3000
