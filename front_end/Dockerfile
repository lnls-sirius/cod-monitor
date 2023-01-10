FROM node:16.15-alpine3.15

# Development

# General information about the code
LABEL maintainer="Rafael Lyra <rafael.lyra@lnls.br>"
ARG version
ENV VERSION version

# Set the container directories
WORKDIR app
COPY /src .
COPY package*.json ./

# Install typescript with the desired packages with npm
RUN npm install --loglevel verbose
RUN npm install typescript ts-node
RUN echo VERSION

CMD [ "npm", "start" ]
EXPOSE 3000
