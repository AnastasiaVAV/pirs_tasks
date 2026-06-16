.PHONY: install dev build preview lint lint-fix format typecheck check clean help

NPM = npm
VITE = npx vite

install:
	$(NPM) ci

dev:
	$(VITE)

build:
	$(NPM) run build

preview:
	$(NPM) run preview

lint:
	$(NPM) run lint

lint-fix:
	$(NPM) run lint:fix

format:
	$(NPM) run format

typecheck:
	$(NPM) run typecheck

check: lint typecheck

clean:
	rm -rf node_modules dist .vite

help:
	@echo "Доступные команды:"
	@echo "  make install      - Установить зависимости"
	@echo "  make dev          - Запустить dev сервер"
	@echo "  make build        - Продакшн сборка"
	@echo "  make preview      - Предпросмотр сборки"
	@echo "  make lint         - Запустить ESLint"
	@echo "  make lint-fix     - Автоисправление ESLint"
	@echo "  make format       - Форматировать Prettier"
	@echo "  make typecheck    - Проверка типов TS"
	@echo "  make check        - Полная проверка (lint + typecheck)"
	@echo "  make clean        - Очистить node_modules и dist"
	@echo "  make help         - Показать это сообщение"