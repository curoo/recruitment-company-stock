include .env
export


bootstrap: system-check venv node_modules

system-check:
	./system-check.sh &>/dev/null

venv: requirements.txt
	test -d venv || python3 -m venv venv
	venv/bin/pip3 install -Ur requirements.txt
	touch venv

node_modules: package.json
	npm install
	touch node_modules

run:
	npm run watch &
	venv/bin/flask run

db:
	docker-compose up

test:
	venv/bin/pytest test

clean:
	git clean -fdx
	docker-compose down -v

.PHONY: bootstrap run db test clean
