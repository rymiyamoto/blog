FROM node:24.3.0-alpine3.21

RUN apk update && \
    apk add --no-cache git curl

WORKDIR /workspace

RUN npm install -g pnpm

COPY pnpm-lock.yaml* package.json ./

RUN pnpm install

COPY . .

CMD ["sleep", "infinity"]
