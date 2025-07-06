FROM node:24.3.0-bookworm AS dev
RUN apt-get update && \
    apt-get install -y git curl bash && \
    corepack enable && \
    corepack prepare pnpm@latest --activate
WORKDIR /workspace
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
CMD ["pnpm", "dev"]

FROM dev AS builder
WORKDIR /workspace
RUN pnpm run build

FROM nginx:alpine AS prod
COPY --from=builder /workspace/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
