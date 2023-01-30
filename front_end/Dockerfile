FROM node:16-alpine AS builder

# General information about the code
LABEL maintainer="Rafael Lyra <rafael.lyra@lnls.br>"
ARG version
ENV VERSION version

# Set the container directories
WORKDIR /app

# COPY package*.json .
# COPY . .

# Install typescript with the desired packages with npm
# RUN npm install --loglevel verbose
# RUN npm install typescript ts-node

EXPOSE 3000
CMD ["npm", "run", "dev"]

# RUN npm run build

# FROM node:16-alpine

# WORKDIR /usr/share/nginx/html

# RUN rm -rf *

# COPY --from=builder /app/src/dist .

# ENTRYPOINT ["nginx", "-g", "daemon off;"]
# EXPOSE 3000
