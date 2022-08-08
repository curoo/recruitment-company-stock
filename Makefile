# Note: This is mostly used as a task runner, not as a C++ compiler.

include .env
export

bootstrap: system-check docker-images

dev: docker
	npm install
	# npm run watch &
	docker-compose up --remove-orphans

test:
	npm test

system-check:
	./scripts/system-check.sh &>/dev/null

docker:
	docker stats --no-stream > /dev/null 2>&1

docker-images: docker
	docker-compose build

clean: docker
	git clean -fdx
	docker-compose down --volumes

.PHONY: bootstrap test dev system-check docker docker-images clean
