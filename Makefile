VIRTUAL_ENV = $(PWD)/venv
PIP = $(VIRTUAL_ENV)/bin/pip3

include .env
export

bootstrap: system-check $(VIRTUAL_ENV) node_modules

system-check:
	./system-check.sh &>/dev/null

$(VIRTUAL_ENV): requirements.txt
	test -d $(VIRTUAL_ENV) || python3 -m venv venv
	$(PIP) install -Ur requirements.txt
	touch venv

node_modules: package.json
	npm install
	touch node_modules

run:
	npm run watch &
	venv/bin/flask run --host 0.0.0.0

db:
	docker-compose up

test:
	venv/bin/pytest test

clean:
	git clean -fdx
	docker-compose down -v

.PHONY: bootstrap run db test clean
