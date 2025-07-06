FROM node:24.3.0-bookworm AS base
RUN apt-get update && apt-get install -y git curl bash tree \
    && corepack enable \
    && corepack prepare pnpm@latest --activate
WORKDIR /workspace

FROM base AS dev
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

FROM dev AS builder
COPY . .
RUN pnpm run build

FROM nginx:alpine AS prod
COPY --from=builder /workspace/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
