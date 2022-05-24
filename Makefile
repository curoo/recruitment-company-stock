# Note: This is mostly used as a task runner, not as a C++ compiler.

VENV = $(PWD)/.venv
VIRTUAL_ENV = $(VENV)

include .env
export

bootstrap: system-check $(VENV) node_modules docker-images

system-check:
	./system-check.sh &>/dev/null

$(VENV): requirements.txt
	test -d $(VENV) || python3 -m venv $(VENV)
	$(VENV)/bin/pip3 install -Ur requirements.txt
	touch $(VENV)

node_modules: package.json
	npm install
	touch node_modules

docker-images:
	docker-compose build

run: node_modules
	npm run watch &
	docker-compose up

test: POSTGRES_HOSTNAME := localhost
test:
	$(VENV)/bin/pytest test

clean:
	git clean -fdx
	docker-compose down -v

.PHONY: bootstrap system-check docker-images run db test clean
