SHELL := /bin/bash

.PHONY: boostrap
boostrap:
	npm run build
	source "$(VENV_PATH)/bin/activate"
	flask run

.PHONY: test
test:
	pytest test
