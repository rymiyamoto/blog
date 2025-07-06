SHELL := /bin/bash

.PHONY: up
up:
	docker compose up -d

.PHONY: down
down:
	docker compose down

.PHONY: exec
exec:
	docker compose exec app ${cmd}

.PHONY: dev
dev:
	docker compose exec app pnpm dev

.PHONY: install
install:
	docker compose exec app pnpm install

.PHONY: build
build:
	docker compose exec app pnpm build

.PHONY: clean
clean:
	docker compose exec app pnpm clean
