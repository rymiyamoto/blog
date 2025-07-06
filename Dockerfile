FROM node:24.3.0-bookworm AS base
RUN apt-get update && apt-get install -y git curl zsh tree bash-completion vim \
    && corepack enable \
    && corepack prepare pnpm@latest --activate \
    && sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended \
    && echo 'export SHELL=/usr/bin/zsh' >> /etc/profile \
    && echo 'export DEFAULT_USER=root' >> /etc/zsh/zshrc \
    && git config --system core.editor "vim"
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
