FROM node:24.3.0-alpine3.21

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y git curl && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /workspace

RUN npm install -g pnpm

COPY package*.json ./
RUN npm install
