SHELL := /bin/bash
VENV_PATH := $(PWD)/.venv

bootstrap:
	[ -x "$(shell command -v python3)" ] || { echo "python is not installed"; exit 1; }
	[ -x "$(shell command -v npm)" ] || { echo "node is not installed"; exit 1; }
	python3 -m venv $(VENV_PATH)
	pip install -r requirements.txt
	npm install

run:
	npm run build
	source "$(VENV_PATH)/bin/activate"
	flask run

db:
	docker-compose up

test:
	pytest test

clean:
	git clean -fdx

.PHONY: bootstrap run test clean
