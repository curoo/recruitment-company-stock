# Note: This is mostly used as a task runner, not as a C++ compiler.

include .env
export

bootstrap: system-check $(VENV) node_modules docker-images

system-check:
	./scripts/system-check.sh &>/dev/null

node_modules: package.json
	npm install
	touch node_modules

docker-images:
	docker-compose build

run: node_modules
	npm run watch &
	docker-compose up

clean:
	git clean -fdx
	docker-compose down -v

.PHONY: bootstrap system-check docker-images run db test clean
