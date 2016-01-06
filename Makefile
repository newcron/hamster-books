DOCKER_IP := $(shell echo $(DOCKER_HOST) | egrep -o -e "[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+")

regenerate_env: stop
	docker-compose -f environment/docker-compose.yml -p hamstersbooks rm -f
	docker-compose -f environment/docker-compose.yml -p hamstersbooks build web

run:
	@echo "APP_BASE_URL=http://$(DOCKER_IP)/" > ./environment/web.env
	DOCKER_HOST=$(DOCKER_HOST) docker-compose -f environment/docker-compose.yml -p hamstersbooks up -d
	@echo "Surf to $(DOCKER_IP)"

stop:
	docker-compose -f environment/docker-compose.yml -p hamstersbooks kill

delete:
	docker-compose -f environment/docker-compose.yml -p hamstersbooks kill
	docker-compose -f environment/docker-compose.yml -p hamstersbooks rm -f


migrations-init:
	curl $(DOCKER_IP)/deploy/database/init


migrations-dryrun:
	curl $(DOCKER_IP)/deploy/database/migrate/dry-run


migrations-run:
	curl $(DOCKER_IP)/deploy/database/migrate/run


release:
	rm -f build.tar
	grunt build
